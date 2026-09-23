"use client";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistErrorResponse {
  error?: string;
}

export function useWaitlistSubmit() {
  const [email, setEmail] = useState("");
  const [favoriteSport, setFavoriteSport] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email)) {
      setError("כתובת אימייל לא תקינה. נסו שוב.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, favoriteSport, company: honeypot }),
      });

      const data: WaitlistErrorResponse | null = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? "משהו השתבש. נסו שוב.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setError("אין חיבור לרשת. נסו שוב.");
      setStatus("idle");
    }
  };

  return {
    email,
    setEmail,
    favoriteSport,
    setFavoriteSport,
    honeypot,
    setHoneypot,
    error,
    setError,
    status,
    handleSubmit,
  };
}
