import { Router } from "express";
import { authController } from "./auth.module";
import { isAuthenticatedUser } from "../../middlewares/auth";

const authRoutes = Router();

authRoutes.post("/customer/login", authController.loginCustomer);
authRoutes.post("/delivery/login", authController.loginDeliveryPartner);
authRoutes.post("/refresh-token", authController.refreshToken);
authRoutes
    .route("/")
    .get(isAuthenticatedUser, authController.fetchUser)
    .patch(isAuthenticatedUser, authController.updateUser);

export default authRoutes;
