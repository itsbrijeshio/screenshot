import { screenshot } from "../utils";

class ScreenshotService {
  takeScreenshot = async (url: string) => {
    const res = await screenshot(url);
    return res;
  };
}

export default ScreenshotService;
