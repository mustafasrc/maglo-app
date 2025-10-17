"use client"; // React Query client-side çalışır

import React, { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { validateAuth } from '@/lib/validateAuth';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    validateAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
