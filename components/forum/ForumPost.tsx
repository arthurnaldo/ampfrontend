import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon } from "lucide-react";
import VoteButtons from "./VoteButtons";
import { usePosts } from "@/app/hooks/use-posts";

interface ForumPostProps {
  id: string;
  title: string;
  author: string;
  created_at: string;
  content: string;
  upvotes: number;
  comments: number;
}

export default function ForumPost({
  id,
  title,
  author,
  created_at,
  content,
  upvotes,
  comments,
}: ForumPostProps) {
  const { votePost } = usePosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <VoteButtons
          postId={id}
          initialUpvotes={upvotes || 0}
          onVote={votePost}
        />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Posted by {author} • {created_at}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">
          <MessageSquareIcon className="mr-2 h-4 w-4" />
          {comments} Comments
        </Button>
      </CardFooter>
    </Card>
  );
}
