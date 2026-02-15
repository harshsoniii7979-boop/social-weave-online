
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Image, Send, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Feed = () => {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [posts, setPosts] = useState([
    {
      id: "1",
      username: "alice_network",
      userInitials: "AN",
      timeAgo: "2h ago",
      content: "Just set up my node on SocialWeave! Excited to be part of this decentralized network where I own my data and connections.",
      likesCount: 24,
      commentsCount: 5,
      sharesCount: 2,
    },
    {
      id: "2",
      username: "crypto_bob",
      userInitials: "CB",
      timeAgo: "5h ago",
      content: "Decentralization is the future of social media. No more arbitrary censorship or data mining!",
      imageUrl: "https://images.unsplash.com/photo-1639322537231-2f206e06af84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      likesCount: 42,
      commentsCount: 8,
      sharesCount: 7,
    },
    {
      id: "3",
      username: "defi_enthusiast",
      userInitials: "DE",
      timeAgo: "1d ago",
      content: "Web3 social networks are evolving fast! SocialWeave is becoming my favorite way to connect with the community while maintaining privacy.\n\nWho else is building on this platform?",
      likesCount: 18,
      commentsCount: 12,
      sharesCount: 3,
    },
    {
      id: "4",
      username: "node_runner",
      userInitials: "NR",
      timeAgo: "2d ago",
      content: "Tutorial: How to set up your own SocialWeave node in 5 minutes. Check out this guide I made!",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      likesCount: 56,
      commentsCount: 14,
      sharesCount: 23,
    },
  ]);

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        username: "you",
        userInitials: "YO",
        timeAgo: "Just now",
        content: postContent,
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
      setPostContent("");
      setIsLoading(false);
      toast({
        title: "Post shared",
        description: "Your post has been shared to the network",
      });
    }, 1500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Feed refreshed",
        description: "Your feed has been updated with the latest posts",
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="container py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Share something with the network</span>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-24 resize-none border-none focus-visible:ring-0 p-0"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  <span>Add Image</span>
                </Button>
                <Button 
                  onClick={handlePostSubmit} 
                  disabled={!postContent.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex justify-between items-center">
              <Tabs defaultValue="network" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="network">Network Feed</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                  <TabsTrigger value="local">Local Feed</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </div>
          
          <div className="lg:block">
            <div className="space-y-6 sticky top-24">
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Network Stats</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connected Peers</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Users</span>
                    <span className="font-medium">152</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posts Today</span>
                    <span className="font-medium">843</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Health</span>
                    <span className="text-green-500 font-medium">Good</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Suggested Connections</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["crypto_dave", "web3_enthusiast", "privacy_first"].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{user.split('_').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 10) + 1} mutual connections
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Feed;
