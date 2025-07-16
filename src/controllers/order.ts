import { Request, Response } from "express";
import { prisma } from "../connection/clients";

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { items } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    res.json({ message: "Order placed", order });
  } catch (err: any) {
    console.error("🔥 Error placing order:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user?.id },
      include: {
        orderItems: {
          include: {
            product: true, // ✅ ambil data produk di dalam orderItem
          },
        },
      },
    });
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
  } = req.query;

  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  try {
    const groupedOrders = await prisma.user.findMany({
      include: {
        orders: {
          include: {
            orderItems: {
              include: { product: true },
            },
          },
          orderBy: {
            [String(sort)]: String(order) === "desc" ? "desc" : "asc",
          },
        },
      },
      skip,
      take,
    });

    res.json(groupedOrders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
