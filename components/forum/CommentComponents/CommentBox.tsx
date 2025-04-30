import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useComments } from "@/app/hooks/use-comments";

interface CommentBoxProps {
  onSubmitComment: (text: string) => void;
  onCancel: () => void;
  postId?: string;
  userId?: string;
}

export default function CommentBox({
  onSubmitComment,
  onCancel,
  postId,
  userId,
}: CommentBoxProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useComments(postId || "");

  const handleSubmit = async () => {
    if (!comment.trim() || isSubmitting || !postId || !userId) return;

    setIsSubmitting(true);

    try {
      const result = await addComment({
        post_id: postId,
        user_id: userId,
        content: comment,
        parent_id: null,
      });

      if (result) {
        onSubmitComment(comment);
        setComment("");
      } else {
        throw new Error("Failed to save comment");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      alert("Failed to save comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 rounded-md border p-3">
      <textarea
        className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-2 flex justify-end">
        <Button size="sm" className="mr-2" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!comment.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
