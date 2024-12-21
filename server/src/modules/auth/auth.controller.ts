import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { AuthService } from "./auth.service";
import {
    customerLoginSchema,
    loginSchema,
    registerSchema,
} from "../../common/validators/auth.validator";
import { UnauthorizedException } from "../../common/utils/catch-errors";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ExpressRequest } from "../../common/interface/expressRequest.interface";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    // login customer
    public loginCustomer = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = customerLoginSchema.parse(req.body.phone);

            const { customer, accessToken, refreshToken } =
                await this.authService.customerLogin(body);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "Customer Login successfully",
                customer,
                accessToken,
                refreshToken,
            });
        }
    );

    // login delivery partner
    public loginDeliveryPartner = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = loginSchema.parse(req.body);

            const { deliveryPartner, accessToken, refreshToken } =
                await this.authService.deliveryPartnerLogin(body);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "Delivery Partner Login successfully",
                deliveryPartner,
                accessToken,
                refreshToken,
            });
        }
    );

    // login admin
    public loginAdmin = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = loginSchema.parse(req.body);

            const { admin, accessToken, refreshToken } =
                await this.authService.adminLogin(body);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "Admin Login successfully",
                admin,
                accessToken,
                refreshToken,
            });
        }
    );

    // register delivery partner
    public registerDeliveryPartner = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            // validate request body
            const body = registerSchema.parse(req.body);

            const { deliveryPartner } =
                await this.authService.deliveryPartnerRegister(body);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "Delivery Partner Added successfully",
                deliveryPartner,
            });
        }
    );

    // refresh token
    public refreshToken = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { refreshToken } = req.body;

            // throw error if token not given
            if (!refreshToken) {
                throw new UnauthorizedException("Missing refresh token");
            }

            const { accessToken, refreshToken: newRefreshToken } =
                await this.authService.getRefreshToken(refreshToken);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "Token refreshed",
                accessToken,
                newRefreshToken,
            });
        }
    );

    // fetch user information
    public fetchUser = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { userId, role } = req.user;

            const { user } = await this.authService.fetchUserById({
                userId,
                role,
            });

            return res.status(HTTPSTATUS.OK).json({
                message: "User fetched successfully",
                user,
            });
        }
    );

    // update user
    public updateUser = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { userId } = req.user;

            const { user } = await this.authService.updateUser(
                userId,
                req.body
            );

            return res.status(HTTPSTATUS.OK).json({
                message: "User updated successfully",
                user,
            });
        }
    );
}
