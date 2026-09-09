import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Coins,
  Download,
  Flame,
  LifeBuoy,
  Link2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldLabel, InfoTip } from "@/components/site/InfoTip";

import {
  ACCOUNTS,
  US_STATES,
  calculate,
  usd,
  type AccountType,
  type CalcInput,
  type Scenario,
} from "@/lib/savings";

const GOAL_PRESETS = [
  { name: "House Down Payment", target: 80000, years: 7 },
  { name: "Retirement", target: 1500000, years: 30 },
  { name: "Emergency Fund", target: 25000, years: 3 },
  { name: "College Fund", target: 120000, years: 15 },
];

const SCENARIOS: { id: Scenario; label: string; note: string }[] = [
  { id: "bear", label: "Bearish", note: "−3% vs. your expected return" },
  { id: "average", label: "Average", note: "Your expected return" },
  { id: "bull", label: "Bull", note: "+3% vs. your expected return" },
];

const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v.replace(/[^0-9.]/g, "")) || 0));

export function Calculator() {
  const [goalName, setGoalName] = useState("House Down Payment");
  const [targetAmount, setTargetAmount] = useState(80000);
  const [years, setYears] = useState(7);
  const [months, setMonths] = useState(0);

  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [contribution, setContribution] = useState(600);
  const [biweekly, setBiweekly] = useState(false);
  const [microSavings, setMicroSavings] = useState(true);
  const [microDaily, setMicroDaily] = useState(2);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [scenario, setScenario] = useState<Scenario>("average");

  const [account, setAccount] = useState<AccountType>("401k");
  const [employerMatchPct, setEmployerMatchPct] = useState(50);
  const [stateCode, setStateCode] = useState("CA");
  const [federalMarginal, setFederalMarginal] = useState(22);
  const [federalCapGains, setFederalCapGains] = useState(15);

  const [inflationOn, setInflationOn] = useState(true);
  const [inflationRate, setInflationRate] = useState(2.9);

  const [emergencyOn, setEmergencyOn] = useState(true);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3200);
  const [emergencyMonths, setEmergencyMonths] = useState(3);

  const [reportOpen, setReportOpen] = useState(false);

  const input: CalcInput = {
    initialDeposit,
    monthlyContribution: contribution,
    biweekly,
    microSavings,
    microDaily,
    annualReturn,
    scenario,
    years,
    months,
    account,
    employerMatchPct,
    stateCode,
    federalMarginal,
    federalCapGains,
    inflationOn,
    inflationRate,
    emergencyOn,
    monthlyExpenses,
    emergencyMonths,
    targetAmount,
  };

  const result = useMemo(() => calculate(input), [JSON.stringify(input)]);

  const comparison = useMemo(
    () => ACCOUNTS.map((a) => ({ ...a, res: calculate({ ...input, account: a.id }) })),
    [JSON.stringify(input)],
  );
  const bestAfterTax = Math.max(...comparison.map((c) => c.res.afterTax));

  const stateInfo = US_STATES.find((s) => s.code === stateCode);

  const applyPreset = (p: (typeof GOAL_PRESETS)[number]) => {
    setGoalName(p.name);
    setTargetAmount(p.target);
    setYears(p.years);
    setMonths(0);
  };

  const shareLink = () => {
    const params = new URLSearchParams({
      goal: goalName,
      target: String(targetAmount),
      years: String(years),
      initial: String(initialDeposit),
      monthly: String(contribution),
      rate: String(annualReturn),
      account,
      state: stateCode,
    });
    const url =
      (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "") +
      "?" +
      params.toString();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Projection link copied to clipboard");
    }
  };

  const goalEta = result.monthsToGoal
    ? `${Math.floor(result.monthsToGoal / 12)}y ${result.monthsToGoal % 12}m`
    : "Not reached in this window";

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* GOAL TRACKER */}
          <div className="surface-card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Goal-Based Savings Tracker</h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {GOAL_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    goalName === p.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted/40 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <FieldLabel title="Goal name" htmlFor="goal" />
                <Input id="goal" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
              </div>
              <div>
                <FieldLabel
                  title="Target amount ($)"
                  htmlFor="target"
                  tip="The dollar figure you want to hit. Progress below compares your projection to this number."
                />
                <Input
                  id="target"
                  inputMode="numeric"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(num(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel title="Years" htmlFor="years" />
                  <Input
                    id="years"
                    inputMode="numeric"
                    value={years}
                    onChange={(e) => setYears(Math.min(60, num(e.target.value)))}
                  />
                </div>
                <div>
                  <FieldLabel title="Months" htmlFor="months" />
                  <Input
                    id="months"
                    inputMode="numeric"
                    value={months}
                    onChange={(e) => setMonths(Math.min(11, num(e.target.value)))}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-muted/50 p-4">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Projected completion
                  </p>
                  <p className="font-display text-2xl font-bold">
                    {result.goalProgress.toFixed(1)}%
                    <span className="ml-2 text-sm font-medium text-muted-foreground">
                      of {usd(targetAmount)}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Goal reached in <span className="font-semibold text-foreground">{goalEta}</span>
                </p>
              </div>
              <Progress value={result.goalProgress} className="mt-3 h-2.5" />
            </div>
          </div>

          {/* CORE INPUTS */}
          <div className="surface-card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Contributions & Micro-Savings</h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <FieldLabel
                  title="Initial deposit"
                  htmlFor="initial"
                  tip="Cash you can invest today. If an emergency buffer is on, it is carved out of this first."
                />
                <Input
                  id="initial"
                  inputMode="numeric"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(num(e.target.value))}
                />
              </div>
              <div>
                <FieldLabel
                  title={biweekly ? "Bi-weekly amount" : "Monthly amount"}
                  htmlFor="contrib"
                  tip="Bi-weekly savers make 26 payments a year — two more than twice-monthly, which quietly boosts totals."
                />
                <Input
                  id="contrib"
                  inputMode="numeric"
                  value={contribution}
                  onChange={(e) => setContribution(num(e.target.value))}
                />
              </div>
              <div>
                <FieldLabel
                  title="Expected return (%)"
                  htmlFor="ret"
                  tip="Long-run average annual return before inflation. US large-cap stocks have averaged roughly 7–10% nominal historically."
                />
                <Input
                  id="ret"
                  inputMode="decimal"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Math.min(30, Number(e.target.value) || 0))}
                />
              </div>
              <div className="flex flex-col justify-end gap-3">
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-xs font-semibold">Bi-weekly mode</span>
                  <Switch checked={biweekly} onCheckedChange={setBiweekly} />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-foreground" />
                  <span className="text-sm font-semibold">Automated micro-savings</span>
                  <InfoTip label="micro savings">
                    Round-ups and small daily transfers. A $2/day habit is about $61/month — small
                    money that compounds like any other contribution.
                  </InfoTip>
                </div>
                <Switch checked={microSavings} onCheckedChange={setMicroSavings} />
              </div>
              {microSavings && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Daily round-up amount</span>
                    <span className="font-semibold text-foreground">
                      {usd(microDaily, 2)}/day · {usd(microDaily * 30.4)}/mo
                    </span>
                  </div>
                  <Slider
                    className="mt-3"
                    value={[microDaily]}
                    min={0}
                    max={20}
                    step={0.5}
                    onValueChange={(v) => setMicroDaily(v[0] ?? 0)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* TAX & ACCOUNTS */}
          <div id="tax-guide" className="surface-card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">US Tax & Account Comparison</h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <FieldLabel
                  title="Your state"
                  tip="State income tax hits pre-tax withdrawals; state capital gains tax drags on brokerage growth. Nine states levy neither."
                />
                <Select value={stateCode} onValueChange={setStateCode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state">
                      {stateInfo ? `${stateInfo.name} — ${stateInfo.incomeTax}%` : "Select state"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {US_STATES.map((s) => (
                      <SelectItem key={s.code} value={s.code}>
                        {s.name} — {s.incomeTax}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FieldLabel
                  title="Federal bracket (%)"
                  htmlFor="fed"
                  tip="Your marginal ordinary income rate, used when pre-tax 401(k)/Traditional IRA money is withdrawn."
                />
                <Input
                  id="fed"
                  inputMode="decimal"
                  value={federalMarginal}
                  onChange={(e) => setFederalMarginal(Math.min(50, Number(e.target.value) || 0))}
                />
              </div>
              <div>
                <FieldLabel
                  title="Federal cap gains (%)"
                  htmlFor="cg"
                  tip="Long-term capital gains are taxed at 0%, 15% or 20% federally depending on income."
                />
                <Input
                  id="cg"
                  inputMode="decimal"
                  value={federalCapGains}
                  onChange={(e) => setFederalCapGains(Math.min(40, Number(e.target.value) || 0))}
                />
              </div>
              <div>
                <FieldLabel
                  title="Employer match (%)"
                  htmlFor="match"
                  tip="A 50% match adds 50 cents per dollar you contribute, up to your plan cap. It is an instant, risk-free return."
                />
                <Input
                  id="match"
                  inputMode="decimal"
                  disabled={account !== "401k"}
                  value={employerMatchPct}
                  onChange={(e) => setEmployerMatchPct(Math.min(200, Number(e.target.value) || 0))}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {comparison.map((c) => {
                const active = c.id === account;
                const best = c.res.afterTax >= bestAfterTax - 1;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setAccount(c.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{c.label}</span>
                      {best && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
                          Best
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{c.blurb}</p>
                    <Separator className="my-3" />
                    <dl className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Pre-tax</dt>
                        <dd className="font-semibold">{usd(c.res.nominal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">After tax</dt>
                        <dd className="font-bold text-primary">{usd(c.res.afterTax)}</dd>
                      </div>
                    </dl>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {stateInfo?.name} applies roughly {stateInfo?.incomeTax}% income tax and{" "}
              {stateInfo?.capGainsTax}% on investment gains. Figures are simplified top-line rates
              for illustration only.
            </p>
          </div>

          {/* INFLATION + SCENARIOS + EMERGENCY */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="surface-card p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Inflation & Market Scenarios</h2>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Adjust for inflation</span>
                  <InfoTip label="inflation">
                    Inflation erodes buying power. $1M in 30 years at 2.9% inflation buys about what
                    $425k buys today.
                  </InfoTip>
                </div>
                <Switch checked={inflationOn} onCheckedChange={setInflationOn} />
              </div>

              {inflationOn && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Annual inflation rate</span>
                    <span className="font-semibold text-foreground">
                      {inflationRate.toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    className="mt-3"
                    value={[inflationRate]}
                    min={0}
                    max={8}
                    step={0.1}
                    onValueChange={(v) => setInflationRate(v[0] ?? 0)}
                  />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        Nominal future value
                      </p>
                      <p className="font-display text-lg font-bold">{usd(result.nominal)}</p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        Today's purchasing power
                      </p>
                      <p className="font-display text-lg font-bold text-primary">
                        {usd(result.realValue)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Market scenario
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SCENARIOS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setScenario(s.id)}
                      className={`rounded-lg border px-2 py-2.5 text-center transition-colors ${
                        scenario === s.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-sm font-bold">{s.label}</span>
                      <span className="mt-0.5 block text-[10px] opacity-80">{s.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-card p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Emergency Fund Buffer</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Reserve living expenses in cash before long-term money goes to work. The reserve is
                taken from your initial deposit first.
              </p>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <span className="text-sm font-semibold">Reserve a buffer first</span>
                <Switch checked={emergencyOn} onCheckedChange={setEmergencyOn} />
              </div>

              {emergencyOn && (
                <div className="mt-4 space-y-4">
                  <div>
                    <FieldLabel title="Monthly living expenses" htmlFor="exp" />
                    <Input
                      id="exp"
                      inputMode="numeric"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(num(e.target.value))}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Months of cover</span>
                      <span className="font-semibold text-foreground">{emergencyMonths} months</span>
                    </div>
                    <Slider
                      className="mt-3"
                      value={[emergencyMonths]}
                      min={3}
                      max={6}
                      step={1}
                      onValueChange={(v) => setEmergencyMonths(v[0] ?? 3)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-[11px] uppercase text-muted-foreground">Cash reserved</p>
                      <p className="font-display text-lg font-bold">{usd(result.emergencyReserve)}</p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-[11px] uppercase text-muted-foreground">Invested today</p>
                      <p className="font-display text-lg font-bold">{usd(result.investedStart)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CHART */}
          <div className="surface-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Contributions vs. Compound Growth</h2>
                <p className="text-sm text-muted-foreground">
                  Where every dollar of your {usd(result.nominal)} balance comes from.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={shareLink}>
                  <Link2 className="mr-1.5 h-4 w-4" /> Share projection
                </Button>
                <Button size="sm" onClick={() => setReportOpen(true)}>
                  <Download className="mr-1.5 h-4 w-4" /> PDF report
                </Button>
              </div>
            </div>

            <div className="mt-6 h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.series} margin={{ left: 4, right: 4, top: 4 }}>
                  <defs>
                    <linearGradient id="gContrib" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="gGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.15} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis
                    tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`}
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    width={56}
                    stroke="var(--color-muted-foreground)"
                  />
                  <RTooltip
                    formatter={(v: number, n: string) => [usd(v), n]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    name="Contributions"
                    stackId="1"
                    stroke="var(--color-chart-3)"
                    fill="url(#gContrib)"
                  />
                  <Area
                    type="monotone"
                    dataKey="growth"
                    name="Compound growth"
                    stackId="1"
                    stroke="var(--color-chart-1)"
                    fill="url(#gGrowth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="surface-card hero-ink border-0 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
              Projected balance
            </p>
            <p className="font-display text-4xl font-bold">{usd(result.nominal)}</p>
            <p className="mt-1 flex items-center gap-1 text-sm opacity-80">
              <ArrowUpRight className="h-4 w-4" />
              {usd(result.growth)} of that is compound growth
            </p>

            <Separator className="my-4 bg-white/15" />

            <dl className="space-y-2.5 text-sm">
              {[
                ["You contribute", usd(result.contributed)],
                ["Employer adds", usd(result.employerMonthly * result.totalMonths)],
                ["Estimated tax", usd(result.taxPaid)],
                ["After-tax value", usd(result.afterTax)],
                ["In today's dollars", usd(result.realValue)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="opacity-70">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-lg print:shadow-none">
          <DialogHeader>
            <DialogTitle>{goalName} — savings report</DialogTitle>
            <DialogDescription>
              {years}y {months}m horizon · {ACCOUNTS.find((a) => a.id === account)?.label} ·{" "}
              {stateInfo?.name}
            </DialogDescription>
          </DialogHeader>
          <dl className="divide-y divide-border rounded-xl border border-border text-sm">
            {[
              ["Target amount", usd(targetAmount)],
              ["Projected balance", usd(result.nominal)],
              ["Goal progress", `${result.goalProgress.toFixed(1)}%`],
              ["Total contributions", usd(result.contributed)],
              ["Compound growth", usd(result.growth)],
              ["Estimated taxes", usd(result.taxPaid)],
              ["After-tax value", usd(result.afterTax)],
              ["Today's purchasing power", usd(result.realValue)],
              ["Emergency reserve", usd(result.emergencyReserve)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-muted-foreground">
            Educational estimate only — not financial or tax advice.
          </p>
          <Button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="w-full"
          >
            <Download className="mr-1.5 h-4 w-4" /> Download PDF report
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
