"use client"; // React Query client-side çalışır

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/lib/react-query";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
