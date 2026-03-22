/**
 * Shared types between client and server
 */

// ── Auth ──────────────────────────────────────────────────
export interface AuthResponse {
  token: string;
  admin: AdminInfo;
}

export interface AdminInfo {
  id: number;
  email: string;
  name: string | null;
}

// ── Leads ─────────────────────────────────────────────────
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  site: string | null;
  service: string | null;
  status: "Новая" | "В работе" | "Успешно реализовано" | "Отказ";
  comment: string | null;
  createdAt: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  site?: string;
  service?: string;
  comment?: string;
}

// ── Cases ─────────────────────────────────────────────────
export interface Case {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  niche: string | null;
  description: string | null;
  resultText: string | null;
  trafficUp: string | null;
  roi: string | null;
  duration: string | null;
  body: string | null;
  imageUrl: string | null;
  status: "Опубликовано" | "Черновик";
  createdAt: string;
  updatedAt: string;
}

// ── Content ───────────────────────────────────────────────
export interface ContentItem {
  id: number;
  title: string;
  type: "Статья" | "Кейс" | "Страница";
  category: string | null;
  status: "Опубликовано" | "Черновик";
  author: string | null;
  body: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

/** @deprecated — use AuthResponse */
export interface DemoResponse {
  message: string;
}
