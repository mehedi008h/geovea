import { Types } from "mongoose";
import {
    DeliveryPersonLocation,
    OrderDto,
    OrderStatusDTO,
    Query,
    QueryData,
} from "../../common/interface/order.interface";
import {
    NotFoundException,
    UnauthorizedException,
} from "../../common/utils/catch-errors";
import { logger } from "../../common/utils/logger";
import {
    Branch,
    Customer,
    DeliveryPartner,
    Order,
} from "../../database/models";

export class OrderService {
    // create new order
    public async newOrder(userId: string, orderData: OrderDto) {
        logger.info(`Create order for user: ${userId}`);

        // find user
        const customerData = await Customer.findById(userId);

        // throw exception if user not found
        if (!customerData) {
            throw new NotFoundException("Customer not found");
        }

        // find branch
        const branchData = await Branch.findById(orderData.branch);

        // throw exception if branch not found
        if (!branchData) {
            throw new NotFoundException("Branch not found");
        }

        // create new order
        const order = new Order({
            customer: userId,
            items: orderData.items.map((item) => ({
                id: item.id,
                item: item.item,
                count: item.count,
            })),
            branch: orderData.branch,
            totalPrice: orderData.totalPrice,
            deliveryLocation: {
                latitude: customerData.liveLocation.latitude,
                longitude: customerData.liveLocation.longitude,
                address: customerData.address || "No address avaliable",
            },
            pickupLocation: {
                latitude: branchData.location.latitude,
                longitude: branchData.location.longitude,
                address: branchData.address || "No address avaliable",
            },
        });

        const newOrder = await order.save();

        logger.info(`Order created successfully : ${order._id}`);
        return {
            newOrder,
        };
    }

    // confirm order
    public async confirmOrder(
        userId: string,
        orderId: string,
        deliveryPersonLocation: DeliveryPersonLocation
    ) {
        logger.info(`Confirm order for user: ${userId}`);

        // find user
        const deliveryPerson = await DeliveryPartner.findById(userId);

        // throw exception if user not found
        if (!deliveryPerson) {
            throw new NotFoundException("Delivery Person not found");
        }

        // find order
        const order = await Order.findById(orderId);

        // throw exception if branch not found
        if (!order) {
            throw new NotFoundException("Order not found");
        }

        if (order.status !== "avaliable") {
            throw new NotFoundException("Order is not avaliable");
        }

        order.status = "confirmed";

        order.deliveryPartner = new Types.ObjectId(userId);
        order.deliveryPersonLocation = {
            latitude: deliveryPersonLocation?.latitude,
            longitude: deliveryPersonLocation?.longitude,
            address: deliveryPersonLocation.address || "No address avaliable",
        };

        await order.save();
        return {
            order,
        };
    }

    // get orders
    public async getOrders(queryData: QueryData) {
        const { customerId, deliveryPartnerId, branchId, status } = queryData;

        let query: Query = {};

        if (status) {
            query.status = status;
        }

        if (customerId) {
            query.customer = customerId;
        }

        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId;
            query.branch = branchId;
        }

        const orders = await Order.find(query).populate(
            "customer branch items.item deliveryPartner"
        );

        return {
            orders,
        };
    }

    // get order details
    public async getOrderDetails(orderId: string) {
        const order = await Order.findById(orderId).populate(
            "customer branch items.item deliveryPartner"
        );

        if (!order) {
            throw new NotFoundException("Order not found");
        }

        return {
            order,
        };
    }

    // update order status
    public async updateOrder(
        userId: string,
        orderId: string,
        orderStatus: OrderStatusDTO
    ) {
        logger.info(`Confirm order for user: ${userId}`);

        // find user
        const deliveryPerson = await DeliveryPartner.findById(userId);

        // throw exception if user not found
        if (!deliveryPerson) {
            throw new NotFoundException("Delivery Person not found");
        }

        // find order
        const order = await Order.findById(orderId);

        // throw exception if branch not found
        if (!order) {
            throw new NotFoundException("Order not found");
        }

        if (["avaliable", "cancelled"].includes(order.status)) {
            throw new NotFoundException("Order cannot be updated");
        }

        if (order.deliveryPartner.toString() !== userId) {
            throw new UnauthorizedException("Unauthorized access");
        }

        order.status = orderStatus.status;
        order.deliveryPersonLocation = orderStatus.deliveryPersonLocation;

        await order.save();
        return {
            order,
        };
    }
}
