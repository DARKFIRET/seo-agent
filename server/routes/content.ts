import { Router } from "express";
import { db } from "../db/index.js";
import { content } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth.js";
import { z } from "zod";

const router = Router();

// Separate schemas: create requires title; update allows all optional
const createContentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Статья", "Кейс", "Страница"]).optional(),
  category: z.string().optional(),
  status: z.enum(["Опубликовано", "Черновик"]).optional(),
  author: z.string().optional(),
  body: z.string().optional(),
});

const updateContentSchema = createContentSchema.partial();

// GET /api/content  — admin
router.get("/", requireAuth, async (_req, res) => {
  const rows = await db
    .select()
    .from(content)
    .orderBy(desc(content.createdAt));
  res.json({ content: rows });
});

// POST /api/content  — admin
router.post("/", requireAuth, async (req, res) => {
  const parsed = createContentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { title, ...rest } = parsed.data;
  const [row] = await db
    .insert(content)
    .values({ title, ...rest })
    .returning();
  res.status(201).json({ content: row });
});

// PUT /api/content/:id  — admin
router.put("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = updateContentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const [row] = await db
    .update(content)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(content.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ content: row });
});

// PATCH /api/content/:id/status  — admin
router.patch("/:id/status", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };

  const [row] = await db
    .update(content)
    .set({ status, updatedAt: new Date() })
    .where(eq(content.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ content: row });
});

// DELETE /api/content/:id  — admin
router.delete("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(content).where(eq(content.id, id));
  res.json({ ok: true });
});

export default router;
