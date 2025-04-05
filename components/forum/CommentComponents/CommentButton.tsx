import { Button } from "@/components/ui/button";

interface CommentButtonProps {
    onClick: () => void;
}

export default function CommentButton({ onClick }: CommentButtonProps){
    return (
        <Button 
          variant="primary" 
          size="sm"
          onClick={onClick}
          className="bg-blue-600 hover:bg-blue-700 text-amber-400 hover:text-amber-300">
          Comment
        </Button>
      );
}