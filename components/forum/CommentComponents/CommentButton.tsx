import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface CommentButtonProps {
  onClick: () => void;
  commentCount: number;
}

export default function CommentButton({
  onClick,
  commentCount,
}: CommentButtonProps) {
  return (
    <Button
      size="sm"
      onClick={onClick}
      className="bg-blue-600 text-amber-400 hover:bg-blue-700 hover:text-amber-300"
    >
      <MessageSquare className="mr-2 h-4 w-4" />
      Comment ({commentCount})
    </Button>
  );
}
