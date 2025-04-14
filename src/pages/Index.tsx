
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Lock, Globe, Zap, Server, Network } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        <section className="container py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              SocialWeave connects users directly through peer-to-peer technology, eliminating the need for centralized control.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <p className="text-foreground/70">
                  Join the network and connect directly with other users without intermediaries.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Network className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Share</h3>
                <p className="text-foreground/70">
                  Create and share content directly to the network. Your data remains yours.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Control</h3>
                <p className="text-foreground/70">
                  Maintain ownership of your data and choose what to share and with whom.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Decentralized Social Media?</h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Traditional platforms control your data and decide what you see. SocialWeave puts you back in control.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">No Censorship</h3>
                <p className="text-foreground/70">
                  Express yourself freely without fear of arbitrary censorship from central authorities.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Lock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Enhanced Privacy</h3>
                <p className="text-foreground/70">
                  Own your personal data and decide exactly what information you share.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Server className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">No Single Point of Failure</h3>
                <p className="text-foreground/70">
                  Distributed networks ensure the platform remains resilient and available.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Globally Accessible</h3>
                <p className="text-foreground/70">
                  Available to anyone with an internet connection, regardless of location.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Governed</h3>
                <p className="text-foreground/70">
                  Platform decisions are made collectively by the community, not corporate interests.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <Network className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Interoperable</h3>
                <p className="text-foreground/70">
                  Connect with other platforms and services through open protocols and standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
