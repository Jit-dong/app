import type { ReactNode } from 'react';
import Header from "./header";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {/* You can add a global footer here if needed */}
      {/* <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} 芯智 AI 助手。保留所有权利。
      </footer> */}
    </div>
  );
}

