import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    APP_ORIGIN: getEnv("APP_ORIGIN", "localhost"),
    PORT: getEnv("PORT", "5000"),
    BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
    MONGO_URI: getEnv("MONGO_URI"),
    JWT: {
        SECRET: getEnv("JWT_SECRET"),
        EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
        REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
        REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
    },
    CLOUDINARY: {
        CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
        API_KEY: getEnv("CLOUDINARY_API_KEY"),
        API_SECRET: getEnv("CLOUDINARY_API_SECRET"),
    },
    MAILER_SENDER: getEnv("MAILER_SENDER"),
    RESEND_API_KEY: getEnv("RESEND_API_KEY"),
    ADMIN: {
        USERNAME: getEnv("ADMIN_USERNAME"),
        PASSWORD: getEnv("ADMIN_PASSWORD"),
    },
});

export const config = appConfig();
