"use client";

import { useMemo } from "react";
import RecentTransaction from "@/components/dashboard/RecentTransaction";
import ScheduledTransfers from "@/components/dashboard/ScheduledTransfers";
import StatCard from "@/components/dashboard/StatCard";
import WalletCard from "@/components/dashboard/WalletCard";
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
import WorkingCapitalChart from "@/components/dashboard/WorkingCapitalChart";
import ErrorBoundary from "@/components/ErrorBoundary";

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

  const statsData = useMemo(() => stats?.data, [stats?.data]);
  const transactionsData = useMemo(() => transactions?.data.transactions || [], [transactions?.data]);
  const scheduledData = useMemo(() => scheduled?.data.transfers || [], [scheduled?.data]);
  const walletData = useMemo(() => wallet?.data.cards || [], [wallet?.data]);
  const workingCapitalData = useMemo(() => workingCapital?.data.data || [], [workingCapital?.data]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12  gap-6 xl:gap-12">
        <div className="col-span-12 xl:col-span-8 space-y-12">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <ErrorBoundary>
              <StatCard
                icon={CardWallet}
                label="Total balance"
                data={statsData?.totalBalance}
                isFeatured={true}
                isLoading={statsLoading}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <StatCard
                icon={CardWallet}
                label="Total spending"
                data={statsData?.totalExpense}
                isLoading={statsLoading}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <StatCard
                icon={TotalWallet}
                label="Total saved"
                data={statsData?.totalSavings}
                isLoading={statsLoading}
              />
            </ErrorBoundary>
          </div>

          {/* Working Capital Chart */}
          <ErrorBoundary>
            <WorkingCapitalChart
              data={workingCapitalData}
              isLoading={workingCapitalLoading}
            />
          </ErrorBoundary>

          {/* Recent Transactions */}
          <ErrorBoundary>
            <RecentTransaction
              transactions={transactionsData}
              isLoading={transactionsLoading}
            />
          </ErrorBoundary>
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-12">
          {/* Wallet Card */}
          <ErrorBoundary>
            <WalletCard
              wallets={walletData}
              isLoading={walletLoading}
            />
          </ErrorBoundary>

          {/* Scheduled Transfers */}
          <ErrorBoundary>
            <ScheduledTransfers
              scheduledTransfers={scheduledData}
              isLoading={scheduledLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}