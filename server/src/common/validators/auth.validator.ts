import { z } from "zod";
import validator from "validator";

export const emailSchema = z.string().trim().email().min(1).max(255);
export const passwordSchema = z.string().trim().min(6).max(255);

export const customerLoginSchema = z.string().refine(validator.isMobilePhone);
export const deliveryPartnerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
