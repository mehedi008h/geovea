import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ExpressRequest } from "../common/interface/expressRequest.interface";

export const isAuthenticatedUser = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send({ message: "Access token required" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        );

        req.user = decoded as jwt.JwtPayload; // Assign decoded token to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).send({ message: "Invalid token or expired" });
    }
};
