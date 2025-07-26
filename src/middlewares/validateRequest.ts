import { NextFunction, Request, Response } from "express";
import zod, { Schema } from "zod";

type Source = "body" | "params" | "query";

const validateRequest =
  (schema: Schema, source: Source = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const values = req[source];
    await schema.parseAsync(values);
    next();
  };

const urlSchema = zod.object({
  url: zod
    .string({ required_error: "Screenshot URL is required" })
    // start http or https
    .regex(/^https?:\/\//, "Invalid URL format"),
});

validateRequest.urlSchema = urlSchema;

export default validateRequest;
