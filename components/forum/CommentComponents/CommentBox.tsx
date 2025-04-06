import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import CommentButton from "@/components/forum/CommentComponents/CommentButton";


interface CommentBoxProps {
    onSubmitComment: (text: string) => void;
    onCancel: () => void;
    postId?: string;
    userId?: string;
}

export default function CommentBox({ onSubmitComment, onCancel, postId, userId }: CommentBoxProps){
    console.log("CommentBox rendered with:", { onSubmitComment, onCancel, postId, userId });
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async () => {
        if (!comment.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            if(postId && userId) {
                const { data, error } = await supabase.from('comments').insert([{
                    post_id: postId,
                    user_id: userId,
                    content: comment,
                    parent_id: null,
                    rating: 0
                }]);
            
                if(error){
                    throw error;
                };
                console.log("Comment saved to database: ", data);
            }


            onSubmitComment(comment);
            setComment("");
        } catch (error){
            console.error("Error saving comment:", error);
            alert("Failed to save comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 border rounded-md p-3">
          <textarea 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows={3}
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" className="mr-2" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button 
              size="sm" 
              onClick={() => {
                console.log("Button raw click");
                handleSubmit();
              }}
              disabled={!comment.trim()}
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
      )}


