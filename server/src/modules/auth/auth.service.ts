import { ErrorCode } from "../../common/enums/error-code.enum";
import { DeliveryPartnerLoginDto } from "../../common/interface/auth.interface";
import {
    BadRequestException,
    UnauthorizedException,
} from "../../common/utils/catch-errors";
import { generateToken, verifyJwtToken } from "../../common/utils/jwt";
import { logger } from "../../common/utils/logger";
import { Customer, DeliveryPartner } from "../../database/models";

export class AuthService {
    // customer login
    public async customerLogin(phone: string) {
        logger.info(`Customer Login attempt for phone: ${phone}`);

        // find customer
        let customer = await Customer.findOne({
            phone: phone,
        });

        // create customer
        if (!customer) {
            customer = new Customer({
                phone,
                role: "Customer",
            });

            await customer.save();
        }

        // generate tokens
        const { accessToken, refreshToken } = generateToken(customer);

        logger.info(`Login successful for customer ID: ${customer._id}`);
        return {
            customer,
            accessToken,
            refreshToken,
        };
    }

    // delivery partner login
    public async deliveryPartnerLogin(
        deliveryPartnerDto: DeliveryPartnerLoginDto
    ) {
        const { email, password } = deliveryPartnerDto;
        logger.info(`Customer Login attempt for email: ${email}`);

        // find delivery partner
        const deliveryPartner = await DeliveryPartner.findOne({
            email: email,
        });

        // throw error if delivery partner not found
        if (!deliveryPartner) {
            logger.warn(`Login failed: User with email ${email} not found`);
            throw new BadRequestException(
                "Invalid email or password provided",
                ErrorCode.AUTH_USER_NOT_FOUND
            );
        }
        // check valid password
        const isPasswordValid = await deliveryPartner.comparePassword(password);
        if (!isPasswordValid) {
            logger.warn(`Login failed: Invalid password for email: ${email}`);
            throw new BadRequestException(
                "Invalid email or password provided",
                ErrorCode.AUTH_USER_NOT_FOUND
            );
        }

        // generate tokens
        const { accessToken, refreshToken } = generateToken(deliveryPartner);

        logger.info(
            `Login successful for delivery partner ID: ${deliveryPartner._id}`
        );
        return {
            deliveryPartner,
            accessToken,
            refreshToken,
        };
    }

    // get refresh token
    public async getRefreshToken(token: string) {
        logger.info(`Refresh Token: ${token}`);

        // verify token and decode payload
        const decoded = verifyJwtToken(token);

        let user;
        if (decoded.role === "Customer") {
            user = await Customer.findById(decoded.userId);
        } else if (decoded.role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(decoded.userId);
        } else {
            throw new UnauthorizedException("Invalid token role");
        }

        if (!user) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        // generate tokens
        const { accessToken, refreshToken } = generateToken(user);

        return {
            accessToken,
            refreshToken,
        };
    }
}
