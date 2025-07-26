import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { env } from "../config";
import cloudUpload from "./cloudUpload";

const screenshot = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    };
  });
  await page.setViewport({
    width: dimensions.width,
    height: dimensions.height,
  });
  const title = await page.title();
  const screenshot = await page.screenshot({ type: "png" });

  const filePath = path.join(__dirname, env.FILE_PATH + "/" + title + ".png");
  fs.writeFileSync(filePath, screenshot, {
    encoding: "base64",
  });
  await browser.close();

  const response = await cloudUpload(filePath);
  return response;
};

export default screenshot;
