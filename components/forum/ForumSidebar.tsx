import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";

interface Post {
  id: string;
  title: string;
  author: string;
  timestamp: string;
  content?: string;
  isActive?: boolean;
}

interface ForumSidebarProps {
  onPostSelect: (post: Post) => void;
  selectedPostId?: string;
}

export default function ForumSidebar({
  onPostSelect,
  selectedPostId,
}: ForumSidebarProps) {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Create Post Button */}
      <CreatePostDialog />

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" placeholder="Search discussions..." />
      </div>

      {/* Posts List */}
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {SAMPLE_POSTS.map((post) => (
            <PostListItem
              key={post.id}
              {...post}
              isActive={post.id === selectedPostId}
              onClick={() => onPostSelect(post)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface PostListItemProps extends Post {
  onClick: () => void;
}

function PostListItem({
  title,
  author,
  timestamp,
  isActive,
  onClick,
}: PostListItemProps) {
  return (
    <Card
      className={`cursor-pointer p-3 transition-colors hover:bg-accent ${
        isActive ? "border-primary bg-accent" : ""
      }`}
      onClick={onClick}
    >
      <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {author} • {timestamp}
      </p>
    </Card>
  );
}

// Sample data
const SAMPLE_POSTS = [
  {
    id: "1",
    title: "Best practices for managing remote teams?",
    author: "Emily Best",
    timestamp: "2h ago",
    content: "I'm looking for advice on managing remote teams effectively...",
    isActive: true,
  },
  {
    id: "2",
    title: "New budget allocation process for FY2024-25",
    author: "Cruz Grimaldo",
    timestamp: "5h ago",
    content: "We're implementing new budget allocation procedures...",
  },
  // Add more sample posts...
];
