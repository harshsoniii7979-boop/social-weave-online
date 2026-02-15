
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Image, Send, RefreshCw, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PostRow {
  id: string;
  username: string;
  user_initials: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
}

const Feed = () => {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }
    setPosts((data as unknown as PostRow[]) || []);
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('posts-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePostSubmit = async () => {
    if (!postContent.trim()) return;
    setIsLoading(true);

    let imageUrl: string | undefined;

    if (selectedImage) {
      const fileName = `${Date.now()}-${selectedImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, selectedImage);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({ title: "Upload failed", description: "Could not upload image", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const insertData: any = {
      username: 'you',
      user_initials: 'YO',
      content: postContent,
    };
    if (imageUrl) insertData.image_url = imageUrl;

    const { error } = await supabase
      .from('posts' as any)
      .insert(insertData as any);

    if (error) {
      console.error('Error creating post:', error);
      toast({ title: "Error", description: "Failed to share your post", variant: "destructive" });
    } else {
      toast({ title: "Post shared", description: "Your post has been shared to the network" });
    }

    setPostContent("");
    clearImage();
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchPosts();
    setIsLoading(false);
    toast({ title: "Feed refreshed", description: "Your feed has been updated with the latest posts" });
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
                {imagePreview && (
                  <div className="relative mt-3 rounded-md overflow-hidden border border-border">
                    <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover" />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Image className="h-4 w-4 mr-2" />
                  <span>{selectedImage ? 'Change Image' : 'Add Image'}</span>
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
                <Post
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  userInitials={post.user_initials}
                  timeAgo={timeAgo(post.created_at)}
                  content={post.content}
                  imageUrl={post.image_url ?? undefined}
                  likesCount={post.likes_count}
                  commentsCount={post.comments_count}
                  sharesCount={post.shares_count}
                />
              ))}
              {posts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No posts yet. Be the first to share!</p>
              )}
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
                    <span className="font-medium">{posts.length}</span>
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
