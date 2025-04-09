
import { useState } from "react";
import { Comment, User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

interface CommentListProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
}

export function CommentList({ comments, currentUser, onAddComment }: CommentListProps) {
  const [newComment, setNewComment] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea 
            placeholder="Add a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </form>
      
      <div className="space-y-4 pt-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
