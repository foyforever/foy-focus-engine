import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import AdminLogin from '@/components/AdminLogin';

export default async function AdminPage() {
  const adminCookie = cookies().get('admin_auth')?.value;
  const valid = Boolean(process.env.ADMIN_PASSWORD) && adminCookie === process.env.ADMIN_PASSWORD;

  if (!valid) {
    return <AdminLogin />;
  }

  const submissions = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Leads</h1>
        <a href="/api/admin/export" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
          Export CSV
        </a>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-100">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Primary Lane</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{submission.id}</td>
                <td className="px-4 py-3">{submission.email}</td>
                <td className="px-4 py-3">{submission.primaryLane}</td>
                <td className="px-4 py-3">{submission.createdAt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
