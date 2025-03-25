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

export default function CreatePostDialog({ addPost }: { addPost: (post: any) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    
    // Create a new post object
    const newPost = {
      title,
      author: "You", // Replace with actual user data if available
      timestamp: "Just now",
      content,
      upvotes: 0,
      comments: 0,
    };

    addPost(newPost); // Call parent function to add the post
    setTitle(""); 
    setContent(""); 
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a new discussion</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input placeholder="Title" />
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Share your thoughts..."
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
