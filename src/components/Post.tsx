
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, MoreHorizontal, Check } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostProps {
  id: string;
  username: string;
  userAvatar?: string;
  userInitials: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const Post = ({
  id,
  username,
  userAvatar,
  userInitials,
  timeAgo,
  content,
  imageUrl,
  likesCount,
  commentsCount,
  sharesCount,
}: PostProps) => {
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="p-4 space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              {userAvatar && <AvatarImage src={userAvatar} alt={username} />}
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <Link 
                to={`/profile/${username}`} 
                className="font-medium hover:underline"
              >
                {username}
              </Link>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>Follow</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Mute</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="whitespace-pre-line">{content}</p>
        
        {imageUrl && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{commentsCount}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>{sharesCount}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
