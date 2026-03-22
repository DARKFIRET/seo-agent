import { Router } from "express";
import { db } from "../db/index.js";
import { leads } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/requireAuth.js";
import { z } from "zod";

const router = Router();

// ── Validation ──────────────────────────────────────────
const createLeadSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(1, "Телефон обязателен"),
  company: z.string().optional(),
  site: z.string().optional(),
  service: z.string().optional(),
  comment: z.string().optional(),
});

// ── Public ───────────────────────────────────────────────

// POST /api/leads  — submit a lead from the website
router.post("/", async (req, res) => {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: "Validation error", details: parsed.error.format() });
    return;
  }

  const { name, email, phone, company, site, service, comment } = parsed.data;
  const [lead] = await db
    .insert(leads)
    .values({ name, email, phone, company, site, service, comment })
    .returning();

  res.status(201).json({ lead });
});

// ── Admin ────────────────────────────────────────────────

// GET /api/leads  — list with optional filters
router.get("/", requireAuth, async (req, res) => {
  const { status, service } = req.query as {
    status?: string;
    service?: string;
  };

  let query = db.select().from(leads).orderBy(desc(leads.createdAt)).$dynamic();

  const rows = await query;

  const filtered = rows.filter((l) => {
    const statusMatch = !status || status === "Все" || l.status === status;
    const serviceMatch = !service || service === "Все" || l.service === service;
    return statusMatch && serviceMatch;
  });

  res.json({ leads: filtered });
});

// PATCH /api/leads/:id/status
router.patch("/:id/status", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };

  if (!status) {
    res.status(400).json({ error: "status is required" });
    return;
  }

  const [updated] = await db
    .update(leads)
    .set({ status })
    .where(eq(leads.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json({ lead: updated });
});

// PATCH /api/leads/:id/comment
router.patch("/:id/comment", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { comment } = req.body as { comment: string };

  const [updated] = await db
    .update(leads)
    .set({ comment: comment ?? "" })
    .where(eq(leads.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json({ lead: updated });
});

// DELETE /api/leads/:id
router.delete("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(leads).where(eq(leads.id, id));
  res.json({ ok: true });
});

// GET /api/leads/export  — CSV download
router.get("/export", requireAuth, async (_req, res) => {
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const headers = [
    "ID",
    "Имя",
    "Email",
    "Телефон",
    "Компания",
    "Сайт",
    "Услуга",
    "Статус",
    "Комментарий",
    "Дата",
  ];
  const csvRows = [
    headers.join(";"),
    ...rows.map((l) =>
      [
        l.id,
        `"${l.name}"`,
        l.email,
        l.phone,
        `"${l.company ?? ""}"`,
        l.site ?? "",
        l.service ?? "",
        l.status,
        `"${(l.comment ?? "").replace(/"/g, '""')}"`,
        l.createdAt.toISOString(),
      ].join(";"),
    ),
  ];

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="leads_${Date.now()}.csv"`,
  );
  res.send("\uFEFF" + csvRows.join("\n")); // BOM for Excel
});

export default router;
