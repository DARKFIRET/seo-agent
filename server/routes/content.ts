import { Router } from "express";
import { db } from "../db/index.js";
import { content } from "../db/schema.js";
import { eq, desc, and, or } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth.js";
import { z } from "zod";

const router = Router();

// Separate schemas: create requires title; update allows all optional
const createContentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["Статья", "Кейс", "Страница", "Новость"]).optional(),
  category: z.string().optional(),
  status: z.enum(["Опубликовано", "Черновик"]).optional(),
  author: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
  readTime: z.number().optional(),
});

const updateContentSchema = createContentSchema.partial();

// ── Public Routes ──────────────────────────────────────────

// GET /api/content/public/news — public (только опубликованные новости)
router.get("/public/news", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(content)
      .where(
        and(
          eq(content.status, "Опубликовано"),
          // Временно разрешаем оба типа, чтобы статья точно появилась
          or(
            eq(content.type, "Новость"),
            eq(content.type, "Статья")
          )
        )
      )
      .orderBy(desc(content.createdAt));
    res.json({ news: rows });
  } catch (error) {
    res.status(500).json({ news: [] });
  }
});

// ── Admin Routes ───────────────────────────────────────────

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
    .values({ title, ...rest } as any)
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
    .set({ ...parsed.data, updatedAt: new Date() } as any)
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
    .set({ status, updatedAt: new Date() } as any)
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
