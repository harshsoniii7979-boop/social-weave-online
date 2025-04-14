
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ConnectButton = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (connected) {
      // Disconnect logic would go here
      setConnected(false);
      toast({
        title: "Disconnected from network",
        description: "You've been disconnected from the P2P network",
      });
      return;
    }

    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      toast({
        title: "Connected to network",
        description: "You're now connected to the P2P network",
      });
    }, 1500);
  };

  return (
    <Button 
      onClick={handleConnect}
      className={`relative overflow-hidden transition-all ${connected ? 'bg-green-600 hover:bg-green-700' : ''}`}
      disabled={connecting}
    >
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : connected ? (
        'Connected'
      ) : (
        'Connect'
      )}
      {connected && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-300 animate-pulse-subtle"></span>}
    </Button>
  );
};

export default ConnectButton;
