import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";

interface Post {
  id: string;
  title: string;
  author: string;
  created_at: string;
  content?: string;
  isActive?: boolean;
}

interface ForumSidebarProps {
  onPostSelect: (post: Post) => void;
  selectedPostId?: string;
}

export default function ForumSidebar({ onPostSelect, selectedPostId}: ForumSidebarProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, author, created_at") // Fetch necessary fields
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      // Format the timestamp into a readable format
      const formattedPosts = data.map((post) => ({
        id: post.id,
        title: post.title,
        author: '4ff3c884-6fd9-4c81-87ba-4b73e57f0264', // Assuming this is a username, otherwise fetch user separately
        created_at: new Date(post.created_at).toLocaleString(),
      }));

      setPosts(formattedPosts);
    }
  };

  const addPost = async (newPost: Post) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title: newPost.title, content: newPost.content, author: "4ff3c884-6fd9-4c81-87ba-4b73e57f0264" }])
      .select("*");

    if (error) {
      console.error("Error adding post:", error);
    } else if (data) {
      setPosts([data[0], ...posts]); // Update UI with new post
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Create Post Button */}
      <CreatePostDialog addPost={addPost}/>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" placeholder="Search discussions..." />
      </div>

      {/* Posts List */}
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {posts.map((post) => (
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
  created_at,
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
        {author} • {created_at}
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
