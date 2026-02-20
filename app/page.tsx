import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">MVP for overwhelmed creators</p>
        <h1 className="text-4xl font-bold leading-tight">FOY Focus Engine</h1>
        <p className="mx-auto max-w-xl text-slate-600">
          Stop spinning on 20 ideas. Answer a short guided questionnaire and get your single creator lane,
          support revenue engine, distraction kill rule, and a practical 90-day plan.
        </p>
      </div>

      <div className="card space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Pick one lane. Commit for 90 days.</h2>
        <p className="text-slate-600">It takes ~4 minutes. Full results unlock after email capture.</p>
        <Link
          href="/quiz"
          className="inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Start Focus Questionnaire
        </Link>
      </div>
    </section>
  );
}
