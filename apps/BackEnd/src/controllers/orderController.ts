import { Request, Response } from "express";
import { createOrder, getAllOrders, getOrderById } from "../modules/order/order.service";

export const createOrderHandler = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, notes, total, items } = req.body;

    if (!name || !phone || !address || total == null || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Missing required order data. Provide name, phone, address, total and items.",
      });
    }

    const order = await createOrder({
      name,
      phone,
      address,
      notes,
      total: Number(total),
      items,
    });

    return res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create order",
    });
  }
};

export const getAllOrdersHandler = async (_req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    console.error("Get orders error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to fetch orders",
    });
  }
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    console.error("Get order error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to fetch order",
    });
  }
};

