import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import authRouter from "./routes/auth.js";
import leadsRouter from "./routes/leads.js";
import casesRouter from "./routes/cases.js";
import contentRouter from "./routes/content.js";
import uploadRouter from "./routes/upload.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Static files for uploads
  app.use("/uploads", express.static("public/uploads"));

  // Example
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);

  // Auth
  app.use("/api/auth", authRouter);

  // Leads
  app.use("/api/leads", leadsRouter);

  // Cases
  app.use("/api/cases", casesRouter);

  // Content
  app.use("/api/content", contentRouter);

  // Uploads
  app.use("/api/upload", uploadRouter);

  return app;
}
