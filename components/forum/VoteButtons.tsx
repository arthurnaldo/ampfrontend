import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface VoteButtonsProps {
  postId: string;
  initialUpvotes: number;
  onVote: (postId: string, voteType: "upvote" | "downvote") => Promise<boolean>;
  horizontal?: boolean;
}

export default function VoteButtons({
  postId,
  initialUpvotes,
  onVote,
  horizontal = false,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [isVoting, setIsVoting] = useState(false);

  // Reset upvotes state when postId or initialUpvotes changes
  useEffect(() => {
    setUpvotes(initialUpvotes || 0);
  }, [postId, initialUpvotes]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      const success = await onVote(postId, voteType);

      if (success) {
        setUpvotes((prev) =>
          voteType === "upvote" ? prev + 1 : Math.max(0, prev - 1),
        );
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      className={`flex ${horizontal ? "flex-row items-center" : "flex-col items-center"}`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("upvote")}
        disabled={isVoting}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </Button>
      <span className={`text-sm font-bold ${horizontal ? "mx-1" : ""}`}>
        {upvotes}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("downvote")}
        disabled={isVoting || upvotes <= 0}
      >
        <ArrowDownIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
