import { Router } from "express";
import { authController } from "./auth.module";

const authRoutes = Router();

authRoutes.post("/customer/login", authController.loginCustomer);
authRoutes.post("/delivery/login", authController.loginDeliveryPartner);
authRoutes.post("/refresh-token", authController.refreshToken);

export default authRoutes;
