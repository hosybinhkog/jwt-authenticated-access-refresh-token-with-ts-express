import { NextFunction, Response, Request } from "express";

export function author(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore

  if (!req.user) {
    return res.status(403).send("Invalid session");
  }

  return next();
}
