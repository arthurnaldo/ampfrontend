import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/types/forum";
import { useAuth } from "@/app/context/AuthContext";

export default function CreatePostDialog({
  addPost,
}: {
  addPost: (post: Post) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handlePost = async () => {
    if (!user) {
      setError("Login to post");
      return;
    }

    if (!title.trim() || !content.trim()) return;

    // Create a new post object
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author: user.id,
      created_at: new Date().toLocaleString(),
      content,
      upvotes: 0,
      comments: 0,
    };

    addPost(newPost); // Call parent function to add the post
    setTitle("");
    setContent("");
    setOpen(false); // Close the dialog after posting
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a new discussion</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Share your thoughts..."
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePost}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
