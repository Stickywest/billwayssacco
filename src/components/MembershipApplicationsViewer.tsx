import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Phone, Mail, Building, FileText, Users, Search, Filter, Eye, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MembershipApplication {
  id: string;
  first_name: string;
  last_name: string;
  id_number: string;
  phone_number: string;
  gender: string;
  email?: string;
  employment_type: string;
  company_name?: string;
  monthly_income: number;
  employers_phone?: string;
  next_of_kin_first_name: string;
  next_of_kin_last_name: string;
  next_of_kin_phone: string;
  relationship?: string;
  referred_by_first_name?: string;
  referred_by_last_name?: string;
  referred_by_phone?: string;
  id_passport_url?: string;
  kra_pin_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

const MembershipApplicationsViewer = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<MembershipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<MembershipApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error",
          description: "Failed to fetch applications",
          variant: "destructive",
        });
        return;
      }

      setApplications(data as MembershipApplication[] || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone_number.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('membership_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update application status",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

      toast({
        title: "Success",
        description: `Application status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const downloadDocument = async (url: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('membership-documents')
        .download(url);

      if (error) {
        console.error('Error downloading file:', error);
        toast({
          title: "Error",
          description: "Failed to download document",
          variant: "destructive",
        });
        return;
      }

      // Create download link
      const fileUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Membership Applications</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No applications found matching your criteria.
              </div>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold">
                            {application.first_name} {application.last_name}
                          </h3>
                          <Badge variant={getStatusBadgeVariant(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            ID: {application.id_number}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {application.phone_number}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {application.employment_type}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Applied: {new Date(application.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <User className="h-5 w-5 text-primary" />
                                    <h4 className="font-semibold">Personal Information</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Name:</strong> {selectedApplication.first_name} {selectedApplication.last_name}</div>
                                    <div><strong>ID Number:</strong> {selectedApplication.id_number}</div>
                                    <div><strong>Phone:</strong> {selectedApplication.phone_number}</div>
                                    <div><strong>Gender:</strong> {selectedApplication.gender}</div>
                                    <div><strong>Email:</strong> {selectedApplication.email || 'Not provided'}</div>
                                  </div>
                                </div>

                                {/* Employment Information */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Building className="h-5 w-5 text-primary" />
                                    <h4 className="font-semibold">Employment Information</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Employment Type:</strong> {selectedApplication.employment_type}</div>
                                    <div><strong>Company:</strong> {selectedApplication.company_name || 'Not provided'}</div>
                                    <div><strong>Monthly Income:</strong> KES {selectedApplication.monthly_income.toLocaleString()}</div>
                                    <div><strong>Employer Phone:</strong> {selectedApplication.employers_phone || 'Not provided'}</div>
                                  </div>
                                </div>

                                {/* Next of Kin */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Users className="h-5 w-5 text-primary" />
                                    <h4 className="font-semibold">Next of Kin</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Name:</strong> {selectedApplication.next_of_kin_first_name} {selectedApplication.next_of_kin_last_name}</div>
                                    <div><strong>Phone:</strong> {selectedApplication.next_of_kin_phone}</div>
                                    <div><strong>Relationship:</strong> {selectedApplication.relationship || 'Not provided'}</div>
                                  </div>
                                </div>

                                {/* Referred By */}
                                {(selectedApplication.referred_by_first_name || selectedApplication.referred_by_last_name) && (
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <Users className="h-5 w-5 text-primary" />
                                      <h4 className="font-semibold">Referred By</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div><strong>Name:</strong> {selectedApplication.referred_by_first_name} {selectedApplication.referred_by_last_name}</div>
                                      <div><strong>Phone:</strong> {selectedApplication.referred_by_phone || 'Not provided'}</div>
                                    </div>
                                  </div>
                                )}

                                {/* Documents */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <h4 className="font-semibold">Documents</h4>
                                  </div>
                                  <div className="space-y-2">
                                    {selectedApplication.id_passport_url && (
                                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                                        <span className="text-sm">ID/Passport Document</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => downloadDocument(selectedApplication.id_passport_url!, 'id_passport.pdf')}
                                        >
                                          <Download className="h-4 w-4 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    )}
                                    {selectedApplication.kra_pin_url && (
                                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                                        <span className="text-sm">KRA PIN Document</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => downloadDocument(selectedApplication.kra_pin_url!, 'kra_pin.pdf')}
                                        >
                                          <Download className="h-4 w-4 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Status Actions */}
                                <div>
                                  <h4 className="font-semibold mb-3">Update Status</h4>
                                  <div className="flex gap-2">
                                    <Button
                                      variant={selectedApplication.status === 'approved' ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant={selectedApplication.status === 'rejected' ? 'destructive' : 'outline'}
                                      size="sm"
                                      onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      variant={selectedApplication.status === 'pending' ? 'secondary' : 'outline'}
                                      size="sm"
                                      onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                                    >
                                      Set Pending
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipApplicationsViewer;