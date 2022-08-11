import { Express } from "express";
import {
  createSessionHandler,
  getSessionHandler,
  logout,
} from "./controllers/session.controller";
import { author } from "./middleware/author";

function routes(app: Express) {
  app.post("/api/session", createSessionHandler);
  app.get("/api/session", author, getSessionHandler);
  app.delete("/api/session", author, logout);
}

export default routes;
