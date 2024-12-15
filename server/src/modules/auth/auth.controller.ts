import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares /asyncHandler";
import { AuthService } from "./auth.service";
import {
    customerLoginSchema,
    deliveryPartnerSchema,
} from "../../common/validators/auth.validator";
import { UnauthorizedException } from "../../common/utils/catch-errors";

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
            const body = deliveryPartnerSchema.parse(req.body);

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
}
