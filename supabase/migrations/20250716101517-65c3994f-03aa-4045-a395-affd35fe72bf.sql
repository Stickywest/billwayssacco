-- Create the membership applications table
CREATE TABLE public.membership_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  id_number TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'others')),
  email TEXT,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('self-employed', 'employed')),
  company_name TEXT,
  monthly_income DECIMAL NOT NULL,
  employers_phone TEXT,
  next_of_kin_first_name TEXT NOT NULL,
  next_of_kin_last_name TEXT NOT NULL,
  next_of_kin_phone TEXT NOT NULL,
  relationship TEXT,
  referred_by_first_name TEXT,
  referred_by_last_name TEXT,
  referred_by_phone TEXT,
  id_passport_url TEXT,
  kra_pin_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for membership documents
INSERT INTO storage.buckets (id, name, public) VALUES ('membership-documents', 'membership-documents', false);

-- Create storage policies for membership documents
CREATE POLICY "Allow public uploads to membership-documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'membership-documents');

CREATE POLICY "Allow public access to membership-documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'membership-documents');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_membership_applications_updated_at
BEFORE UPDATE ON public.membership_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();