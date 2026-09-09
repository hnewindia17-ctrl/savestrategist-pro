import { useState } from "react";
import { Menu, PiggyBank, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#calculator", label: "Calculator" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#tax-guide", label: "Tax Guide" },
  { href: "#faqs", label: "FAQs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <PiggyBank className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Savings<span className="text-primary">Pro</span> US
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#calculator">Start calculating</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
