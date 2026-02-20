import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type Props = { params: { id: string } };

export default async function ResultsPage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) notFound();

  const milestones = JSON.parse(submission.weeklyMilestonesJson) as string[];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Your FOY Focus Results</h1>

      <div className="card space-y-2">
        <p className="text-sm text-slate-500">Primary Creator Lane</p>
        <p className="text-2xl font-semibold text-brand">{submission.primaryLane}</p>
      </div>

      <div className="card space-y-2">
        <p className="text-sm text-slate-500">Support Revenue Engine</p>
        <p>{submission.supportRevenueEngine}</p>
      </div>

      <div className="card space-y-2">
        <p className="text-sm text-slate-500">Distraction Kill Rule (90-Day Commitment)</p>
        <p className="font-medium">{submission.distractionKillRule}</p>
      </div>

      <div className="card space-y-3">
        <p className="text-sm text-slate-500">Simple 90-Day Plan (Weekly Milestones)</p>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {milestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ol>
      </div>

      <Link href="/quiz" className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">
        Take again
      </Link>
    </section>
  );
}
