/**
 * Seed script — creates default admin if one doesn't exist.
 * Run: npx tsx server/db/seed.ts
 * Add ADMIN_EMAIL and ADMIN_PASSWORD to .env before running.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { admins } from "./schema.js";
import { eq } from "drizzle-orm";

const email = process.env.ADMIN_EMAIL ?? "admin@luminaagency.ru";
const password = process.env.ADMIN_PASSWORD ?? "admin123";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

const [existing] = await db
  .select()
  .from(admins)
  .where(eq(admins.email, email))
  .limit(1);

if (existing) {
  console.log("Admin already exists:", email);
} else {
  const passwordHash = await bcrypt.hash(password, 12);
  await db
    .insert(admins)
    .values({ email, passwordHash, name: "Администратор" });
  console.log("✅ Created admin:", email, "/ password:", password);
}

await client.end();
