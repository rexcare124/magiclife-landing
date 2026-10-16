"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { countries, countryAliases } from "@/content/countries";

export function CountrySelect({
  id,
  defaultValue = "",
  error,
  className,
}: {
  id: string;
  defaultValue?: string;
  error?: string;
  className: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const [query, setQuery] = useState(defaultValue);
  const [selected, setSelected] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [active, setActive] = useState(0);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || (browsing && q === selected.trim().toLowerCase())) return [...countries];
    return countries.filter((name) => {
      if (name.toLowerCase().includes(q)) return true;
      return (countryAliases[name] ?? []).some((alias) => alias.includes(q));
    });
  }, [query, browsing, selected]);

  useEffect(() => {
    if (open && !browsing) setActive(0);
  }, [query, browsing, open]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  function choose(name: string) {
    setSelected(name);
    setQuery(name);
    setBrowsing(true);
    setOpen(false);
  }

  function showAll() {
    setBrowsing(true);
    setOpen(true);
    const index = countries.findIndex((name) => name === selected);
    setActive(index >= 0 ? index : 0);
  }

  return (
    <div ref={rootRef}>
      <input type="hidden" name="country" value={selected} />
      <div className="relative">
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          value={query}
          placeholder="Search for a country"
          className={clsx(className, "pr-12")}
          onChange={(event) => {
            const next = event.target.value;
            setBrowsing(false);
            setQuery(next);
            setSelected(countries.find((name) => name.toLowerCase() === next.trim().toLowerCase()) ?? "");
            setOpen(true);
          }}
          onFocus={showAll}
          onClick={showAll}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              setActive((index) => Math.min(index + 1, Math.max(matches.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              setActive((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter" && open && matches[active]) {
              event.preventDefault();
              choose(matches[active]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        <button
          type="button"
          aria-label={open ? "Hide countries" : "Show countries"}
          onClick={() => {
            if (open) setOpen(false);
            else showAll();
          }}
          className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink hover:text-gold-light"
        >
          <ChevronDown aria-hidden className={clsx("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <ul id={listId} role="listbox" className="mt-2 max-h-52 overflow-y-auto rounded-2xl border border-line bg-white py-1 shadow-lg">
          {matches.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">No countries match that search.</li>
          ) : (
            matches.map((name, index) => (
              <li
                key={name}
                ref={index === active ? activeRef : undefined}
                role="option"
                aria-selected={name === selected}
                className={clsx(
                  "cursor-pointer px-4 py-2.5 text-sm",
                  index === active || name === selected ? "bg-gold/20 text-ink" : "text-ink hover:bg-pearl",
                )}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  choose(name);
                }}
              >
                {name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
