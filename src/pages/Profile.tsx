
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Users, Settings, Share2, UserPlus, Link2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    username: "your_username",
    bio: "This is your decentralized profile on SocialWeave. Edit it to tell others about yourself!",
    avatar: "",
  });
  
  const { toast } = useToast();
  
  const mockPosts = [
    {
      id: "1",
      username: profileData.username,
      userInitials: "YU",
      timeAgo: "3h ago",
      content: "Just joined SocialWeave! Excited to be part of this decentralized social network.",
      likesCount: 12,
      commentsCount: 3,
      sharesCount: 1,
    },
    {
      id: "2",
      username: profileData.username,
      userInitials: "YU",
      timeAgo: "1d ago",
      content: "Exploring the features of this P2P platform. The direct connections are amazing!",
      likesCount: 8,
      commentsCount: 2,
      sharesCount: 0,
    },
  ];

  const handleProfileUpdate = (updatedData) => {
    setProfileData({
      ...profileData,
      ...updatedData,
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated",
    });
    
    setEditMode(false);
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(`https://socialweave.net/profile/${profileData.username}`);
    
    toast({
      title: "Profile link copied",
      description: "Your profile link has been copied to clipboard",
    });
  };

  return (
    <>
      <Navbar />
      <main className="container py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-xl network-grid relative">
              <div className="absolute bottom-0 left-0 w-full p-4 flex justify-end">
                <Button variant="ghost" size="sm" className="bg-background/80 backdrop-blur-sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Cover
                </Button>
              </div>
            </div>
            
            <Card className="rounded-t-none border-t-0 relative mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                  <div className="relative -mt-16">
                    <Avatar className="w-24 h-24 border-4 border-background">
                      {profileData.avatar ? (
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      ) : (
                        <AvatarFallback className="text-3xl">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <h1 className="text-2xl font-bold">{profileData.name}</h1>
                      <span className="text-muted-foreground">@{profileData.username}</span>
                    </div>
                    <p className="text-foreground/80">{profileData.bio}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile information.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                              id="name" 
                              defaultValue={profileData.name}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              defaultValue={profileData.username}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea 
                              id="bio" 
                              defaultValue={profileData.bio}
                              className="min-h-24"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleProfileUpdate({
                            name: (document.getElementById('name') as HTMLInputElement)?.value,
                            username: (document.getElementById('username') as HTMLInputElement)?.value,
                            bio: (document.getElementById('bio') as HTMLTextAreaElement)?.value,
                          })}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" onClick={handleCopyProfileLink}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Share Profile
                    </Button>
                    
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between border-t mt-6 pt-4">
                  <div className="text-center px-4">
                    <div className="font-bold text-xl">42</div>
                    <div className="text-muted-foreground text-sm">Posts</div>
                  </div>
                  
                  <div className="text-center px-4">
                    <div className="font-bold text-xl">128</div>
                    <div className="text-muted-foreground text-sm">Following</div>
                  </div>
                  
                  <div className="text-center px-4">
                    <div className="font-bold text-xl">96</div>
                    <div className="text-muted-foreground text-sm">Followers</div>
                  </div>
                  
                  <div className="text-center px-4">
                    <div className="font-bold text-xl">3.2k</div>
                    <div className="text-muted-foreground text-sm">Reach</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-2">
            <Tabs defaultValue="posts">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4 mt-4">
                {mockPosts.length > 0 ? (
                  mockPosts.map((post) => <Post key={post.id} {...post} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4 mt-4">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No media posts yet</p>
                </div>
              </TabsContent>
              
              <TabsContent value="replies" className="space-y-4 mt-4">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No replies yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium flex items-center mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  Network Connections
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>CB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">crypto_bob</p>
                        <p className="text-xs text-muted-foreground">Connected 2d ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Disconnect</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">alice_network</p>
                        <p className="text-xs text-muted-foreground">Connected 5d ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Disconnect</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>DE</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">defi_enthusiast</p>
                        <p className="text-xs text-muted-foreground">Connected 1w ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Disconnect</Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Find More Connections
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Connection Stats</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Status</span>
                    <span className="text-green-500 font-medium">Online</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peers Connected</span>
                    <span>12</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Shared</span>
                    <span>128 MB</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span>7d 12h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
