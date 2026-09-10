# Savings Pro Us

Build a full-featured, single-page web app for a world-class financial savings calculator tailored for US users, optimized for high user engagement and Google AdSense approval. Use React, Tailwind CSS, Lucide icons, and Recharts.

The page structure must follow a high-converting landing page layout containing:

1. HEADER & NAVIGATION:

   - Modern clean header with logo placeholder "SavingsPro US", navigation links (Calculator, How It Works, Tax Guide, FAQs), and a responsive mobile drawer menu.

2. MAIN CALCULATOR TOOL DASHBOARD:

   - Goal-Based Savings Tracker: Inputs for Goal Name (e.g., House Down Payment, Retirement, Emergency Fund), Target Amount ($), and Time Horizon (years/months). Real-time progress bar showing projected completion.

   - Core Inputs & Micro-Savings: Initial Deposit, Monthly/Bi-weekly Contributions, Expected Return (%), and an Automated Micro-Savings toggle (round-ups/daily micro-contributions).

   - Advanced US Tax & Account Comparison: Dropdown for all US States to calculate state-level income/capital gains tax. Account Type Selector to compare 401(k) (with Employer Match %), Roth IRA, Traditional IRA, and Taxable Brokerage accounts with pre-tax vs. after-tax real return visualizations.

   - Inflation & Market Scenarios: Toggle for Inflation Adjustment (%) showing "Today's Purchasing Power" vs "Nominal Future Value", plus Market Scenario Sliders (Bull, Average, Bearish).

   - Emergency Fund Buffer: Toggle to reserve 3-6 months of living expenses before allocating savings toward long-term goals.

   - Interactive Visuals: Recharts stacked area chart for Contributions vs Compound Growth over time.

   - Interactive Tooltips: Informational tooltips on hover for every financial term (401k match, compound frequency, inflation, capital gains).

   - Utility Features: One-click "Download PDF Report" summary modal and a "Share Projection" link copy button.

3. MONETIZATION & AD PLACEMENT SLOTS:

   - Clean, strategically placed AdSense placeholder banners (e.g., Header Leaderboard, Sidebar Sticky Ad, Mid-content Ad) integrated naturally without interfering with UX.

4. SEO & ADSENSE TEXT CONTENT (Below the Tool):

   - "How This Calculator Works" Section: Rich, structured educational text explaining compounding, inflation, and tax advantages.

   - Frequently Asked Questions (FAQ Section): Accordion UI answering top 5 financial questions (e.g., "What is the difference between Roth IRA and 401(k)?", "How does state tax affect savings?", "Why adjust for inflation?").

5. FOOTER & MANDATORY LEGAL PAGES/MODALS:

   - Comprehensive footer with Quick Links, Contact info, and Modal/Drawer triggers for:

     * Privacy Policy

     * Terms of Service

     * Financial Disclaimer ("This calculator is for educational and informational purposes only and does not constitute financial or legal advice.")

     * About Us & Contact Form

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://savestrategist-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/824d3c1e-0950-4b80-a45a-2f4ac1d2f0c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
