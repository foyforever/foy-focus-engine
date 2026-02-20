'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Answers } from '@/lib/types';

const STEPS = [
  {
    key: 'strength',
    title: 'What is your natural business strength?',
    options: [
      ['teaching', 'Teaching and explaining ideas'],
      ['solving', 'Solving specific client problems'],
      ['building', 'Building products/templates/tools'],
      ['hosting', 'Hosting groups and experiences'],
      ['closing', 'Closing deals and handling objections']
    ]
  },
  {
    key: 'monetization',
    title: 'How do you most want to monetize?',
    options: [
      ['audience', 'Grow audience then monetize'],
      ['high-ticket', 'High-ticket one-to-one offers'],
      ['digital-products', 'Digital products sales'],
      ['memberships', 'Membership / event model'],
      ['commission', 'Commission + close deals']
    ]
  },
  {
    key: 'energy',
    title: 'Where do you get the most energy?',
    options: [
      ['camera', 'Camera / content creation'],
      ['calls', 'Client calls'],
      ['systems', 'Designing systems and assets'],
      ['groups', 'Leading communities/groups'],
      ['deals', 'Sales conversations']
    ]
  },
  {
    key: 'timeline',
    title: 'What timeline pressure are you under?',
    options: [
      ['quick-cash', 'Need quick cash in < 30 days'],
      ['balanced', 'Balanced cash now + long-term'],
      ['long-term', 'Optimizing for long-term brand equity']
    ]
  }
] as const;

const initialAnswers: Partial<Answers> = {};

export default function QuizFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>(initialAnswers);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const current = STEPS[step];
  const complete = useMemo(() => STEPS.every((s) => answers[s.key as keyof Answers]), [answers]);

  const select = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    setError('');
  };

  const next = () => {
    if (!answers[current.key as keyof Answers]) {
      setError('Choose one option to continue.');
      return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const submit = async () => {
    setError('');
    if (!complete) {
      setError('Please complete all questions first.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Could not save your submission.');
        setLoading(false);
        return;
      }
      router.push(`/results/${data.id}`);
    } catch (e) {
      setError('Unexpected error. Please retry.');
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="card space-y-4">
        <p className="text-sm font-medium text-slate-500">Step {step + 1} of {STEPS.length}</p>
        <h1 className="text-2xl font-semibold">{current.title}</h1>
        <div className="space-y-3">
          {current.options.map(([value, label]) => {
            const isSelected = answers[current.key as keyof Answers] === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => select(value)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  isSelected ? 'border-brand bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
            disabled={step === 0}
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
            disabled={step === STEPS.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      {step === STEPS.length - 1 && complete ? (
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold">Unlock your full results</h2>
          <p className="text-sm text-slate-600">
            Enter your email to see your primary creator lane, support engine, distraction kill rule, and 90-day plan.
          </p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-white"
          >
            {loading ? 'Saving...' : 'Show My Focus Plan'}
          </button>
        </div>
      ) : null}
    </section>
  );
}
