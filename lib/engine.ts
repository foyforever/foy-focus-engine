import { Answers, CreatorLane, EngineResult } from './types';

const LANE_MAP: Record<Answers['strength'], CreatorLane> = {
  teaching: 'Content Creator',
  solving: 'Service Provider',
  building: 'Product Seller',
  hosting: 'Community/Events',
  closing: 'Sales/Closer'
};

const SUPPORT_ENGINE: Record<CreatorLane, string> = {
  'Content Creator': 'Offer a lightweight cohort workshop once per month.',
  'Service Provider': 'Package a repeatable diagnostic + implementation sprint.',
  'Product Seller': 'Run weekly demos and an upsell to premium templates/tools.',
  'Community/Events': 'Sell annual memberships with quarterly paid intensives.',
  'Sales/Closer': 'Add commission-based closing services with retainer floor.'
};

export function buildPlan(primaryLane: CreatorLane): string[] {
  return [
    `Week 1: Choose one ${primaryLane} offer and define target customer + promise.`,
    'Week 2: Build a one-page offer and simple booking / checkout flow.',
    'Week 3: Publish your positioning statement and outreach script.',
    'Week 4: Create 3 proof assets (sample, case story, or walkthrough).',
    'Week 5: Run first campaign and track replies/leads daily.',
    'Week 6: Close feedback loop and refine offer pricing + objections.',
    'Week 7: Systemize lead follow-up with a simple weekly cadence.',
    'Week 8: Launch support revenue engine beta to existing leads.',
    'Week 9: Publish progress report and collect testimonials.',
    'Week 10: Remove one low-leverage channel and double down on winner.',
    'Week 11: Repeat best campaign with 2x volume.',
    'Week 12: Review 90-day metrics and set next single-lane commitment.'
  ];
}

export function calculateResults(answers: Answers): EngineResult {
  const primaryLane = LANE_MAP[answers.strength];
  const distractionKillRule = `For the next 90 days, I commit to ${primaryLane} as my primary lane and I will reject ideas that do not directly support my weekly milestone.`;

  return {
    primaryLane,
    supportRevenueEngine: SUPPORT_ENGINE[primaryLane],
    distractionKillRule,
    plan: buildPlan(primaryLane)
  };
}
