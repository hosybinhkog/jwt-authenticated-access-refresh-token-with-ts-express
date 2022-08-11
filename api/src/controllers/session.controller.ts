import { Request, Response } from "express";
import { createSession, getUser, invalidateSession } from "../db";
import { signJWT } from "../utils/auth";

export async function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = getUser(email);

  if (!user || password !== user.password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const session = createSession(email, user.name);

  const accessToken = await signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
    "10s"
  );

  const refreshToken = await signJWT({ sessionId: session.sessionId }, "7d");

  res.cookie("accessToken", accessToken, {
    maxAge: 300000,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.send(session);
}

export function getSessionHandler(req: Request, res: Response) {
  //@ts-ignore
  return res.send(req.user);
}

export function logout(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  //@ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send({ success: true, session });
}
