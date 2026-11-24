import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false } };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-main-background text-text-primary min-h-screen">{children}</div>;
}
