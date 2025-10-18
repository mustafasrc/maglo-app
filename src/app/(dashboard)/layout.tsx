"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 ">
        <div className="p-4 lg:p-6">
          <div className="mb-5">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
          </div>

          <div className="space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
