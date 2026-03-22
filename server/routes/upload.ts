import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import fs from "fs/promises";
import path from "path";

const router = Router();

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(console.error);

// POST /api/upload  — admin only
// Expects: { image: "data:image/jpeg;base64,...", filename: "my-image.jpg" }
router.post("/", requireAuth, async (req, res) => {
  try {
    const { image, filename } = req.body;
    
    if (!image || !filename) {
      res.status(400).json({ error: "Missing image or filename" });
      return;
    }

    // Basic validation of base64
    const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ error: "Invalid base64 string format" });
      return;
    }

    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    // Generate unique filename to avoid collisions
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${Date.now()}-${safeFilename}`;
    const filePath = path.join(UPLOADS_DIR, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFilename}`;

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
