"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "../_actions/auth";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-25 px-4">
      <div className="w-full max-w-md">
        <div className="bg-brand-0 rounded-xl shadow-lg shadow-brand-200/40 border border-brand-200 p-8">
          <h1 className="text-2xl font-heading font-bold text-brand-900 text-center mb-6">
            Create Account
          </h1>

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-0 text-brand-900"
                placeholder="your_username"
              />
              <p className="mt-1 text-xs text-brand-500">
                3-20 characters, letters, numbers, and underscores only
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                Display Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-0 text-brand-900"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-0 text-brand-900"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-brand-500">
                At least 6 characters
              </p>
            </div>

            {state?.error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-brand-600">
              Already have an account?{" "}
              <Link
                href="/workspace/login"
                className="font-medium text-brand-700 hover:text-brand-900 underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
