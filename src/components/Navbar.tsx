
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 w-full border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold font-jakarta bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Billways Sacco
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</a>
          <a href="#about" className="text-gray-700 hover:text-primary font-medium transition-colors">About</a>
          <a href="#services" className="text-gray-700 hover:text-primary font-medium transition-colors">Services</a>
          <Link to="/membership" className="text-gray-700 hover:text-primary font-medium transition-colors">Join Us</Link>
          <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-primary hover:bg-primary/90">Member Login</Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full left-0 p-4 border-b border-gray-100 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-primary font-medium py-2 transition-colors" onClick={toggleMobileMenu}>Home</a>
            <a href="#about" className="text-gray-700 hover:text-primary font-medium py-2 transition-colors" onClick={toggleMobileMenu}>About</a>
            <a href="#services" className="text-gray-700 hover:text-primary font-medium py-2 transition-colors" onClick={toggleMobileMenu}>Services</a>
            <Link to="/membership" className="text-gray-700 hover:text-primary font-medium py-2 transition-colors" onClick={toggleMobileMenu}>Join Us</Link>
            <a href="#contact" className="text-gray-700 hover:text-primary font-medium py-2 transition-colors" onClick={toggleMobileMenu}>Contact</a>
            <Button className="bg-primary hover:bg-primary/90">Member Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
