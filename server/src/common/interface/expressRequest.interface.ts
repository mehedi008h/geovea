import { Request } from "express";
import { FetchUserDto } from "./auth.interface";

export interface ExpressRequest extends Request {
    user?: FetchUserDto | any;
}
