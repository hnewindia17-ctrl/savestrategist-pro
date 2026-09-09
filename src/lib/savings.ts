export type AccountType = "401k" | "roth" | "trad" | "taxable";

export type Scenario = "bear" | "average" | "bull";

export interface StateInfo {
  code: string;
  name: string;
  /** Top marginal state income tax rate (approximate, %) */
  incomeTax: number;
  /** Rate applied to long-term investment gains at the state level (%) */
  capGainsTax: number;
}

export const US_STATES: StateInfo[] = [
  { code: "AL", name: "Alabama", incomeTax: 5, capGainsTax: 5 },
  { code: "AK", name: "Alaska", incomeTax: 0, capGainsTax: 0 },
  { code: "AZ", name: "Arizona", incomeTax: 2.5, capGainsTax: 2.5 },
  { code: "AR", name: "Arkansas", incomeTax: 3.9, capGainsTax: 2.7 },
  { code: "CA", name: "California", incomeTax: 13.3, capGainsTax: 13.3 },
  { code: "CO", name: "Colorado", incomeTax: 4.4, capGainsTax: 4.4 },
  { code: "CT", name: "Connecticut", incomeTax: 6.99, capGainsTax: 6.99 },
  { code: "DE", name: "Delaware", incomeTax: 6.6, capGainsTax: 6.6 },
  { code: "DC", name: "District of Columbia", incomeTax: 10.75, capGainsTax: 10.75 },
  { code: "FL", name: "Florida", incomeTax: 0, capGainsTax: 0 },
  { code: "GA", name: "Georgia", incomeTax: 5.39, capGainsTax: 5.39 },
  { code: "HI", name: "Hawaii", incomeTax: 11, capGainsTax: 7.25 },
  { code: "ID", name: "Idaho", incomeTax: 5.695, capGainsTax: 5.695 },
  { code: "IL", name: "Illinois", incomeTax: 4.95, capGainsTax: 4.95 },
  { code: "IN", name: "Indiana", incomeTax: 3.05, capGainsTax: 3.05 },
  { code: "IA", name: "Iowa", incomeTax: 3.8, capGainsTax: 3.8 },
  { code: "KS", name: "Kansas", incomeTax: 5.58, capGainsTax: 5.58 },
  { code: "KY", name: "Kentucky", incomeTax: 4, capGainsTax: 4 },
  { code: "LA", name: "Louisiana", incomeTax: 3, capGainsTax: 3 },
  { code: "ME", name: "Maine", incomeTax: 7.15, capGainsTax: 7.15 },
  { code: "MD", name: "Maryland", incomeTax: 5.75, capGainsTax: 5.75 },
  { code: "MA", name: "Massachusetts", incomeTax: 9, capGainsTax: 5 },
  { code: "MI", name: "Michigan", incomeTax: 4.25, capGainsTax: 4.25 },
  { code: "MN", name: "Minnesota", incomeTax: 9.85, capGainsTax: 9.85 },
  { code: "MS", name: "Mississippi", incomeTax: 4.7, capGainsTax: 4.7 },
  { code: "MO", name: "Missouri", incomeTax: 4.8, capGainsTax: 4.8 },
  { code: "MT", name: "Montana", incomeTax: 5.9, capGainsTax: 4.1 },
  { code: "NE", name: "Nebraska", incomeTax: 5.2, capGainsTax: 5.2 },
  { code: "NV", name: "Nevada", incomeTax: 0, capGainsTax: 0 },
  { code: "NH", name: "New Hampshire", incomeTax: 0, capGainsTax: 0 },
  { code: "NJ", name: "New Jersey", incomeTax: 10.75, capGainsTax: 10.75 },
  { code: "NM", name: "New Mexico", incomeTax: 5.9, capGainsTax: 3.5 },
  { code: "NY", name: "New York", incomeTax: 10.9, capGainsTax: 10.9 },
  { code: "NC", name: "North Carolina", incomeTax: 4.5, capGainsTax: 4.5 },
  { code: "ND", name: "North Dakota", incomeTax: 2.5, capGainsTax: 2.04 },
  { code: "OH", name: "Ohio", incomeTax: 3.5, capGainsTax: 3.5 },
  { code: "OK", name: "Oklahoma", incomeTax: 4.75, capGainsTax: 4.75 },
  { code: "OR", name: "Oregon", incomeTax: 9.9, capGainsTax: 9.9 },
  { code: "PA", name: "Pennsylvania", incomeTax: 3.07, capGainsTax: 3.07 },
  { code: "RI", name: "Rhode Island", incomeTax: 5.99, capGainsTax: 5.99 },
  { code: "SC", name: "South Carolina", incomeTax: 6.2, capGainsTax: 3.72 },
  { code: "SD", name: "South Dakota", incomeTax: 0, capGainsTax: 0 },
  { code: "TN", name: "Tennessee", incomeTax: 0, capGainsTax: 0 },
  { code: "TX", name: "Texas", incomeTax: 0, capGainsTax: 0 },
  { code: "UT", name: "Utah", incomeTax: 4.55, capGainsTax: 4.55 },
  { code: "VT", name: "Vermont", incomeTax: 8.75, capGainsTax: 8.75 },
  { code: "VA", name: "Virginia", incomeTax: 5.75, capGainsTax: 5.75 },
  { code: "WA", name: "Washington", incomeTax: 0, capGainsTax: 7 },
  { code: "WV", name: "West Virginia", incomeTax: 4.82, capGainsTax: 4.82 },
  { code: "WI", name: "Wisconsin", incomeTax: 7.65, capGainsTax: 5.36 },
  { code: "WY", name: "Wyoming", incomeTax: 0, capGainsTax: 0 },
];

export const SCENARIO_DELTA: Record<Scenario, number> = {
  bear: -3,
  average: 0,
  bull: 3,
};

export const ACCOUNTS: { id: AccountType; label: string; blurb: string }[] = [
  { id: "401k", label: "401(k)", blurb: "Pre-tax contributions + employer match, taxed at withdrawal" },
  { id: "trad", label: "Traditional IRA", blurb: "Pre-tax growth, ordinary income tax at withdrawal" },
  { id: "roth", label: "Roth IRA", blurb: "After-tax dollars in, tax-free qualified withdrawals" },
  { id: "taxable", label: "Taxable Brokerage", blurb: "No limits, but gains are taxed as they are realized" },
];

export interface CalcInput {
  initialDeposit: number;
  monthlyContribution: number;
  biweekly: boolean;
  microSavings: boolean;
  microDaily: number;
  annualReturn: number;
  scenario: Scenario;
  years: number;
  months: number;
  account: AccountType;
  employerMatchPct: number;
  stateCode: string;
  federalMarginal: number;
  federalCapGains: number;
  inflationOn: boolean;
  inflationRate: number;
  emergencyOn: boolean;
  monthlyExpenses: number;
  emergencyMonths: number;
  targetAmount: number;
}

export interface YearPoint {
  year: number;
  label: string;
  contributions: number;
  growth: number;
  total: number;
  real: number;
}

export interface CalcResult {
  totalMonths: number;
  effectiveMonthly: number;
  employerMonthly: number;
  emergencyReserve: number;
  investedStart: number;
  series: YearPoint[];
  nominal: number;
  contributed: number;
  growth: number;
  afterTax: number;
  realValue: number;
  taxPaid: number;
  goalProgress: number;
  monthsToGoal: number | null;
}

const FALLBACK_STATE: StateInfo = { code: "TX", name: "Texas", incomeTax: 0, capGainsTax: 0 };
const state = (code: string): StateInfo =>
  US_STATES.find((s) => s.code === code) ?? FALLBACK_STATE;

export function monthlyBase(i: CalcInput) {
  const base = i.biweekly ? (i.monthlyContribution * 26) / 12 : i.monthlyContribution;
  const micro = i.microSavings ? i.microDaily * 30.4 : 0;
  return base + micro;
}

export function calculate(i: CalcInput): CalcResult {
  const st = state(i.stateCode);
  const totalMonths = Math.max(1, Math.round(i.years * 12 + i.months));
  const contribution = monthlyBase(i);
  const employerMonthly =
    i.account === "401k" ? contribution * (Math.max(0, i.employerMatchPct) / 100) : 0;
  const emergencyReserve = i.emergencyOn ? i.monthlyExpenses * i.emergencyMonths : 0;
  const investedStart = Math.max(0, i.initialDeposit - emergencyReserve);

  const grossAnnual = Math.max(-20, i.annualReturn + SCENARIO_DELTA[i.scenario]);
  // Taxable accounts pay tax on gains each year, creating a drag on the rate.
  const dragRate =
    i.account === "taxable" ? (i.federalCapGains + st.capGainsTax) / 100 : 0;
  const netAnnual = grossAnnual * (1 - dragRate);
  const rMonthly = netAnnual / 100 / 12;

  let balance = investedStart;
  let contributed = investedStart;
  const series: YearPoint[] = [
    {
      year: 0,
      label: "Now",
      contributions: Math.round(contributed),
      growth: 0,
      total: Math.round(balance),
      real: Math.round(balance),
    },
  ];
  let monthsToGoal: number | null = null;

  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + rMonthly) + contribution + employerMonthly;
    contributed += contribution + employerMonthly;
    if (monthsToGoal === null && i.targetAmount > 0 && balance >= i.targetAmount) monthsToGoal = m;
    if (m % 12 === 0 || m === totalMonths) {
      const growth = Math.max(0, balance - contributed);
      const yrs = m / 12;
      const real = i.inflationOn ? balance / Math.pow(1 + i.inflationRate / 100, yrs) : balance;
      series.push({
        year: Number(yrs.toFixed(1)),
        label: `Yr ${Math.round(yrs)}`,
        contributions: Math.round(Math.min(contributed, balance)),
        growth: Math.round(growth),
        total: Math.round(balance),
        real: Math.round(real),
      });
    }
  }

  const nominal = balance;
  const growth = Math.max(0, nominal - contributed);

  let afterTax = nominal;
  if (i.account === "401k" || i.account === "trad") {
    afterTax = nominal * (1 - (i.federalMarginal + st.incomeTax) / 100);
  } else if (i.account === "taxable") {
    afterTax = nominal; // annual drag already applied
  }
  const taxPaid = Math.max(0, nominal - afterTax);

  const yearsTotal = totalMonths / 12;
  const realValue = i.inflationOn
    ? afterTax / Math.pow(1 + i.inflationRate / 100, yearsTotal)
    : afterTax;

  return {
    totalMonths,
    effectiveMonthly: contribution,
    employerMonthly,
    emergencyReserve,
    investedStart,
    series,
    nominal,
    contributed,
    growth,
    afterTax,
    realValue,
    taxPaid,
    goalProgress: i.targetAmount > 0 ? Math.min(100, (nominal / i.targetAmount) * 100) : 0,
    monthsToGoal,
  };
}

export const usd = (n: number, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(Number.isFinite(n) ? n : 0);
