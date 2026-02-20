import { z } from 'zod';

export const answersSchema = z.object({
  strength: z.enum(['teaching', 'solving', 'building', 'hosting', 'closing']),
  monetization: z.enum(['audience', 'high-ticket', 'digital-products', 'memberships', 'commission']),
  energy: z.enum(['camera', 'calls', 'systems', 'groups', 'deals']),
  timeline: z.enum(['quick-cash', 'balanced', 'long-term'])
});

export const submissionSchema = z.object({
  email: z.string().email(),
  answers: answersSchema
});
