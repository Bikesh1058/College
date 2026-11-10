import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ArrowRightIcon } from "./Icons";

const DEFAULT_MESSAGE = "College updates and announcements.";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("");

  const { data: pageData } = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home'),
    staleTime: 60000,
    retry: false
  });

  const newsSection = pageData?.sections?.find(s => s.type === 'newsletter')?.content;

  const eyebrow = newsSection?.eyebrow || "Stay connected";
  const title = newsSection?.title || "Keep up with life at Khwopa.";
  const description = newsSection?.description || "Receive college news, academic announcements and important updates in one place.";

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Connecting to college server...");

    try {
      const res = await api.subscribeNewsletter(normalizedEmail);
      setStatus("success");
      setMessage(res.message || "Thank you for subscribing! A confirmation email has been sent.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || err.message || "Subscription could not be processed. Please try again.");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  return (
    <section className="bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#102238] border border-[#1b3452]">
        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full border border-white/5" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#dfbd77]">
              {eyebrow}
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#c6d4e2]">
              {description}
            </p>
          </div>

          <div className="relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                disabled={status === "loading"}
                placeholder="Enter your email address (e.g. bikesh1058@gmail.com)"
                required
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-[#9bb0c4] transition focus:border-[#dfbd77] focus:bg-white/15 focus:ring-2 focus:ring-[#dfbd77]/20 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#dfbd77] px-7 py-4 text-sm font-bold text-[#102238] transition hover:bg-[#ebd094] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102238] disabled:opacity-60"
              >
                <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <p
              aria-live="polite"
              className={`mt-4 min-h-5 text-xs font-medium leading-relaxed transition ${
                status === "success"
                  ? "text-emerald-300 font-semibold"
                  : status === "error"
                  ? "text-rose-300 font-semibold"
                  : "text-[#dfbd77]"
              }`}
            >
              {message || DEFAULT_MESSAGE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
