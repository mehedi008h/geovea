import { Router } from "express";
import { orderController } from "./order.module";
import { isAuthenticatedUser } from "../../middlewares/auth";

const orderRoutes = Router();

orderRoutes
    .route("/")
    .post(isAuthenticatedUser, orderController.createOrder)
    .get(isAuthenticatedUser, orderController.getOrders);

orderRoutes
    .route("/:orderId/status")
    .patch(isAuthenticatedUser, orderController.updateOrderStatus);

orderRoutes
    .route("/:orderId/confirm")
    .post(isAuthenticatedUser, orderController.confirmOrder);

orderRoutes
    .route("/:orderId/")
    .get(isAuthenticatedUser, orderController.getOrder);

export default orderRoutes;
