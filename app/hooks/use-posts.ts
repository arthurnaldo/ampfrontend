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

  const votePost = useCallback(
    async (postId: string, voteType: "upvote" | "downvote") => {
      try {
        const success = await PostService.votePost(postId, voteType);

        if (success) {
          // Update the local state to reflect the vote
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === postId) {
                const currentUpvotes = post.upvotes || 0;
                return {
                  ...post,
                  upvotes:
                    voteType === "upvote"
                      ? currentUpvotes + 1
                      : Math.max(0, currentUpvotes - 1),
                };
              }
              return post;
            }),
          );
        }

        return success;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        return false;
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
    votePost,
  };
}
