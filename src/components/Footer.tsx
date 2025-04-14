
import { Activity, Twitter, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold gradient-text">SocialWeave</span>
            </div>
            <p className="text-foreground/70 mb-4">
              The decentralized social platform that puts you in control of your online experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-foreground/70 hover:text-accent transition-colors">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-foreground/70 hover:text-accent transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors flex items-center">
                  Documentation
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors flex items-center">
                  Protocol
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors flex items-center">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} SocialWeave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
