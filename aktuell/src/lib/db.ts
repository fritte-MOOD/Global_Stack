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

// Adapter selection based on environment
let adapter;
if (process.env.TURSO_DATABASE_URL) {
  // Production: Use Turso (libsql)
  const { PrismaLibSQL } = require("@prisma/adapter-libsql");
  const { createClient } = require("@libsql/client");
  
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  
  adapter = new PrismaLibSQL(libsql);
} else {
  // Development: Use local SQLite
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
