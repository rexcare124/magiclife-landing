"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/(site)/contact/actions";
import { contact, interests } from "@/content/pages/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-ink placeholder:text-ink/35 transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const searchParams = useSearchParams();
  const requested = searchParams.get("interest");
  const defaultInterest = interests.some((i) => i.value === requested) ? requested! : "";

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const formKey = state.status === "error" ? JSON.stringify(v) : "blank";

  return (
    <div className="rounded-card border border-line bg-pearl p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-ink text-gold-light ring-1 ring-gold/40">
              <CheckCircle2 aria-hidden className="size-7" />
            </span>
            <h2 className="mt-6 font-heading text-2xl sm:text-3xl">{contact.form.success.title}</h2>
            <p className="mt-3 max-w-sm text-muted">{contact.form.success.body}</p>
          </motion.div>
        ) : (
          <motion.form
            key={formKey}
            action={formAction}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            className="relative grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <h2 className="font-heading text-2xl sm:text-3xl">{contact.form.title}</h2>
              <p className="mt-2 text-muted">{contact.form.body}</p>
            </div>

            <Field id="name" label="Full name" error={err.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                defaultValue={v.name}
                aria-invalid={!!err.name}
                aria-describedby={err.name ? "name-error" : undefined}
                className={clsx(inputClass, err.name ? "border-red-500" : "border-line")}
                placeholder="Jane Smith"
              />
            </Field>

            <Field id="email" label="Email" error={err.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={v.email}
                aria-invalid={!!err.email}
                aria-describedby={err.email ? "email-error" : undefined}
                className={clsx(inputClass, err.email ? "border-red-500" : "border-line")}
                placeholder="jane@example.com"
              />
            </Field>

            <Field id="company" label="Company (optional)" error={err.company}>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                defaultValue={v.company}
                aria-invalid={!!err.company}
                aria-describedby={err.company ? "company-error" : undefined}
                className={clsx(inputClass, err.company ? "border-red-500" : "border-line")}
                placeholder="Acme Inc."
              />
            </Field>

            <Field id="interest" label="I'm interested in" error={err.interest}>
              <div className="relative">
                <select
                  id="interest"
                  name="interest"
                  required
                  defaultValue={v.interest ?? defaultInterest}
                  aria-invalid={!!err.interest}
                  aria-describedby={err.interest ? "interest-error" : undefined}
                  className={clsx(inputClass, "appearance-none pr-11", err.interest ? "border-red-500" : "border-line")}
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  {interests.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gold-deep" />
              </div>
            </Field>

            <Field id="message" label="Message" error={err.message} className="sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                defaultValue={v.message}
                aria-invalid={!!err.message}
                aria-describedby={err.message ? "message-error" : undefined}
                className={clsx(inputClass, "resize-y", err.message ? "border-red-500" : "border-line")}
                placeholder="Tell us how we can help..."
              />
            </Field>

            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite" className={clsx("text-sm", state.status === "error" ? "text-red-600" : "text-muted")}>
                {state.status === "error" ? state.message : "We'll only use your details to reply to you."}
              </p>
              <button
                type="submit"
                disabled={pending}
                className="group inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-ink py-2 pr-2 pl-6 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:self-auto"
              >
                {pending ? "Sending..." : "Send message"}
                <span className="flex size-9 items-center justify-center rounded-full bg-gold text-ink">
                  {pending ? (
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
