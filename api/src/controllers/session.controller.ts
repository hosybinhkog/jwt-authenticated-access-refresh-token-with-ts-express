import { Request, Response } from "express";
import { getUser } from "../db";

export function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = getUser(email);

  if (!user || password !== user.password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
}
