import { Request, Response } from "express";
import { prisma } from "../connection/clients";

export const transferPoints = async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;
  const fromUserId = req.user?.id;

  if (!fromUserId || !recipient || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid transfer data" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const sender = await tx.user.findUnique({ where: { id: fromUserId } });
      const receiver = await tx.user.findUnique({
        where: { email: recipient },
      });

      if (!sender || !receiver) throw new Error("User not found");
      if (sender.id === receiver.id)
        throw new Error("Can't transfer to yourself");
      if (sender.points < amount) throw new Error("Insufficient balance");

      await tx.user.update({
        where: { id: sender.id },
        data: { points: { decrement: Number(amount) } },
      });

      await tx.user.update({
        where: { id: receiver.id },
        data: { points: { increment: Number(amount) } },
      });

      return {
        from: sender.email,
        to: receiver.email,
        amount,
        senderNewBalance: sender.points - amount,
      };
    });

    res.json({ message: "Transfer successful", result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
