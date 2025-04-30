import { useState, useCallback } from "react";
import { Comment, CommentService } from "@/app/services/comment-service";

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const fetchedComments = await CommentService.getCommentsByPostId(postId);
      setComments(fetchedComments);
      setCommentCount(fetchedComments.length);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const fetchCommentCount = useCallback(async () => {
    if (!postId) return;

    try {
      const count = await CommentService.getCommentCount(postId);
      setCommentCount(count);
    } catch (err) {
      console.error("Error fetching comment count:", err);
    }
  }, [postId]);

  const addComment = useCallback(
    async (newComment: {
      post_id: string;
      user_id: string;
      content: string;
      parent_id?: string | null;
    }) => {
      setLoading(true);
      try {
        const createdComment = await CommentService.createComment(newComment);
        if (createdComment) {
          setComments((prevComments) => [createdComment, ...prevComments]);
          setCommentCount((prevCount) => prevCount + 1);
        }
        return createdComment;
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
    comments,
    commentCount,
    loading,
    error,
    fetchComments,
    fetchCommentCount,
    addComment,
  };
}
