import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload | string; // Adjust type if `decoded` is a string or an object
    }
}
