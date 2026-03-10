/**
 * db.ts — Singleton PrismaClient für die gesamte App.
 *
 * Verhindert, dass Next.js Hot-Reload im Dev-Modus
 * mehrere Datenbankverbindungen öffnet.
 *
 * Nutzung:
 *   import { prisma } from "@/lib/db";
 *   const users = await prisma.user.findMany();
 */

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
