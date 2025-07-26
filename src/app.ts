import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { env } from "./config";
import { rateLimiter, errorHandler } from "./middlewares";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    origin: env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(rateLimiter());

app.get("/", (req, res) => {
  res.send("Welcome to the screenshot tool!");
});

app.use("/", routes);
app.use(errorHandler);

export { app, server, io };
