"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, loginAsDemo } from "../_actions/auth";
import { useEffect, useState, useTransition } from "react";

type DemoUser = {
  id: string;
  name: string;
  username: string;
};

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/workspace";

  const [state, formAction, isPending] = useActionState(login, null);
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>([]);
  const [isLoadingDemo, startDemoTransition] = useTransition();

  useEffect(() => {
    fetch("/api/demo-users")
      .then((res) => res.json())
      .then((data) => setDemoUsers(data))
      .catch(() => {});
  }, []);

  const handleDemoLogin = (userId: string) => {
    startDemoTransition(async () => {
      await loginAsDemo(userId);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-25 px-4">
      <div className="w-full max-w-md">
        <div className="bg-brand-0 rounded-xl shadow-lg shadow-brand-200/40 border border-brand-200 p-8">
          <h1 className="text-2xl font-heading font-bold text-brand-950 text-center mb-6">
            Login to Workspace
          </h1>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectTo} />

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-brand-950 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-transparent bg-brand-0 text-brand-950"
                placeholder="your_username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brand-950 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-transparent bg-brand-0 text-brand-950"
                placeholder="••••••••"
              />
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
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-brand-950">
              Don&apos;t have an account?{" "}
              <Link
                href="/workspace/register"
                className="font-medium text-brand-950 hover:text-brand-950 underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>

          {demoUsers.length > 0 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-brand-0 text-brand-950">
                    or try a demo account
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {demoUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user.id)}
                    disabled={isLoadingDemo}
                    className="w-full py-2 px-4 bg-brand-100 hover:bg-brand-200 text-brand-950 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    Login as {user.name} (@{user.username})
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-25">
        <div className="text-brand-950">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
