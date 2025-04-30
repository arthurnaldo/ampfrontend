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
        .select("id, title, author, content, created_at")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        return null;
      }

      return {
        ...data,
        created_at: new Date(data.created_at).toLocaleString(),
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
}
