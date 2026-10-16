"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { CountrySelect } from "@/components/member/CountrySelect";
import { isCountry } from "@/content/countries";
import type { MembershipState } from "@/components/member/schema";

const MemberModalContext = createContext<(() => void) | null>(null);

export function useOpenMemberModal() {
  const open = useContext(MemberModalContext);
  if (!open) throw new Error("useOpenMemberModal must be used within MemberModalProvider");
  return open;
}

export function MemberModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const openModal = useCallback(() => {
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  return (
    <MemberModalContext.Provider value={openModal}>
      {children}
      <MemberModal open={open} session={session} onClose={() => setOpen(false)} />
    </MemberModalContext.Provider>
  );
}

const initialState: MembershipState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-ink placeholder:text-ink/35 transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

function MemberModal({ open, session, onClose }: { open: boolean; session: number; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) dialog.querySelector<HTMLInputElement>("#member-name")?.focus();
  }, [open, session]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="member-dialog"
      onClose={onClose}
    >
      {open && <MembershipForm key={session} titleId={titleId} onClose={onClose} />}
    </dialog>
  );
}

async function submitMembership(formData: FormData): Promise<MembershipState> {
  const response = await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      country: String(formData.get("country") ?? ""),
      telegram: String(formData.get("telegram") ?? ""),
      discord: String(formData.get("discord") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      hasUpwork: formData.get("hasUpwork") === "on",
      upwork: String(formData.get("upwork") ?? ""),
      hasLinkedin: formData.get("hasLinkedin") === "on",
      linkedin: String(formData.get("linkedin") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    }),
  });

  const body = (await response.json()) as MembershipState;
  if (!body || (body.status !== "success" && body.status !== "error")) {
    return { status: "error", message: "We could not save your membership. Please try again." };
  }
  return body;
}

function MembershipForm({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const [state, setState] = useState<MembershipState>(initialState);
  const [pending, setPending] = useState(false);
  const formKey = state.status === "error" ? JSON.stringify(state.values) : "blank";

  const submit = useCallback(async (formData: FormData) => {
    setPending(true);
    try {
      setState(await submitMembership(formData));
    } catch {
      setState({ status: "error", message: "We could not save your membership. Please try again." });
    } finally {
      setPending(false);
    }
  }, []);

  return (
    <div className="rounded-card border border-gold/30 bg-pearl p-6 text-ink shadow-2xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-gold-deep uppercase">Membership</p>
          <h2 id={titleId} className="mt-2 font-heading text-2xl sm:text-3xl">
            Become a member
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink hover:text-gold-light"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-ink text-gold-light ring-1 ring-gold/40">
              <CheckCircle2 aria-hidden className="size-7" />
            </span>
            <h3 className="mt-6 font-heading text-2xl">Congratulations</h3>
            <p className="mt-3 max-w-sm text-muted">
              You are now a member of our community. An admin will contact you for the next step.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-ink px-6 py-3 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Close
            </button>
          </motion.div>
        ) : (
          <MembershipFields key={formKey} state={state} onApply={submit} pending={pending} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MembershipFields({
  state,
  onApply,
  pending,
}: {
  state: MembershipState;
  onApply: (formData: FormData) => void;
  pending: boolean;
}) {
  const saved = state.values;
  const serverErrors = state.errors ?? {};
  const [step, setStep] = useState<1 | 2>(
    serverErrors.name ||
    serverErrors.email ||
    serverErrors.country ||
    serverErrors.telegram ||
    serverErrors.discord ||
    serverErrors.whatsapp ||
    serverErrors.contacts
      ? 1
      : state.status === "error"
        ? 2
        : 1,
  );
  const [hasUpwork, setHasUpwork] = useState(saved?.hasUpwork ?? false);
  const [hasLinkedin, setHasLinkedin] = useState(saved?.hasLinkedin ?? false);
  const [localErrors, setLocalErrors] = useState<MembershipState["errors"]>({});
  const err = { ...serverErrors, ...localErrors };

  return (
    <motion.form
      noValidate
      className="relative mt-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;
        const data = new FormData(event.currentTarget);
        if (step === 1) {
          const name = String(data.get("name") ?? "").trim();
          const email = String(data.get("email") ?? "").trim();
          const country = String(data.get("country") ?? "").trim();
          const telegram = String(data.get("telegram") ?? "").trim();
          const discord = String(data.get("discord") ?? "").trim();
          const whatsapp = String(data.get("whatsapp") ?? "").trim();
          const next: MembershipState["errors"] = {};
          if (name.length < 2) next.name = "Please enter your full name.";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
          if (!isCountry(country)) next.country = "Please select your country.";
          if (telegram && telegram.length < 2) next.telegram = "Please enter a valid Telegram ID.";
          if (discord && discord.length < 2) next.discord = "Please enter a valid Discord ID.";
          if (whatsapp && whatsapp.length < 2) next.whatsapp = "Please enter a valid WhatsApp number.";
          if (!telegram && !discord && !whatsapp) next.contacts = "Please enter at least one of Telegram, Discord, or WhatsApp.";
          setLocalErrors(next);
          if (Object.keys(next).length === 0) setStep(2);
          return;
        }
        onApply(data);
      }}
    >
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-gold-deep">Step {step} of 2</p>
        <span className="flex flex-1 gap-1.5" aria-hidden>
          <span className="h-1 flex-1 rounded-full bg-ink" />
          <span className={clsx("h-1 flex-1 rounded-full", step === 2 ? "bg-ink" : "bg-line")} />
        </span>
      </div>

      <div className={step === 1 ? "mt-5 grid gap-5" : "hidden"}>
        <p className="text-muted">Tell us how to reach you. Add every way we can reach you. At least one is required.</p>

        <div className="grid gap-5 md:grid-cols-2">
        <Field id="member-name" label="Full name" required error={err.name}>
          <input
            id="member-name"
            name="name"
            autoComplete="name"
            required
            defaultValue={saved?.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "member-name-error" : undefined}
            className={clsx(inputClass, err.name ? "border-red-500" : "border-line")}
            placeholder="Jane Smith"
          />
        </Field>

        <Field id="member-email" label="Email" required error={err.email}>
          <input
            id="member-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={saved?.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "member-email-error" : undefined}
            className={clsx(inputClass, err.email ? "border-red-500" : "border-line")}
            placeholder="jane@example.com"
          />
        </Field>

        <Field id="member-country" label="Country" required error={err.country}>
          <CountrySelect
            id="member-country"
            defaultValue={saved?.country}
            error={err.country}
            className={clsx(inputClass, err.country ? "border-red-500" : "border-line")}
          />
        </Field>

          <Field id="member-telegram" label="Telegram ID" error={err.telegram}>
            <input
              id="member-telegram"
              name="telegram"
              defaultValue={saved?.telegram}
              aria-invalid={!!err.telegram || !!err.contacts}
              aria-describedby={err.telegram ? "member-telegram-error" : err.contacts ? "member-contacts-error" : undefined}
              className={clsx(inputClass, err.telegram || err.contacts ? "border-red-500" : "border-line")}
              placeholder="@username"
            />
          </Field>
          <Field id="member-discord" label="Discord ID" error={err.discord}>
            <input
              id="member-discord"
              name="discord"
              defaultValue={saved?.discord}
              aria-invalid={!!err.discord || !!err.contacts}
              aria-describedby={err.discord ? "member-discord-error" : err.contacts ? "member-contacts-error" : undefined}
              className={clsx(inputClass, err.discord || err.contacts ? "border-red-500" : "border-line")}
              placeholder="username"
            />
          </Field>
          <Field id="member-whatsapp" label="WhatsApp number" error={err.whatsapp}>
            <input
              id="member-whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              defaultValue={saved?.whatsapp}
              aria-invalid={!!err.whatsapp || !!err.contacts}
              aria-describedby={err.whatsapp ? "member-whatsapp-error" : err.contacts ? "member-contacts-error" : undefined}
              className={clsx(inputClass, err.whatsapp || err.contacts ? "border-red-500" : "border-line")}
              placeholder="+1 202 555 0100"
            />
          </Field>
          {err.contacts && (
            <p id="member-contacts-error" className="text-sm text-red-600 md:col-span-2">
              {err.contacts}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={(event) => event.currentTarget.form?.requestSubmit()}
            className="group inline-flex items-center gap-4 rounded-full bg-ink py-2 pr-2 pl-6 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Continue
            <span className="flex size-9 items-center justify-center rounded-full bg-gold text-ink">
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>

      <div className={step === 2 ? "mt-5 grid gap-5" : "hidden"}>
        <p className="text-muted">Add your profiles if you have them. You can leave these blank.</p>

        <fieldset className="rounded-2xl border border-line bg-white/60 p-4">
          <legend className="px-1 text-sm font-medium">Profiles (optional)</legend>
          <div className="grid gap-4 md:grid-cols-2">
          <ProfileToggle
            id="member-upwork"
            name="hasUpwork"
            checked={hasUpwork}
            onChange={setHasUpwork}
            label="I have an Upwork account"
            linkLabel="Upwork profile link"
            linkName="upwork"
            linkDefault={saved?.upwork}
            linkPlaceholder="https://www.upwork.com/freelancers/your-name"
            error={err.upwork}
          />
          <ProfileToggle
            id="member-linkedin"
            name="hasLinkedin"
            checked={hasLinkedin}
            onChange={setHasLinkedin}
            label="I have a LinkedIn account"
            linkLabel="LinkedIn profile link"
            linkName="linkedin"
            linkDefault={saved?.linkedin}
            linkPlaceholder="https://www.linkedin.com/in/your-name"
            error={err.linkedin}
          />
          </div>
        </fieldset>

        <Field id="member-message" label="Message to support" error={err.message}>
          <textarea
            id="member-message"
            name="message"
            rows={4}
            defaultValue={saved?.message}
            aria-invalid={!!err.message}
            aria-describedby={err.message ? "member-message-error" : undefined}
            className={clsx(inputClass, "resize-y", err.message ? "border-red-500" : "border-line")}
            placeholder="Anything you'd like our team to know"
          />
        </Field>

        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="member-website">Website</label>
          <input id="member-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className={clsx("text-sm", state.status === "error" ? "text-red-600" : "text-muted")}>
            {state.status === "error" ? state.message : "We'll only use your details to contact you."}
          </p>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-ink py-2 pr-2 pl-6 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? "Sending..." : "Apply"}
              <span className="flex size-9 items-center justify-center rounded-full bg-gold text-ink">
                {pending ? (
                  <Loader2 aria-hidden className="size-4 animate-spin" />
                ) : (
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}

function ProfileToggle({
  id,
  name,
  checked,
  onChange,
  label,
  linkLabel,
  linkName,
  linkDefault,
  linkPlaceholder,
  error,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  linkLabel: string;
  linkName: string;
  linkDefault?: string;
  linkPlaceholder: string;
  error?: string;
}) {
  const inputId = `${id}-link`;

  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-gold-deep"
        />
        {label}
      </label>
      <AnimatePresence initial={false}>
        {checked && (
          <motion.div
            key="link"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
                {linkLabel} <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={inputId}
                name={linkName}
                type="url"
                inputMode="url"
                defaultValue={linkDefault}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={clsx(inputClass, error ? "border-red-500" : "border-line")}
                placeholder={linkPlaceholder}
              />
              {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required && (
          <span className="text-gold-deep" aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
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
