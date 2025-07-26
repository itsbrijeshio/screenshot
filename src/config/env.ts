import { config } from "dotenv";

config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env"
      : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env.dev",
  quiet: true,
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  FILE_PATH: process.env.FILE_PATH as string,
  IS_FILE_SAVED: process.env.IS_FILE_SAVED === "true",
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CRON_JOB_TIME: process.env.CRON_JOB_TIME,
};

export default env;
