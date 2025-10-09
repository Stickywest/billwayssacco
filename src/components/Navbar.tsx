import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '@/assets/logo.svg'; // Adjust this path to your actual logo

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
 
  ];

  return (
    <nav className={`bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'py-2 shadow-sm' : 'py-4'} border-b border-gray-100`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <img src={logo} alt="Billways Sacco" className="h-13 w-14" />
          
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.id}
              smooth 
              to={`#${link.id}`} 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link to="/membership" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Join Us
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary font-medium transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-700 hover:text-primary font-medium transition-colors">
            FAQs
          </Link>
        </div>

        {/* Login Button - Desktop */}
        <div className="hidden md:block">
          <Link to="/login">
            <Button className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
              Member Login
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white/95 backdrop-blur-lg fixed w-full left-0 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen py-4 shadow-xl' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.id}
              smooth 
              to={`#${link.id}`} 
              className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/membership" 
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={closeMobileMenu}
          >
            Join Us
          </Link>
          <Link 
            to="/blog" 
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={closeMobileMenu}
          >
            Blog
          </Link>
          <Link 
            to="/faq" 
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={closeMobileMenu}
          >
            FAQs
          </Link>
          <Link to="/login" className="mt-2" onClick={closeMobileMenu}>
            <Button className="bg-primary hover:bg-primary/90 w-full py-3 rounded-lg">
              Member Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;