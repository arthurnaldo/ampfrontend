import { supabase } from "@/lib/supabase";
import { Post } from "@/types/forum";

export class PostService {
  /**
   * Get all posts
   */
  static async getPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, author, content, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        return [];
      }

      // Format the timestamp into a readable format
      return data.map((post) => ({
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content,
        created_at: new Date(post.created_at).toLocaleString(),
      }));
    } catch (error) {
      console.error("Error in getPosts:", error);
      return [];
    }
  }

  /**
   * Get a post by ID
   */
  static async getPostById(postId: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, author, content, created_at, upvotes")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post by ID:", error);
        return null;
      }

      // Format the timestamp into a readable format
      return {
        id: data.id,
        title: data.title,
        author: data.author,
        content: data.content,
        created_at: new Date(data.created_at).toLocaleString(),
        upvotes: data.upvotes || 0,
      };
    } catch (error) {
      console.error("Error in getPostById:", error);
      return null;
    }
  }

  /**
   * Create a new post
   */
  static async createPost(post: {
    title: string;
    content: string;
    author: string;
  }): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([post])
        .select("*")
        .single();

      if (error) {
        console.error("Error creating post:", error);
        return null;
      }

      return {
        ...data,
        created_at: new Date(data.created_at).toLocaleString(),
      };
    } catch (error) {
      console.error("Error in createPost:", error);
      return null;
    }
  }

  /**
   * Vote on a post (upvote or downvote)
   */
  static async votePost(
    postId: string,
    voteType: "upvote" | "downvote",
  ): Promise<boolean> {
    try {
      // Get the current upvotes count
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("upvotes")
        .eq("id", postId)
        .single();

      if (fetchError) {
        console.error("Error fetching post for voting:", fetchError);
        return false;
      }

      // Calculate the new upvotes count
      const currentUpvotes = post.upvotes || 0;
      const updatedUpvotes =
        voteType === "upvote"
          ? currentUpvotes + 1
          : Math.max(0, currentUpvotes - 1); // Prevent negative votes

      // Update the post with the new upvotes count
      const { error: updateError } = await supabase
        .from("posts")
        .update({ upvotes: updatedUpvotes })
        .eq("id", postId);

      if (updateError) {
        console.error("Error updating post votes:", updateError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in votePost:", error);
      return false;
    }
  }
}
