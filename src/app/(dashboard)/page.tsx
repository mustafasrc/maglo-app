import RecentTransaction from "../components/dashboard/RecentTransaction";
import ScheduledTransfers from "../components/dashboard/ScheduledTransfers";
import StatCard from "../components/dashboard/StatCard";
import WalletCard from "../components/dashboard/WalletCard";
import { TotalWallet, CardWallet } from "../components/icons";
export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 xl:col-span-8 space-y-12">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <StatCard icon={CardWallet} label="Total balance" value={1555} isFeatured={true} />
            <StatCard icon={CardWallet} label="Total spending" value={1555} />
            <StatCard icon={TotalWallet} label="Total saved" value={1555} />
          </div>
          <div>
            {/* Additional dashboard content can go here */}
          </div>

          <div>
            <RecentTransaction />
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4 space-y-12">
          <WalletCard />
          <ScheduledTransfers />
        </div>
      </div>
    </div>
  );
}
