// components/MemberManagement.tsx
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserTable } from './UserTable';
import { AddMemberModal } from './AddMemberModal';
import  MemberApprovals  from './../MemberApprovals';
import { Card } from "@/components/ui/card";

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

type MemberManagementProps = {
  users: User[];
  loading: boolean;
  refetchUsers: () => void;
};

export const MemberManagement = ({ users, loading, refetchUsers }: MemberManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.user_metadata?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.user_metadata?.phone?.includes(searchTerm));
    
    // Apply role filter
    const matchesRole = roleFilter === 'all' || user.user_metadata?.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="mb-8">
        <MemberApprovals />
      </div>

      <Card className="shadow-sm">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-xl font-semibold">Member Management</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowAddUserModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>
        <UserTable 
          users={filteredUsers} 
          loading={loading} 
          refetchUsers={refetchUsers} 
        />
      </Card>

      {showAddUserModal && (
        <AddMemberModal
          onClose={() => setShowAddUserModal(false)}
          refetchUsers={refetchUsers}
        />
      )}
    </>
  );
};