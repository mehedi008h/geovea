import { z } from "zod";
import validator from "validator";

export const customerLoginSchema = z.string().refine(validator.isMobilePhone);
