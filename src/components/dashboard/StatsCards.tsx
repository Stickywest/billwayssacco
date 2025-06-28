// components/StatsCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowUpDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
};

const StatCard = ({ title, value, icon, borderColor, iconBgColor, iconColor }: StatCardProps) => (
  <Card className={`shadow-sm border-l-4 ${borderColor}`}>
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

type StatsCardsProps = {
  stats: {
    totalMembers: number;
    activeLoans: number;
    totalSavings: number;
    pendingApprovals: number;
  };
};

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Members"
        value={stats.totalMembers}
        icon={<User className="w-6 h-6 text-indigo-600" />}
        borderColor="border-indigo-500"
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
      <StatCard
        title="Active Loans"
        value={stats.activeLoans}
        icon={<ArrowUpDown className="w-6 h-6 text-blue-600" />}
        borderColor="border-blue-500"
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Total Savings"
        value={formatCurrency(stats.totalSavings)}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        borderColor="border-green-500"
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatCard
        title="Pending Approvals"
        value={stats.pendingApprovals}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        borderColor="border-yellow-500"
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
};