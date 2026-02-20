import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FOY Focus Engine',
  description: 'Find your primary creator lane and ship for 90 days.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
