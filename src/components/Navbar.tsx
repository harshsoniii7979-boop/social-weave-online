
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold gradient-text">SocialWeave</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/feed" className="text-foreground/80 hover:text-accent transition-colors">
              Feed
            </Link>
            <Link to="/profile" className="text-foreground/80 hover:text-accent transition-colors">
              Profile
            </Link>
          </div>
          <ConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/feed" 
              className="py-2 text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feed
            </Link>
            <Link 
              to="/profile" 
              className="py-2 text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
