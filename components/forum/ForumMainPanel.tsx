import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { Post } from "@/types/forum";
import CommentButton from "@/components/forum/CommentComponents/CommentButton";
import CommentBox from "./CommentComponents/CommentBox";

interface ForumMainPanelProps {
  selectedPost: Post | null;
}

export default function ForumMainPanel({ selectedPost }: ForumMainPanelProps) {
  useEffect(() => {
    console.log("Updated selectedPost:", selectedPost);
  }, [selectedPost]);

  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSubmitComment = () => {
    setShowCommentBox(false);
  };


  if (!selectedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a post to view</p>
      </div>
    );
  }

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{selectedPost.title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{selectedPost.title}</h2>
          <p className="text-sm text-muted-foreground">Posted at {new Date(selectedPost.created_at).toLocaleString()}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{selectedPost.content}</p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            0 Likes
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            0 Comments
          </Button>
          
          <CommentButton onClick={handleCommentClick} />

        </div>

        
        {showCommentBox && (
          <CommentBox 
            onSubmitComment={handleSubmitComment} 
            onCancel={() => setShowCommentBox(false)} 
          />
        )}
      </CardContent>
    </Card>
  );
}
