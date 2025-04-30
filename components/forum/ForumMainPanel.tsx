import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Post } from "@/types/forum";
import CommentButton from "@/components/forum/CommentComponents/CommentButton";
import CommentBox from "./CommentComponents/CommentBox";
import CommentList from "./CommentComponents/CommentList";
import { useAuth } from "@/app/context/AuthContext";
import { useComments } from "@/app/hooks/use-comments";
import { useUsers } from "@/app/hooks/use-users";
import VoteButtons from "./VoteButtons";
import { usePosts } from "@/app/hooks/use-posts";

interface ForumMainPanelProps {
  selectedPost: Post | null;
}

export default function ForumMainPanel({ selectedPost }: ForumMainPanelProps) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);
  const { user } = useAuth();
  const { commentCount, fetchCommentCount } = useComments(
    selectedPost?.id || "",
  );
  const { users, getUser } = useUsers();
  const { votePost } = usePosts();

  // Fetch comment count when post changes
  if (selectedPost) {
    fetchCommentCount();
  }

  // Fetch author details if needed
  if (
    selectedPost &&
    typeof selectedPost.author === "string" &&
    !users[selectedPost.author]
  ) {
    getUser(selectedPost.author);
  }

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSubmitComment = () => {
    setShowCommentBox(false);
    // When a comment is submitted, this will automatically update the comment count
    setRefreshComments((prev) => prev + 1);
  };

  if (!selectedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a post to view</p>
      </div>
    );
  }

  // Get author name
  const authorName =
    typeof selectedPost.author === "string" && users[selectedPost.author]
      ? users[selectedPost.author].username
      : "Unknown Author";

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{selectedPost.title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{selectedPost.title}</h2>
          <p className="text-sm text-muted-foreground">
            Posted by {authorName} at {selectedPost.created_at}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{selectedPost.content}</p>
        <div className="mt-6 flex items-center gap-4">
          {/* Horizontal layout for vote buttons */}
          <div className="flex items-center">
            <VoteButtons
              postId={selectedPost.id}
              initialUpvotes={selectedPost.upvotes || 0}
              onVote={votePost}
              horizontal={true}
            />
          </div>

          {!showCommentBox && (
            <CommentButton
              onClick={handleCommentClick}
              commentCount={commentCount}
            />
          )}
        </div>

        {showCommentBox && (
          <CommentBox
            onSubmitComment={handleSubmitComment}
            onCancel={() => setShowCommentBox(false)}
            postId={selectedPost.id}
            userId={user?.id}
          />
        )}
        <CommentList postId={selectedPost.id} refresh={refreshComments} />
      </CardContent>
    </Card>
  );
}
