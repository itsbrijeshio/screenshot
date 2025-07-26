import { Router } from "express";
import { ScreenshotController } from "../controllers";
import { validateRequest } from "../middlewares";

const router = Router();

const screenshotController = new ScreenshotController();

router.get(
  "/screenshot",
  validateRequest(validateRequest.urlSchema, "query"),
  screenshotController.handleScreenshot
);

export default router;
