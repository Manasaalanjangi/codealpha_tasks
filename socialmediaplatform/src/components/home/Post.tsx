
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, BookmarkIcon, MoreHorizontal, Share } from "lucide-react";
import { Link } from "react-router-dom";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
}

export interface PostProps {
  id: string;
  user: UserProfile;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares?: number;
  hasLiked?: boolean;
  hasBookmarked?: boolean;
}

export function Post({
  id,
  user,
  content,
  image,
  createdAt,
  likes,
  comments,
  shares = 0,
  hasLiked = false,
  hasBookmarked = false,
}: PostProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start gap-4">
        <div className="flex gap-3">
          <Link to={`/profile/${user.username}`}>
            <Avatar>
              <AvatarImage src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <div className="flex items-center gap-1">
              <Link to={`/profile/${user.username}`} className="font-semibold hover:underline">
                {user.name}
              </Link>
              {user.verified && (
                <Badge variant="outline" className="h-5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-50">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex gap-1 text-sm text-muted-foreground">
              <span>@{user.username}</span>
              <span>·</span>
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <p className="whitespace-pre-line">{content}</p>
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Post attachment"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t flex justify-between text-muted-foreground">
        <Button variant="ghost" size="sm" className={`gap-1 ${hasLiked ? 'text-red-500' : ''}`}>
          <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Repeat2 className="h-4 w-4" />
          <span>{shares}</span>
        </Button>
        <Button variant="ghost" size="sm" className={`gap-1 ${hasBookmarked ? 'text-blue-500' : ''}`}>
          <BookmarkIcon className={`h-4 w-4 ${hasBookmarked ? 'fill-current' : ''}`} />
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
