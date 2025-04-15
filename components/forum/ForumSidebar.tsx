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

export default function ForumSidebar({
  onPostSelect,
  selectedPostId,
}: ForumSidebarProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, author, content, created_at") // Fetch necessary fields
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      console.log(data);
      // Format the timestamp into a readable format
      const formattedPosts = data.map(
        (post: {
          id: string;
          title: string;
          author: string;
          content: string;
          created_at: string;
        }) => ({
          id: post.id,
          title: post.title,
          author: post.author, // Assuming this is a username, otherwise fetch user separately
          content: post.content,
          created_at: new Date(post.created_at).toLocaleString(),
        }),
      );
      console.log("Formatted posts:", formattedPosts);

      setPosts(formattedPosts);
    }
  };

  const addPost = async (newPost: Post) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: newPost.title,
          content: newPost.content,
          author: "4ff3c884-6fd9-4c81-87ba-4b73e57f0264",
        },
      ])
      .select("*");

    if (error) {
      console.error("Error adding post:", error);
    } else if (data) {
      setPosts([data[0], ...posts]);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <CreatePostDialog addPost={addPost} />

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" placeholder="Search discussions..." />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {posts.map((post) => (
            <PostListItem
              key={post.id}
              {...post}
              isActive={post.id === selectedPostId}
              onClick={() => {
                onPostSelect(post);
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function PostListItem({
  title,
  author,
  created_at,
  isActive,
  onClick,
}: {
  title: string;
  author: string;
  created_at: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer p-3 transition-colors hover:bg-accent ${
        isActive ? "bg-blue-100" : "hover:bg-gray-100"
      }}`}
      onClick={onClick}
    >
      <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{author}</p>

      <p className="mt-1 text-xs text-muted-foreground">{created_at}</p>
    </Card>
  );
}
