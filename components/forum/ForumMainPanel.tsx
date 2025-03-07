import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Post } from "@/types/forum";

interface ForumMainPanelProps {
  post: Post | null;
}

export default function ForumMainPanel({ post }: ForumMainPanelProps) {
  if (!post) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          Select a post to view its details
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Post Content */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <Avatar>
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
              Posted by {post.author} • {post.timestamp}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{post.content}</p>

          {/* Interaction Buttons */}
          <div className="mt-6 flex gap-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              42 Likes
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              15 Comments
            </Button>
          </div>

          {/* Comments Section */}
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Comments</h3>

            {/* Comment Input */}
            <div className="space-y-2">
              <Textarea placeholder="Add a comment..." />
              <div className="flex justify-end">
                <Button size="sm">Comment</Button>
              </div>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4">
              {SAMPLE_COMMENTS.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface CommentItemProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

function CommentItem({ author, content, timestamp }: CommentItemProps) {
  return (
    <div className="flex gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{author}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="mt-1 text-sm">{content}</p>
      </div>
    </div>
  );
}

// Sample comments data
const SAMPLE_COMMENTS = [
  {
    id: "1",
    author: "Joanne Straley",
    content:
      "We've had great success using Slack for quick communications and Zoom for weekly team meetings. The key is establishing clear communication protocols.",
    timestamp: "1h ago",
  },
  {
    id: "2",
    author: "Barbara Montano",
    content:
      "Virtual coffee breaks have worked well for our team. It helps maintain the social aspect of work while being remote.",
    timestamp: "30m ago",
  },
  // Add more sample comments...
];
