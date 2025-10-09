// AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { StatsCards } from '../components/dashboard/StatsCards';
import { ChartsSection } from '../components/dashboard/ChartsSection';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";
import MembershipForm from '@/components/MembershipForm';
import MembershipApplicationsViewer from '@/components/MembershipApplicationsViewer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SaccoStats = {
  totalMembers: number;
  activeLoans: number;
  totalSavings: number;
  pendingApprovals: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SaccoStats>({
    totalMembers: 0,
    activeLoans: 0,
    totalSavings: 0,
    pendingApprovals: 0
  });
  const [activeView, setActiveView] = useState<'form' | 'applications'>('applications');
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

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
        
        <div className="mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Membership Management
              </CardTitle>
              <Button 
                variant="outline"
                onClick={() => setActiveView(activeView === 'form' ? 'applications' : 'form')}
              >
                {activeView === 'form' ? (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    View Applications
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    New Application
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              {activeView === 'form' ? (
                <MembershipForm />
              ) : (
                <MembershipApplicationsViewer />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}