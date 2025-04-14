
import { ArrowRight, Users, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container py-24 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your <span className="gradient-text">Decentralized</span> Social Experience
          </h1>
          
          <p className="text-xl text-foreground/80 leading-relaxed">
            Take control of your social media experience with SocialWeave - the P2P platform built for privacy, freedom, and true connection.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button size="lg" asChild className="group">
              <Link to="/feed">
                Explore Feed
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link to="/profile">
                View Profile
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-secondary via-secondary/80 to-secondary/50 p-8 rounded-2xl shadow-lg relative network-grid">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shine-effect"></div>
          
          <div className="relative space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm animate-float">
              <Users className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Peer-to-Peer Network</h3>
                <p className="text-sm text-foreground/70">Connect directly with others without centralized servers</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm animate-float" style={{ animationDelay: "1s" }}>
              <Lock className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Your Data, Your Control</h3>
                <p className="text-sm text-foreground/70">Own your content and decide what to share</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm animate-float" style={{ animationDelay: "2s" }}>
              <Globe className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Censorship Resistant</h3>
                <p className="text-sm text-foreground/70">Distributed network ensuring freedom of expression</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
