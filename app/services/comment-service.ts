import { supabase } from "@/lib/supabase";

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  rating: number;
  parent_id?: string | null;
}

export class CommentService {
  /**
   * Get comments for a post
   */
  static async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getCommentsByPostId:", error);
      return [];
    }
  }

  /**
   * Create a new comment
   */
  static async createComment(comment: {
    post_id: string;
    user_id: string;
    content: string;
    parent_id?: string | null;
  }): Promise<Comment | null> {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            ...comment,
            rating: 0,
          },
        ])
        .select("*")
        .single();

      if (error) {
        console.error("Error creating comment:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in createComment:", error);
      return null;
    }
  }

  /**
   * Get comment count for a post
   */
  static async getCommentCount(postId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) {
        console.error("Error fetching comment count:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Error in getCommentCount:", error);
      return 0;
    }
  }
}
