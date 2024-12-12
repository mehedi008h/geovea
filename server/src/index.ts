import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.APP_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Hello Subscribers!!!",
    });
});

app.listen(process.env.PORT, async () => {
    console.log(
        `Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`
    );
});
