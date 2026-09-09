import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign, Building2, LineChart, ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

import { Calculator } from "@/components/savings/Calculator";

const TITLE = "US Savings & Retirement Calculator with State Tax | SavingsPro US";
const DESC =
  "Free US savings calculator: model 401(k) match, Roth vs Traditional IRA, state taxes, inflation and market scenarios, then see compound growth year by year.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const FAQS = [
  {
    q: "What is the difference between a Roth IRA and a 401(k)?",
    a: "A 401(k) is an employer plan funded with pre-tax dollars: you skip income tax today and pay ordinary income tax on every dollar you withdraw in retirement. Many employers also match part of your contribution, which is an immediate return you cannot get anywhere else. A Roth IRA is funded with money you have already paid tax on, and qualified withdrawals after age 59½ come out completely tax free, including all growth. Roth accounts also have no required minimum distributions during the original owner's lifetime. Many savers use both: enough in the 401(k) to capture the full employer match, then a Roth IRA for tax diversification.",
  },
  {
    q: "How does state tax affect my savings?",
    a: "State tax matters twice. When you withdraw from a 401(k) or Traditional IRA, most states tax that money as ordinary income — 13.3% at the top in California versus 0% in Florida, Texas, Nevada, Washington, Tennessee, South Dakota, Wyoming, Alaska and New Hampshire. In a taxable brokerage account, most states tax realized capital gains at their ordinary income rate rather than the lower federal long-term rate, which creates an annual drag on compounding. Some states also exempt part of retirement income for older residents, so the effective rate you pay can be lower than the headline rate used in this calculator.",
  },
  {
    q: "Why should I adjust my projection for inflation?",
    a: "Because a dollar in 2055 will not buy what a dollar buys today. At 2.9% average inflation, purchasing power halves in roughly 24 years, so a $1,000,000 nominal balance thirty years out feels closer to $425,000 in today's money. Adjusting for inflation converts your projection into 'real' terms, which is the only honest way to judge whether a retirement number actually supports the lifestyle you have in mind.",
  },
  {
    q: "How much should I keep in an emergency fund before investing?",
    a: "Three to six months of essential living expenses is the standard guidance — closer to three if you have stable dual income, closer to six (or more) if you are self-employed, on commission, or the sole earner. Keep it in a high-yield savings account or money market fund, not in stocks, because the point is that the money is there on the day markets are down and your car breaks. Only after that buffer exists should surplus cash flow into long-term investments, apart from capturing an employer 401(k) match, which is usually worth doing first.",
  },
  {
    q: "How does compound frequency change the result?",
    a: "Compounding is growth earning growth. This calculator compounds monthly, which mirrors how most funds reinvest dividends and how automated contributions actually land. More frequent compounding raises the effective annual yield slightly — 7% compounded monthly is about 7.23% effective versus 7.00% compounded annually — but the far bigger lever is time. Starting ten years earlier typically beats any realistic difference in compounding frequency or even a percentage point of extra return.",
  },
];

function Home() {
  return (
    <TooltipProvider>
      <div id="top" className="min-h-screen bg-background">
        <SiteHeader />

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> Free · No signup · Nothing stored
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl">
                Know exactly what your savings will be worth —{" "}
                <span className="brand-gradient-text">after tax and inflation</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Most calculators show a flattering nominal number. SavingsPro US models your state's
                tax rate, your employer's 401(k) match, inflation, market scenarios and an emergency
                buffer, so the figure you see is the one you can actually spend.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-border pt-5">
                {[
                  ["51", "States & DC modelled"],
                  ["4", "Account types compared"],
                  ["60yr", "Maximum horizon"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-bold text-primary">{n}</p>
                    <p className="text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-ink rounded-3xl p-8 shadow-[var(--shadow-lift)]">
              <h2 className="text-xl font-bold">Built for American savers</h2>
              <ul className="mt-6 space-y-5">
                {[
                  [BadgeDollarSign, "Employer match modelling", "See what leaving the match on the table really costs over 30 years."],
                  [Building2, "State-by-state tax", "From 0% in Texas to 13.3% in California, applied to the right account type."],
                  [LineChart, "Bull, average and bear", "Stress-test the plan instead of assuming one perfect return forever."],
                ].map(([Icon, title, body]) => {
                  const I = Icon as typeof BadgeDollarSign;
                  return (
                    <li key={title as string} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <I className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold">{title as string}</p>
                        <p className="text-sm opacity-70">{body as string}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <Calculator />

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">How this calculator works</h2>
          <p className="mt-3 text-muted-foreground">
            A plain-English guide to the maths behind your projection, and the three forces that
            decide how much of it you keep.
          </p>

          <article className="prose-none mt-8 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
            <div>
              <h3 className="text-xl font-bold text-foreground">1. Compounding does most of the work</h3>
              <p className="mt-2">
                Every month the calculator grows your balance by one twelfth of your expected annual
                return, then adds your contribution and any employer match. Next month the return
                applies to a bigger balance — that is compounding. In a typical thirty-year
                projection at 7%, more than half the ending balance is growth rather than money you
                deposited. The effect is heavily front-loaded in time: the first ten years of
                contributions have three decades to work, which is why starting early beats saving
                harder later. Bi-weekly savers get a quiet bonus, because 26 payments a year is
                equal to 13 monthly payments rather than 12.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">2. Taxes decide what you keep</h3>
              <p className="mt-2">
                Where you save changes the after-tax outcome as much as what you earn on it. A
                401(k) and a Traditional IRA grow untaxed and are then taxed as ordinary income at
                withdrawal, so this tool applies your federal marginal rate plus your state income
                tax rate to the final balance. A Roth IRA is funded with taxed dollars and qualified
                withdrawals are tax free, so nothing is subtracted at the end. A taxable brokerage
                account is different again: gains are taxed as they are realised, so instead of one
                deduction at the end the calculator applies an annual drag equal to your combined
                federal and state capital gains rate. That drag compounds against you year after
                year, which is why brokerage accounts usually trail tax-advantaged ones even at the
                same gross return.
              </p>
              <p className="mt-2">
                Employer matching sits outside all of this and is simply the best return available.
                A 50% match on a $600 monthly contribution is $300 a month of free money — a 50%
                instant gain before markets do anything at all.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">3. Inflation quietly shrinks the target</h3>
              <p className="mt-2">
                Nominal future value is the number on your statement. Real value is what it buys.
                The calculator divides the projected balance by (1 + inflation) raised to the number
                of years, giving you today's purchasing power. Toggling inflation on is often
                sobering, and it is the correct way to size a retirement goal: if you need $60,000 a
                year in today's money, the nominal figure you must hit thirty years out is far
                higher than $60,000 × 25.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">4. Buffers and scenarios keep it honest</h3>
              <p className="mt-2">
                The emergency fund toggle sets aside three to six months of living expenses from
                your starting cash before anything is invested, mirroring how a real plan is
                sequenced. The market scenario selector shifts your expected return by three points
                in each direction, showing how a long bear market or an unusually strong decade
                changes the outcome. Neither is a prediction — they exist so your plan does not
                depend on a single optimistic assumption.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-5 text-sm">
              <strong className="text-foreground">Assumptions and limits.</strong> Returns are
              compounded monthly, contributions occur at month end, tax rates are simplified
              top-line figures, and contribution limits, RMDs, early-withdrawal penalties, filing
              status, deductions and credits are not modelled. Treat every output as an educational
              estimate rather than a forecast.
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section id="faqs" className="mx-auto mt-16 max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <SiteFooter />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
