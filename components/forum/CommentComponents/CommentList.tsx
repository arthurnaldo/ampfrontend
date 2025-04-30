import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUsers } from "@/app/hooks/use-users";
import { useComments } from "@/app/hooks/use-comments";

interface CommentListProps {
  postId: string;
  refresh: number;
}

export default function CommentList({ postId, refresh }: CommentListProps) {
  const { users, getUsers } = useUsers();
  const { comments, loading, fetchComments } = useComments(postId);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }

    return () => {
      // Cleanup if needed
    };
  }, [postId, refresh, fetchComments]);

  useEffect(() => {
    // Extract unique user IDs from comments
    const userIds = [...new Set(comments.map((comment) => comment.user_id))];

    // Fetch user data for all comment authors
    if (userIds.length > 0) {
      getUsers(userIds);
    }
  }, [comments, getUsers]);

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
      {loading ? (
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
                  <span className="font-medium">
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
