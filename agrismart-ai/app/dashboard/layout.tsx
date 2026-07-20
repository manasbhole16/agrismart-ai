import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Ambient background glow for dashboard */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl -z-10 pointer-events-none"></div>
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
