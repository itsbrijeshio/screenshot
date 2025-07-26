import { Response } from "express";

const response = (
  res: Response,
  status: number,
  data: any = undefined,
  metadata?: any
) => {
  const message = data?.message;
  delete data?.message;

  return res.status(status).json({
    success: true,
    message,
    data,
    metadata,
  });
};

export default response;
