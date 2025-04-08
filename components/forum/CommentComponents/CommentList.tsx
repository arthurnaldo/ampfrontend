import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  useEffect(() => {
    const fetchComments = async () => {
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
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };
    fetchComments();
  }, [postId, refresh]);

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
      {comments.map((commentItem) => (
        <div key={commentItem.id} className="border-b pb-3">
          <div className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {commentItem.user_id.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {commentItem.user_id}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(commentItem.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm">{commentItem.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
