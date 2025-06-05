
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Phone, Mail, Building, FileText, Users } from "lucide-react";

const MembershipForm = () => {
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
    idPassport: null,
    kraPin: null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Files:', files);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Membership Application</CardTitle>
          <p className="text-gray-600 text-center">Join Billways Sacco and start your financial journey with us</p>
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
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
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
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                Submit Membership Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipForm;
