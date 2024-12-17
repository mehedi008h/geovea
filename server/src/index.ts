import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ip from "ip";
import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import connectDatabase from "./database/database";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/category/category.routes";
import productRoutes from "./modules/product/product.routes";
import branchRoutes from "./modules/branch/branch.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: config.APP_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());

// api routes
app.get(
    "/",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.status(HTTPSTATUS.OK).json({
            message: "Hello Subscribers!!!",
        });
    })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/category`, categoryRoutes);
app.use(`${BASE_PATH}/product`, productRoutes);
app.use(`${BASE_PATH}/branch`, branchRoutes);

// not found route
app.all(
    "*",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.status(HTTPSTATUS.NOT_FOUND).json({
            message: "Router not found",
        });
    })
);

app.use(errorHandler);

app.listen(config.PORT, async () => {
    console.log(
        `Server listening on ${ip.address()}:${config.PORT} in ${
            config.NODE_ENV
        }`
    );
    await connectDatabase();
});
