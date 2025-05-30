import type { ReactNode } from 'react';
import Header from "./header";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950/20">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

