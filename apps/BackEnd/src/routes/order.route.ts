import { Router } from "express";
import { createOrderHandler, getAllOrdersHandler, getOrderByIdHandler } from "../controllers/orderController";

const router = Router();

router.post("/", createOrderHandler);
router.get("/", getAllOrdersHandler);
router.get("/:id", getOrderByIdHandler);

export default router;

