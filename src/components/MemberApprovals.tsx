import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, XCircle, User, FileText, Download, Loader2 } from "lucide-react";

const MemberApprovals = () => {
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  const fetchPendingMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching members:', error);
    } else {
      setPendingMembers(data);
    }
    setLoading(false);
  };

  const approveMember = async (memberId: string) => {
    try {
      // Update member status
      const { error: updateError } = await supabase
        .from('members')
        .update({ status: 'approved' })
        .eq('id', memberId);

      if (updateError) throw updateError;

      // Activate auth user
      const { error: authError } = await supabase.auth.admin.updateUserById(memberId, {
        user_metadata: { status: 'active' }
      });

      if (authError) throw authError;

      // Send credentials (in a real app, use email service)
      const member = pendingMembers.find(m => m.id === memberId);
      const accountNumber = member.account_number;
      const tempPassword = Math.random().toString(36).slice(-8);

      // Reset password to new temp password
      const { error: passwordError } = await supabase.auth.admin.updateUserById(memberId, {
        password: tempPassword
      });

      if (passwordError) throw passwordError;

      // In a real app, send SMS/email with credentials
      console.log(`Send to ${member.phone}: Your account is ready! Account: ${accountNumber}, Temp Password: ${tempPassword}`);

      toast({
        title: 'Member Approved',
        description: `Account ${accountNumber} has been activated`,
      });

      fetchPendingMembers();

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to approve member',
        variant: 'destructive',
      });
    }
  };

  const rejectMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: 'rejected' })
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: 'Member Rejected',
        description: 'Application has been rejected',
      });

      fetchPendingMembers();

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reject member',
        variant: 'destructive',
      });
    }
  };

  const downloadDocument = async (path: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from('member-documents')
      .download(path);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to download document',
        variant: 'destructive',
      });
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Member Approvals</h2>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.first_name} {member.last_name}</TableCell>
                <TableCell>{member.account_number}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.id_number}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {member.id_passport_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadDocument(member.id_passport_url, `id-${member.id_number}.pdf`)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        ID
                      </Button>
                    )}
                    {member.kra_pin_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadDocument(member.kra_pin_url, `kra-${member.id_number}.pdf`)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        KRA
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => approveMember(member.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => rejectMember(member.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MemberApprovals;