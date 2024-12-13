import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares /asyncHandler";
import { Customer } from "../../database/models";

export class AuthController {
    public register = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const body = req.body;

            const user = await Customer.create(body);

            return res.status(HTTPSTATUS.CREATED).json({
                message: "User registered successfully",
                data: "",
            });
        }
    );
}
