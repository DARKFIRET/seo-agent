import { Router } from "express";
import { db } from "../db/index.js";
import { cases } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth.js";
import { z } from "zod";

const router = Router();

// Separate schemas: create requires title + slug; update is all-optional
const createCaseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().optional(),
  niche: z.string().optional(),
  description: z.string().optional(),
  resultText: z.string().optional(),
  trafficUp: z.string().optional(),
  roi: z.string().optional(),
  duration: z.string().optional(),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.enum(["Опубликовано", "Черновик"]).optional(),
});

const updateCaseSchema = createCaseSchema.partial();

// GET /api/cases  — published only (public)
router.get("/", async (_req, res) => {
  const rows = await db
    .select()
    .from(cases)
    .where(eq(cases.status, "Опубликовано"))
    .orderBy(desc(cases.createdAt));
  res.json({ cases: rows });
});

// GET /api/cases/admin/all  — admin, all including drafts
router.get("/admin/all", requireAuth, async (_req, res) => {
  const rows = await db.select().from(cases).orderBy(desc(cases.createdAt));
  res.json({ cases: rows });
});

// GET /api/cases/:slug  — public (must come AFTER /admin/all to avoid slug matching "admin")
router.get("/:slug", async (req, res) => {
  const [row] = await db
    .select()
    .from(cases)
    .where(eq(cases.slug, req.params.slug))
    .limit(1);

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ case: row });
});

// POST /api/cases  — admin
router.post("/", requireAuth, async (req, res) => {
  const parsed = createCaseSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { title, slug, ...rest } = parsed.data;
  const [row] = await db
    .insert(cases)
    .values({ title, slug, ...rest })
    .returning();
  res.status(201).json({ case: row });
});

// PUT /api/cases/:id  — admin
router.put("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = updateCaseSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const [row] = await db
    .update(cases)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(cases.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ case: row });
});

// PATCH /api/cases/:id/status  — admin
router.patch("/:id/status", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };

  const [row] = await db
    .update(cases)
    .set({ status, updatedAt: new Date() })
    .where(eq(cases.id, id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ case: row });
});

// DELETE /api/cases/:id  — admin
router.delete("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(cases).where(eq(cases.id, id));
  res.json({ ok: true });
});

export default router;
