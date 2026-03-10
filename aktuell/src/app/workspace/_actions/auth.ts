"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createSession,
  deleteSession,
  hashPassword,
  verifyPassword,
  validateUsername,
  validatePassword,
} from "@/lib/auth";

type ActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Login mit Username + Passwort
 */
export async function login(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirect") as string) || "/workspace";

  if (!username || !password) {
    return { success: false, error: "Username and password are required" };
  }

  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!user) {
    return { success: false, error: "Invalid username or password" };
  }

  if (!user.passwordHash) {
    return { success: false, error: "This account has no password. Use demo login." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid username or password" };
  }

  await createSession(user.id);
  redirect(redirectTo);
}

/**
 * Login als Demo-User (kein Passwort nötig)
 */
export async function loginAsDemo(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.isDemo) {
    throw new Error("Invalid demo user");
  }

  await createSession(user.id);
  redirect("/workspace");
}

/**
 * Neuen Account registrieren
 */
export async function register(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const username = (formData.get("username") as string)?.toLowerCase();
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!username || !name || !password) {
    return { success: false, error: "All fields are required" };
  }

  const usernameError = validateUsername(username);
  if (usernameError) {
    return { success: false, error: usernameError };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { success: false, error: passwordError };
  }

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    return { success: false, error: "Username already taken" };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      name,
      passwordHash,
      isDemo: false,
    },
  });

  await createSession(user.id);
  redirect("/workspace");
}

/**
 * Logout — Session löschen und zur Login-Seite
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/workspace/login");
}
