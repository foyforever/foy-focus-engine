export type CreatorLane =
  | 'Content Creator'
  | 'Service Provider'
  | 'Product Seller'
  | 'Community/Events'
  | 'Sales/Closer';

export type Answers = {
  strength: 'teaching' | 'solving' | 'building' | 'hosting' | 'closing';
  monetization: 'audience' | 'high-ticket' | 'digital-products' | 'memberships' | 'commission';
  energy: 'camera' | 'calls' | 'systems' | 'groups' | 'deals';
  timeline: 'quick-cash' | 'balanced' | 'long-term';
};

export type EngineResult = {
  primaryLane: CreatorLane;
  supportRevenueEngine: string;
  distractionKillRule: string;
  plan: string[];
};
