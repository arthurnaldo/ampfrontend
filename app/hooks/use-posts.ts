import { useState, useCallback } from "react";
import { Post } from "@/types/forum";
import { PostService } from "@/app/services/post-service";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await PostService.getPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback(
    async (newPost: { title: string; content: string; author: string }) => {
      setLoading(true);
      try {
        const createdPost = await PostService.createPost(newPost);
        if (createdPost) {
          setPosts((prevPosts) => [createdPost, ...prevPosts]);
        }
        return createdPost;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost,
  };
}
