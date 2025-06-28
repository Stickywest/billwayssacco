import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Eye, EyeOff, Loader2, User, PiggyBank, HandCoins, Settings, Bell } from 'lucide-react';

type Member = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  account_number: string;
  credit_score: number;
  loan_eligibility: boolean;
  total_savings: number;
  loan_limit: number;
  current_loans: number;
  avatar_url?: string;
};

type SavingsRecord = {
  month: string;
  amount: number;
};

type LoanRequest = {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  purpose: string;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [savingsData, setSavingsData] = useState<SavingsRecord[]>([]);
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loanRequestForm, setLoanRequestForm] = useState({
    amount: '',
    purpose: '',
  });

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        
        // Fetch member profile
        const { data: memberData } = await supabase
          .from('members')
          .select('*')
          .eq('id', user?.id)
          .single();
        
        setMember(memberData);
        setProfileForm({
          full_name: memberData?.full_name || '',
          phone: memberData?.phone || '',
        });

        // Fetch savings history (mock data - replace with actual query)
        const savingsHistory = [
          { month: 'Jan', amount: 5000 },
          { month: 'Feb', amount: 7500 },
          { month: 'Mar', amount: 9000 },
          { month: 'Apr', amount: 12000 },
          { month: 'May', amount: 15000 },
          { month: 'Jun', amount: 18000 },
        ];
        setSavingsData(savingsHistory);

        // Fetch loan requests
        const { data: loanData } = await supabase
          .from('loan_requests')
          .select('*')
          .eq('member_id', user?.id)
          .order('date', { ascending: false });
        
        setLoanRequests(loanData || []);

      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load member data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMemberData();
  }, [user, toast]);

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('members')
        .update(profileForm)
        .eq('id', user?.id);
      
      if (error) throw error;

      setMember(prev => prev ? { ...prev, ...profileForm } : null);
      setEditingProfile(false);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast({
        title: 'Success',
        description: 'Password changed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change password',
        variant: 'destructive',
      });
    }
  };

  const handleLoanRequest = async () => {
    try {
      const amount = parseFloat(loanRequestForm.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid loan amount');
      }

      if (amount > (member?.loan_limit || 0)) {
        throw new Error('Requested amount exceeds your loan limit');
      }

      const { data, error } = await supabase
        .from('loan_requests')
        .insert([{
          member_id: user?.id,
          amount: amount,
          purpose: loanRequestForm.purpose,
          status: 'pending',
          date: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;

      setLoanRequests(prev => [data[0], ...prev]);
      setLoanRequestForm({ amount: '', purpose: '' });
      
      toast({
        title: 'Success',
        description: 'Loan request submitted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit loan request',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!member) {
    return <div className="p-4">Member data not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-600">SACCO Member Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.avatar_url} />
            <AvatarFallback>
              {member.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{member.full_name}</h2>
            <p className="text-gray-600">Account: {member.account_number}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={member.loan_eligibility ? 'default' : 'secondary'}>
                {member.loan_eligibility ? 'Loan Eligible' : 'Not Eligible'}
              </Badge>
              <Badge variant="outline">
                Credit Score: {member.credit_score}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="savings">
              <PiggyBank className="h-4 w-4 mr-2" />
              Savings
            </TabsTrigger>
            <TabsTrigger value="loans">
              <HandCoins className="h-4 w-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Savings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Savings</p>
                      <p className="text-2xl font-bold">
                        KES {member.total_savings.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Contribution</p>
                      <p className="text-lg">KES 5,000 (Jun 2023)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Loan Limit</p>
                      <p className="text-2xl font-bold">
                        KES {member.loan_limit.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Credit</p>
                      <p className="text-lg">
                        KES {(member.loan_limit - member.current_loans).toLocaleString()}
                      </p>
                      <Progress 
                        value={(member.current_loans / member.loan_limit) * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Savings Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={savingsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" name="Savings (KES)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Savings Tab */}
          <TabsContent value="savings" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Savings History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Monthly Contributions</p>
                          <p className="text-sm text-gray-500">Regular savings</p>
                        </div>
                        <p className="text-lg font-bold">KES 5,000</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Dividends</p>
                          <p className="text-sm text-gray-500">Annual payout</p>
                        </div>
                        <p className="text-lg font-bold">KES 12,340</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Special Deposits</p>
                          <p className="text-sm text-gray-500">Additional savings</p>
                        </div>
                        <p className="text-lg font-bold">KES 3,000</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request New Loan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Amount (KES)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={loanRequestForm.amount}
                        onChange={(e) => setLoanRequestForm({ ...loanRequestForm, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanPurpose">Purpose</Label>
                      <Input
                        id="loanPurpose"
                        type="text"
                        placeholder="Loan purpose"
                        value={loanRequestForm.purpose}
                        onChange={(e) => setLoanRequestForm({ ...loanRequestForm, purpose: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleLoanRequest} disabled={!member.loan_eligibility}>
                      Submit Loan Request
                    </Button>
                    {!member.loan_eligibility && (
                      <p className="text-sm text-red-500">
                        You are not currently eligible for loans. Please contact support.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan History</CardTitle>
                </CardHeader>
                <CardContent>
                  {loanRequests.length === 0 ? (
                    <p>No loan requests found</p>
                  ) : (
                    <div className="space-y-4">
                      {loanRequests.map((loan) => (
                        <div key={loan.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">KES {loan.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">{loan.purpose}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(loan.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                loan.status === 'approved'
                                  ? 'default'
                                  : loan.status === 'rejected'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {loan.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileForm.full_name}
                          onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleProfileUpdate}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingProfile(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span> {member.full_name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {member.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {member.phone || 'Not provided'}
                      </p>
                      <Button onClick={() => setEditingProfile(true)} className="mt-4">
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      />
                    </div>
                    <Button onClick={handlePasswordChange}>Change Password</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard; 