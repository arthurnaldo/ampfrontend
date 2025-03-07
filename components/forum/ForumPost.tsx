import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, MessageSquareIcon } from "lucide-react";

interface ForumPostProps {
  title: string;
  author: string;
  timestamp: string;
  content: string;
  upvotes: number;
  comments: number;
}

export default function ForumPost({
  title,
  author,
  timestamp,
  content,
  upvotes,
  comments,
}: ForumPostProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex flex-col items-center">
          <Button variant="ghost" size="sm">
            <ArrowUpIcon className="h-5 w-5" />
          </Button>
          <span className="text-sm font-bold">{upvotes}</span>
          <Button variant="ghost" size="sm">
            <ArrowDownIcon className="h-5 w-5" />
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Posted by {author} • {timestamp}
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
