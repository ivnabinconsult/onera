"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setCheckEmail(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky px-4">
      <div className="w-full max-w-md bg-white border border-line rounded-2xl p-6 sm:p-9">
        <Link href="/" className="flex justify-center mb-7">
          <Image src="/logo.png" alt="On3ra" width={150} height={45} className="h-9 w-auto" />
        </Link>

        {checkEmail ? (
          <div className="text-center">
            <h1 className="text-xl font-display font-semibold text-navy mb-2">Check your email</h1>
            <p className="text-slate text-sm">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-display font-semibold text-navy mb-1 text-center">Start your free trial</h1>
            <p className="text-slate text-sm text-center mb-7">14 days free, no card required.</p>

            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Full name</label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-3 border border-line rounded-lg text-base focus:border-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Work email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 border border-line rounded-lg text-base focus:border-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-3 border border-line rounded-lg text-base focus:border-blue outline-none"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition mt-2"
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-slate mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue font-semibold">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
