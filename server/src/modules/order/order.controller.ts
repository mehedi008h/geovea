import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { OrderService } from "./order.service";
import {
    locationSchema,
    orderSchema,
} from "../../common/validators/order.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { ExpressRequest } from "../../common/interface/expressRequest.interface";

export class OrderController {
    private orderService = new OrderService();

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    // create order
    public createOrder = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { userId } = req.user;
            // validate request body
            const body = orderSchema.parse(req.body);

            const order = await this.orderService.newOrder(userId, body);

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Order Created successfully",
                order,
            });
        }
    );

    // confirm order
    public confirmOrder = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { userId } = req.user;
            const { orderId } = req.params;
            // validate request body
            const body = locationSchema.parse(req.body);

            const order = await this.orderService.confirmOrder(
                userId,
                orderId,
                body
            );

            // return success response
            return res.status(HTTPSTATUS.CREATED).json({
                message: "Confirm Order successfully",
                order,
            });
        }
    );

    // get orders
    public getOrders = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const orders = await this.orderService.getOrders(req.query);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Get Orders successfully",
                orders,
            });
        }
    );

    // get order details
    public getOrder = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { orderId } = req.params;
            const order = await this.orderService.getOrderDetails(orderId);

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Get Order successfully",
                order,
            });
        }
    );

    // update order status
    public updateOrderStatus = asyncHandler(
        async (req: ExpressRequest, res: Response): Promise<any> => {
            const { userId } = req.user;
            const { orderId } = req.params;
            const { status, deliveryPersonLocation } = req.body;

            const order = await this.orderService.updateOrder(userId, orderId, {
                status,
                deliveryPersonLocation,
            });

            // return success response
            return res.status(HTTPSTATUS.OK).json({
                message: "Update Order Status successfully",
                order,
            });
        }
    );
}
