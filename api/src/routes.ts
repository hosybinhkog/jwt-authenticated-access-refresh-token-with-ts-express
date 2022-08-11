import { Express } from "express";
import { createSessionHandler } from "./controllers/session.controller";

function routes(app: Express) {
  app.use("/", (_, res) => {
    res.status(200).json({
      message: "bbb",
    });
  });

  app.post("/api/session", createSessionHandler);
}

export default routes;
