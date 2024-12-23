import { ErrorCode } from "../../common/enums/error-code.enum";
import {
    LoginDto,
    FetchUserDto,
    RegisterDto,
} from "../../common/interface/auth.interface";
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from "../../common/utils/catch-errors";
import { generateToken, verifyJwtToken } from "../../common/utils/jwt";
import { logger } from "../../common/utils/logger";
import { config } from "../../config/app.config";
import { Admin, Customer, DeliveryPartner } from "../../database/models";

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

    // delivery pertner register
    public async deliveryPartnerRegister(deliveryPartnerDto: RegisterDto) {
        logger.info(
            `Delivery Partner Register attempt for email: ${deliveryPartnerDto.email}`
        );

        // find delivery partner
        let deliveryPartner = await DeliveryPartner.findOne({
            email: deliveryPartnerDto.email,
        });

        // create delivery partner
        if (deliveryPartner) {
            throw new BadRequestException("Email already exists");
        }

        deliveryPartner = new DeliveryPartner({
            email: deliveryPartnerDto.email,
            password: deliveryPartnerDto.password,
            phone: deliveryPartnerDto.phone,
            role: "DeliveryPartner",
        });

        await deliveryPartner.save();

        return {
            deliveryPartner,
        };
    }

    // delivery partner login
    public async deliveryPartnerLogin(deliveryPartnerDto: LoginDto) {
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

    // admin login
    public async adminLogin(adminDto: LoginDto) {
        const { email, password } = adminDto;

        // find admin
        const admin = await Admin.findOne({
            email: email,
        });

        // throw error if delivery partner not found
        if (!admin) {
            logger.warn(`Login failed: User with email ${email} not found`);
            throw new BadRequestException(
                "Invalid email or password provided",
                ErrorCode.AUTH_USER_NOT_FOUND
            );
        }

        // check valid password
        const isPasswordValid =
            email === config.ADMIN.USERNAME &&
            password === config.ADMIN.PASSWORD;
        if (!isPasswordValid) {
            logger.warn(`Login failed: Invalid password for email: ${email}`);
            throw new BadRequestException(
                "Invalid email or password provided",
                ErrorCode.AUTH_USER_NOT_FOUND
            );
        }

        // generate tokens
        const { accessToken, refreshToken } = generateToken(admin);

        logger.info(`Login successful for delivery partner ID: ${admin._id}`);
        return {
            admin,
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
        } else if (decoded.role === "Admin") {
            user = await Admin.findById(decoded.userId);
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

    // fetch user
    public async fetchUserById(userData: FetchUserDto) {
        logger.info(`User ID: ${userData.userId}`);

        let user;
        if (userData.role === "Customer") {
            user = await Customer.findById(userData.userId);
        } else if (userData.role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userData.userId);
        } else if (userData.role === "Admin") {
            user = await Admin.findById(userData.userId);
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
