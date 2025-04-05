import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import CommentButton from "@/components/forum/CommentComponents/CommentButton";


interface CommentBoxProps {
    onSubmitComment: (text: string) => void;
    onCancel: () => void;
}

export default function CommentBox({ onSubmitComment, onCancel }: CommentBoxProps){
    const [comment, setComment] = useState("");
    
    const handleSubmit = () => {
        if (comment.trim()) {
          onSubmitComment(comment);
          setComment("");
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
            <Button 
              size="sm" 
              className="mr-2"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={!comment.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </div>
      )}


