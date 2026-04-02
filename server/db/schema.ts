import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// ──────────────────────────────────────────────────────────
// Leads (заявки с сайта)
// ──────────────────────────────────────────────────────────
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  site: text("site"),
  service: text("service"), // 'SEO-продвижение' | 'Яндекс Директ'
  status: text("status").default("Новая").notNull(), // 'Новая' | 'В работе' | 'Успешно реализовано' | 'Отказ'
  comment: text("comment").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// Cases (кейсы)
// ──────────────────────────────────────────────────────────
export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category"), // 'SEO' | 'Яндекс Директ'
  niche: text("niche"), // 'Медицина' | 'E-commerce' | ...
  description: text("description"),
  resultText: text("result_text"),
  trafficUp: text("traffic_up"), // '+350%'
  roi: text("roi"), // '8x'
  duration: text("duration"), // '6 месяцев'
  body: text("body"), // HTML
  imageUrl: text("image_url"),
  status: text("status").default("Черновик").notNull(), // 'Опубликовано' | 'Черновик'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// Content (статьи и другой контент)
// ──────────────────────────────────────────────────────────
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").default("Статья"), // 'Статья' | 'Кейс' | 'Страница' | 'Новость'
  category: text("category"),
  status: text("status").default("Черновик").notNull(), // 'Опубликовано' | 'Черновик'
  author: text("author"),
  excerpt: text("excerpt"),
  body: text("body"),
  imageUrl: text("image_url"),
  tags: text("tags"), // JSON string or comma separated
  readTime: integer("read_time").default(5),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// Admins
// ──────────────────────────────────────────────────────────
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Types
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
export type Content = typeof content.$inferSelect;
export type NewContent = typeof content.$inferInsert;
export type Admin = typeof admins.$inferSelect;
