import { NextResponse } from 'next/server';
import { calculateResults } from '@/lib/engine';
import { prisma } from '@/lib/prisma';
import { submissionSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = submissionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
  }

  const { email, answers } = parsed.data;
  const result = calculateResults(answers);

  const created = await prisma.submission.create({
    data: {
      email,
      answersJson: JSON.stringify(answers),
      primaryLane: result.primaryLane,
      supportRevenueEngine: result.supportRevenueEngine,
      distractionKillRule: result.distractionKillRule,
      weeklyMilestonesJson: JSON.stringify(result.plan)
    }
  });

  return NextResponse.json({ id: created.id });
}
