// src/app.ts
import express from "express";
import cors from "cors";
import orderRoutes from '../src/routes/order.route'
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use(errorHandler);

export default app; // export the app only

