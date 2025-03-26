import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Post } from "@/types/forum";

export default function ForumMainPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: generateId(),
      title,
      author: "You",
      timestamp: "Just now",
      content,
      upvotes: 0,
      comments: 0,
    };

    addPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Create Post Section */}
      <Card>
        <CardContent>
          <Textarea
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handlePost}>Post</Button>
        </CardContent>
      </Card>
      {/* Post List */}
      {posts.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No posts available</p>
        </div>
      ) : (
        posts.map((post, index) => (
          <Card key={index} className="flex-1">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar>
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Posted by {post.author} • {post.timestamp}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.content}</p>
              <div className="mt-6 flex gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.upvotes} Likes
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {post.comments} Comments
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
