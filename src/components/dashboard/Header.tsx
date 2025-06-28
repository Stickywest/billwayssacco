// components/Header.tsx
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">SACCO Admin Portal</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button onClick={logout} variant="ghost" className="text-red-600 hover:bg-red-50">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};