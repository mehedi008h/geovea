import { ErrorCode } from "../../common/enums/error-code.enum";
import {
    DeliveryPartnerLoginDto,
    FetchUserDto,
} from "../../common/interface/auth.interface";
import {
    BadRequestException,
    NotFoundException,
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

    // gfetch user
    public async fetchUserById(userData: FetchUserDto) {
        logger.info(`User ID: ${userData.userId}`);

        let user;
        if (userData.role === "Customer") {
            user = await Customer.findById(userData.userId);
        } else if (userData.role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userData.userId);
        } else {
            throw new UnauthorizedException("Invalid token role");
        }

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            user,
        };
    }

    // update user
    public async updateUser(userId: string, updateData: any) {
        let user =
            (await Customer.findById(userId)) ||
            (await DeliveryPartner.findById(userId));

        if (!user) {
            throw new NotFoundException("User not found");
        }

        let UserModel;

        if (user.role === "Customer") {
            UserModel = Customer;
        } else if (user.role === "DeliveryPartner") {
            UserModel = DeliveryPartner;
        } else {
            throw new UnauthorizedException("Invalid user role");
        }

        // update user data
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new NotFoundException("User not found");
        }

        return {
            user,
        };
    }
}
