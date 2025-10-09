import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Phone, Mail, Building, FileText, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MembershipForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    phoneNumber: '',
    gender: '',
    email: '',
    employmentType: '',
    companyName: '',
    monthlyIncome: '',
    employersPhone: '',
    nextOfKinFirstName: '',
    nextOfKinLastName: '',
    nextOfKinPhone: '',
    relationship: '',
    referredByFirstName: '',
    referredByLastName: '',
    referredByPhone: ''
  });

  const [files, setFiles] = useState({
    idPassport: null as File | null,
    kraPin: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const uploadFile = async (file: File, fileName: string) => {
    const { data, error } = await supabase.storage
      .from('membership-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('File upload error:', error);
      throw error;
    }

    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.idNumber || 
          !formData.phoneNumber || !formData.gender || !formData.employmentType ||
          !formData.monthlyIncome || !formData.nextOfKinFirstName || 
          !formData.nextOfKinLastName || !formData.nextOfKinPhone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields marked with *",
          variant: "destructive",
        });
        return;
      }

      if (!files.idPassport) {
        toast({
          title: "Missing Document",
          description: "Please upload your ID/Passport document",
          variant: "destructive",
        });
        return;
      }

      // Upload files
      let idPassportUrl = '';
      let kraPinUrl = '';

      if (files.idPassport) {
        const idFileName = `${formData.idNumber}_id_passport_${Date.now()}`;
        idPassportUrl = await uploadFile(files.idPassport, idFileName);
      }

      if (files.kraPin) {
        const kraFileName = `${formData.idNumber}_kra_pin_${Date.now()}`;
        kraPinUrl = await uploadFile(files.kraPin, kraFileName);
      }

      // Submit application
      const { error } = await supabase
        .from('membership_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          id_number: formData.idNumber,
          phone_number: formData.phoneNumber,
          gender: formData.gender,
          email: formData.email || null,
          employment_type: formData.employmentType,
          company_name: formData.companyName || null,
          monthly_income: parseFloat(formData.monthlyIncome),
          employers_phone: formData.employersPhone || null,
          next_of_kin_first_name: formData.nextOfKinFirstName,
          next_of_kin_last_name: formData.nextOfKinLastName,
          next_of_kin_phone: formData.nextOfKinPhone,
          relationship: formData.relationship || null,
          referred_by_first_name: formData.referredByFirstName || null,
          referred_by_last_name: formData.referredByLastName || null,
          referred_by_phone: formData.referredByPhone || null,
          id_passport_url: idPassportUrl,
          kra_pin_url: kraPinUrl
        });

      if (error) {
        console.error('Submission error:', error);
        
        if (error.code === '23505') {
          toast({
            title: "Application Already Exists",
            description: "An application with this ID number already exists.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Submission Failed",
            description: "There was an error submitting your application. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "Your membership application has been submitted for review. You will be contacted once it's processed.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        idNumber: '',
        phoneNumber: '',
        gender: '',
        email: '',
        employmentType: '',
        companyName: '',
        monthlyIncome: '',
        employersPhone: '',
        nextOfKinFirstName: '',
        nextOfKinLastName: '',
        nextOfKinPhone: '',
        relationship: '',
        referredByFirstName: '',
        referredByLastName: '',
        referredByPhone: ''
      });
      setFiles({ idPassport: null, kraPin: null });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Membership Application</CardTitle>
          <p className="text-muted-foreground text-center">Join Billways Sacco and start your financial journey with us</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    required
                    placeholder="Enter ID number"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex flex-row space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="others" id="others" />
                    <Label htmlFor="others">Others</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Employment Information</h3>
              </div>

              <div>
                <Label>Employment Type *</Label>
                <RadioGroup
                  value={formData.employmentType}
                  onValueChange={(value) => handleInputChange('employmentType', value)}
                  className="flex flex-row space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self-employed" id="self-employed" />
                    <Label htmlFor="self-employed">Self Employed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employed" id="employed" />
                    <Label htmlFor="employed">Employed</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    required
                    placeholder="Enter monthly income"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="employersPhone">Employer's Phone Number</Label>
                <Input
                  id="employersPhone"
                  value={formData.employersPhone}
                  onChange={(e) => handleInputChange('employersPhone', e.target.value)}
                  placeholder="Enter employer's phone number"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Document Uploads</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idPassport">Upload ID/Passport *</Label>
                  <div className="mt-1">
                    <input
                      type="file"
                      id="idPassport"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('idPassport', e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                    <div
                      onClick={() => document.getElementById('idPassport')?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {files.idPassport ? files.idPassport.name : 'Click to upload ID/Passport'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="kraPin">Upload KRA PIN</Label>
                  <div className="mt-1">
                    <input
                      type="file"
                      id="kraPin"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('kraPin', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <div
                      onClick={() => document.getElementById('kraPin')?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {files.kraPin ? files.kraPin.name : 'Click to upload KRA PIN'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next of Kin */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Next of Kin</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nextOfKinFirstName">First Name *</Label>
                  <Input
                    id="nextOfKinFirstName"
                    value={formData.nextOfKinFirstName}
                    onChange={(e) => handleInputChange('nextOfKinFirstName', e.target.value)}
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="nextOfKinLastName">Last Name *</Label>
                  <Input
                    id="nextOfKinLastName"
                    value={formData.nextOfKinLastName}
                    onChange={(e) => handleInputChange('nextOfKinLastName', e.target.value)}
                    required
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nextOfKinPhone">Phone *</Label>
                  <Input
                    id="nextOfKinPhone"
                    value={formData.nextOfKinPhone}
                    onChange={(e) => handleInputChange('nextOfKinPhone', e.target.value)}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select onValueChange={(value) => handleInputChange('relationship', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="relative">Other Relative</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Referred By */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Referred By</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="referredByFirstName">First Name</Label>
                  <Input
                    id="referredByFirstName"
                    value={formData.referredByFirstName}
                    onChange={(e) => handleInputChange('referredByFirstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="referredByLastName">Last Name</Label>
                  <Input
                    id="referredByLastName"
                    value={formData.referredByLastName}
                    onChange={(e) => handleInputChange('referredByLastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <Label htmlFor="referredByPhone">Phone</Label>
                  <Input
                    id="referredByPhone"
                    value={formData.referredByPhone}
                    onChange={(e) => handleInputChange('referredByPhone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Membership Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipForm;