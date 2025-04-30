import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUsers } from "@/app/hooks/use-users";

interface CommentItem {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  rating: number;
}

//This is what we will get from ForumMainPanel
interface CommentListProps {
  postId: string;
  refresh: number;
}

export default function CommentList({ postId, refresh }: CommentListProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { users, getUsers } = useUsers();

  // Regular async function instead of useCallback
  async function fetchComments() {
    if (!postId || isLoading) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setComments(data || []);

      // Extract unique user IDs from comments
      const userIds = [
        ...new Set(data?.map((comment) => comment.user_id) || []),
      ];

      // Fetch user data for all comment authors
      if (userIds.length > 0) {
        await getUsers(userIds);
      }
    } catch (error) {
      console.error("Error fetching comments: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Combined effect for both initial load and refresh
  useEffect(() => {
    fetchComments();

    return () => {
      setComments([]);
    };
  }, [postId, refresh]);

  // Helper function to get username or fallback
  const getUsernameOrFallback = (userId: string): string => {
    return users[userId]?.username || "Unknown User";
  };

  // Helper function to get avatar initials
  const getAvatarInitials = (userId: string): string => {
    const username = getUsernameOrFallback(userId);
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet</p>
      ) : (
        comments.map((commentItem) => (
          <div key={commentItem.id} className="border-b pb-3">
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {getAvatarInitials(commentItem.user_id)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {getUsernameOrFallback(commentItem.user_id)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(commentItem.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">{commentItem.content}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
