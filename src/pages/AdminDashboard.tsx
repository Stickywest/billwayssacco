// AdminDashboard.tsx
import { useEffect, useState } from 'react';

import { Header } from '../components/dashboard/Header';

import { StatsCards } from '../components/dashboard/StatsCards';
import { ChartsSection } from '../components/dashboard/ChartsSection';
import { MemberManagement } from '../components/dashboard/MemberManagement';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../lib/supabaseClient';

type SaccoStats = {
  totalMembers: number;
  activeLoans: number;
  totalSavings: number;
  pendingApprovals: number;
};

type User = {
  id: string;
  email: string;
  created_at: string;
  user_metadata?: {
    role?: string;
    full_name?: string;
    phone?: string;
    sacco_id?: string;
  };
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SaccoStats>({
    totalMembers: 0,
    activeLoans: 0,
    totalSavings: 0,
    pendingApprovals: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive'
      });
    } else {
      setUsers(
        data.users.map((u: any) => ({
          id: u.id,
          email: u.email ?? '',
          created_at: u.created_at,
          user_metadata: {
            role: u.user_metadata?.role,
            full_name: u.user_metadata?.full_name,
            phone: u.user_metadata?.phone,
            sacco_id: u.user_metadata?.sacco_id,
          },
        }))
      );
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    // In a real app, you would fetch these from your database
    setStats({
      totalMembers: 1245,
      activeLoans: 342,
      totalSavings: 12500000,
      pendingApprovals: 23
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <StatsCards stats={stats} />
        <ChartsSection />
        <MemberManagement 
          users={users} 
          loading={loading} 
          refetchUsers={fetchUsers} 
        />
      </main>
    </div>
  );
}