import { Router } from "express";
import { authController } from "./auth.module";

const authRoutes = Router();

authRoutes.post("/customer/login", authController.loginCustomer);

export default authRoutes;
