import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";
import { useAuth } from "@/app/context/AuthContext";
import { usePosts } from "@/app/hooks/use-posts";
import { Post } from "@/types/forum";
import { PostService } from "@/app/services/post-service";

interface ForumSidebarProps {
  onPostSelect: (post: Post) => void;
  selectedPostId?: string;
}

export default function ForumSidebar({
  onPostSelect,
  selectedPostId,
}: ForumSidebarProps) {
  const { posts, loading, fetchPosts, addPost } = usePosts();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddPost = async (newPost: Post) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    await addPost({
      title: newPost.title,
      content: newPost.content || "",
      author: user.id,
    });
  };

  const handlePostSelect = async (post: Post) => {
    try {
      // Fetch the latest post data to ensure we have the most up-to-date upvotes
      const updatedPost = await PostService.getPostById(post.id);
      if (updatedPost) {
        onPostSelect(updatedPost);
      } else {
        // If we can't get the updated post, use the one we have
        onPostSelect(post);
      }
    } catch (error) {
      console.error("Error fetching updated post:", error);
      // Fallback to using the existing post data
      onPostSelect(post);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <CreatePostDialog addPost={handleAddPost} />

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading posts...</p>
        ) : (
          <div className="space-y-2">
            {filteredPosts.map((post) => (
              <PostListItem
                key={post.id}
                {...post}
                isActive={post.id === selectedPostId}
                onClick={() => {
                  handlePostSelect(post);
                }}
              />
            ))}
          </div>
        )}
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
