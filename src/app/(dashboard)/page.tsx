"use client";

import { Suspense, useMemo } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { TotalWallet, CardWallet } from "@/components/icons";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import {
  FinancialSummaryResponse,
  TransactionsResponse,
  ScheduledTransfersResponse,
  WalletCardsResponse,
  WorkingCapitalResponse
} from "@/types";

import { lazy } from "react";

const WorkingCapitalChart = lazy(() => import("@/components/dashboard/WorkingCapitalChart"));
const RecentTransaction = lazy(() => import("@/components/dashboard/RecentTransaction"));
const WalletCard = lazy(() => import("@/components/dashboard/WalletCard"));
const ScheduledTransfers = lazy(() => import("@/components/dashboard/ScheduledTransfers"));

// Query configuration
const QUERY_CONFIG = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;

export default function DashboardPage() {
  // Stats query
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiFetch<FinancialSummaryResponse>('/financial/summary'),
    ...QUERY_CONFIG,
  });

  // Transactions query
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['dashboard-transactions', { limit: 5 }],
    queryFn: () => apiFetch<TransactionsResponse>('/financial/transactions/recent?limit=5'),
    ...QUERY_CONFIG,
  });

  // Scheduled transfers query
  const { data: scheduled, isLoading: scheduledLoading } = useQuery({
    queryKey: ['dashboard-scheduled'],
    queryFn: () => apiFetch<ScheduledTransfersResponse>('/financial/transfers/scheduled'),
    ...QUERY_CONFIG,
  });

  // Wallet query
  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ['dashboard-wallet'],
    queryFn: () => apiFetch<WalletCardsResponse>('/financial/wallet'),
    ...QUERY_CONFIG,
  });

  // Working capital query
  const { data: workingCapital, isLoading: workingCapitalLoading } = useQuery({
    queryKey: ['dashboard-working-capital'],
    queryFn: () => apiFetch<WorkingCapitalResponse>('/financial/working-capital'),
    ...QUERY_CONFIG,
  });

  // Memoize data to prevent unnecessary re-renders
  const statsData = useMemo(() => stats?.data, [stats?.data]);
  const transactionsData = useMemo(() => transactions?.data.transactions || [], [transactions?.data]);
  const scheduledData = useMemo(() => scheduled?.data.transfers || [], [scheduled?.data]);
  const walletData = useMemo(() => wallet?.data.cards || [], [wallet?.data]);
  const workingCapitalData = useMemo(() => workingCapital?.data.data || [], [workingCapital?.data]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-12">
        {/* Sol Kolon */}
        <div className="col-span-12 xl:col-span-8 space-y-12">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <StatCard
              icon={CardWallet}
              label="Total balance"
              data={statsData?.totalBalance}
              isFeatured={true}
              isLoading={statsLoading}
            />
            <StatCard
              icon={CardWallet}
              label="Total spending"
              data={statsData?.totalExpense}
              isLoading={statsLoading}
            />
            <StatCard
              icon={TotalWallet}
              label="Total saved"
              data={statsData?.totalSavings}
              isLoading={statsLoading}
            />
          </div>

          {/* Working Capital Chart */}
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <WorkingCapitalChart
              data={workingCapitalData}
              isLoading={workingCapitalLoading}
            />
          </Suspense>

          {/* Recent Transactions */}
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
            <RecentTransaction
              transactions={transactionsData}
              isLoading={transactionsLoading}
            />
          </Suspense>
        </div>

        {/* Sağ Kolon */}
        <aside className="col-span-12 xl:col-span-4 space-y-12">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <WalletCard
              wallets={walletData}
              isLoading={walletLoading}
            />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
            <ScheduledTransfers
              scheduledTransfers={scheduledData}
              isLoading={scheduledLoading}
            />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}