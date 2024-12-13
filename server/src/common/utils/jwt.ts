import jwt from "jsonwebtoken";
import { config } from "../../config/app.config";
import { UserDocument } from "../../database/models/user.model";

export type AccessTPayload = {
    _id: UserDocument["_id"];
    role: string;
};

// generate token
export const generateToken = (user: AccessTPayload) => {
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        config.JWT.SECRET,
        { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        config.JWT.REFRESH_SECRET,
        { expiresIn: "1d" }
    );

    return { accessToken, refreshToken };
};
