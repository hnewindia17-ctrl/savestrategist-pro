import { useState } from "react";
import { Mail, MapPin, PiggyBank, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type ModalKey = "privacy" | "terms" | "disclaimer" | "about" | null;

const PRIVACY = [
  "SavingsPro US does not require an account and does not store the numbers you enter. All calculations run locally in your browser and are discarded when you close the tab.",
  "We use privacy-friendly analytics to count page views and understand which sections readers use. We may serve advertising through Google AdSense. Google and its partners may use cookies or device identifiers to serve ads based on your prior visits to this or other websites.",
  "You can opt out of personalised advertising at any time through Google Ads Settings. Residents of California (CCPA/CPRA) and the EU/UK (GDPR) may request access to or deletion of any personal data we hold by contacting us at savingsprous@gmail.com.",
  "Children under 13 should not use this site. We do not knowingly collect information from children.",
];

const TERMS = [
  "By using SavingsPro US you agree to these terms. The calculator, the articles and the FAQ are provided on an as-is basis for general educational use.",
  "You may use the tool freely for personal, non-commercial planning. You may not scrape, resell, or republish the calculator or its content without written permission.",
  "Projections rely on assumptions you choose. Market returns are not guaranteed, tax rules change, and results will differ from real-world outcomes. We accept no liability for financial decisions made using this tool.",
  "These terms are governed by the laws of the United States. We may update them at any time; continued use means you accept the updated version.",
];

const DISCLAIMER = [
  "This calculator is for educational and informational purposes only and does not constitute financial or legal advice.",
  "SavingsPro US is not a registered investment adviser, broker-dealer, tax preparer or law firm. Nothing here is a recommendation to buy, sell or hold any security or to adopt any particular tax strategy.",
  "State and federal tax rates used in the tool are simplified top-line approximations and do not reflect brackets, deductions, credits, filing status, phase-outs, contribution limits, RMDs or early-withdrawal penalties.",
  "Investing involves risk, including possible loss of principal. Past performance never guarantees future results. Always consult a licensed financial adviser or CPA before making decisions about your money.",
];

export function SiteFooter() {
  const [modal, setModal] = useState<ModalKey>(null);

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks! Your message has been queued.", {
      description: "This demo form does not send email yet.",
    });
    e.currentTarget.reset();
  };

  return (
    <footer className="hero-ink mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <PiggyBank className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">SavingsPro US</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed opacity-75">
            Free, no-signup savings and retirement projections built for American savers, with state
            tax, inflation and account-type modelling.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm opacity-75">
            {[
              ["#calculator", "Savings Calculator"],
              ["#how-it-works", "How It Works"],
              ["#tax-guide", "US Tax Guide"],
              ["#faqs", "FAQs"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-opacity hover:opacity-100">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm opacity-75">
            {(
              [
                ["privacy", "Privacy Policy"],
                ["terms", "Terms of Service"],
                ["disclaimer", "Financial Disclaimer"],
                ["about", "About Us & Contact"],
              ] as [Exclude<ModalKey, null>, string][]
            ).map(([key, label]) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setModal(key)}
                  className="transition-opacity hover:opacity-100"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-75">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" /> savingsprous@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> 1200 Market Street, Suite 400
              <br />
              Philadelphia, PA 19107
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> Educational use only — not advice
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs opacity-60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} SavingsPro US. All rights reserved.</p>
          <p>
            This calculator is for educational and informational purposes only and does not
            constitute financial or legal advice.
          </p>
        </div>
      </div>

      <Dialog open={modal !== null} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl">
          {modal === "about" ? (
            <>
              <DialogHeader>
                <DialogTitle>About Us & Contact</DialogTitle>
                <DialogDescription>
                  Independent, ad-supported financial education for US savers.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[55vh] pr-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  SavingsPro US was built by a small team of engineers and personal-finance writers
                  who were tired of retirement calculators that ignore state taxes, inflation and
                  employer matching. Every projection you run stays in your browser. We keep the
                  tool free by showing a small number of clearly marked ads.
                </p>
                <form onSubmit={send} className="mt-6 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="name" placeholder="Your name" required />
                    <Input name="email" type="email" placeholder="Email address" required />
                  </div>
                  <Input name="subject" placeholder="Subject" required />
                  <Textarea name="message" placeholder="How can we help?" rows={4} required />
                  <Button type="submit" className="w-full sm:w-auto">
                    Send message
                  </Button>
                </form>
              </ScrollArea>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  {modal === "privacy"
                    ? "Privacy Policy"
                    : modal === "terms"
                      ? "Terms of Service"
                      : "Financial Disclaimer"}
                </DialogTitle>
                <DialogDescription>Last updated {new Date().getFullYear()}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[55vh] pr-4">
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {(modal === "privacy" ? PRIVACY : modal === "terms" ? TERMS : DISCLAIMER).map(
                    (p, i) => (
                      <p key={i}>{p}</p>
                    ),
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </footer>
  );
}
