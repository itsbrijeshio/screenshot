import { Request, Response } from "express";
import { ScreenshotService } from "../services";
import { response } from "../utils";

class ScreenshotController extends ScreenshotService {
  constructor() {
    super();
  }

  handleScreenshot = async (req: Request, res: Response) => {
    const { url }: any = req.query;
    let ttl: any = new Date().getTime();
    const screenshot = await this.takeScreenshot(url);
    ttl = Math.floor((new Date().getTime() - ttl) / 1000);
    response(
      res,
      200,
      { imageURL: screenshot?.secure_url, ttl },
      {
        timeStamp: new Date().toISOString(),
      }
    );
  };
}

export default ScreenshotController;
