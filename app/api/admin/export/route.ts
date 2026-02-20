import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function GET() {
  const adminCookie = cookies().get('admin_auth')?.value;
  const valid = Boolean(process.env.ADMIN_PASSWORD) && adminCookie === process.env.ADMIN_PASSWORD;

  if (!valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const submissions = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });
  const header = ['id', 'email', 'primaryLane', 'supportRevenueEngine', 'createdAt'];

  const rows = submissions.map((row) =>
    [
      row.id.toString(),
      row.email,
      row.primaryLane,
      row.supportRevenueEngine,
      row.createdAt.toISOString()
    ]
      .map(escapeCsv)
      .join(',')
  );

  const csv = [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="foy-focus-leads.csv"'
    }
  });
}
