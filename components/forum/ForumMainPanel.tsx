import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Post } from "@/types/forum";
import { timeStamp } from "console";

export default function ForumMainPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

  // Add a post and refresh the UI
  const handlePost = async () => {
    console.log("Got here after clikcing button");
    if (!title.trim() || !content.trim()) return;

    // const { data: user, error: userError } = await supabase.auth.getUser();

    // if (userError || !user?.user) {
    //   console.error("User not authenticated:", userError);
    //   return;
    // }
    
    //This is to basically insert a new post
    const newPost = {
      title,
      content,
      author: '4ff3c884-6fd9-4c81-87ba-4b73e57f0264',
      upvotes: 0,
      created_at: new Date().toISOString(),
    };

    //This is the actual insertion
    const { data, error } = await supabase.from("posts").insert([newPost]).select("*");

    if (error) {
      console.error("Error saving post:", error);
    } else {
      console.log("Correctly saved post");
      setTitle("");
      setContent("");
      setPosts([data[0], ...posts]);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Create Post Section */}
      <Card>
        <CardContent>
          <Textarea placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2" />
          <Textarea placeholder="Share your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} className="mb-2" />
          <Button onClick={handlePost}>Post</Button>
        </CardContent>
      </Card>

      {/* If there are no posts to display, we just say 'no posts available' */}
      {posts.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No posts available</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="flex-1">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar>
                <AvatarFallback>{post.title[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">Posted at {new Date(post.created_at).toLocaleString()}</p>
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
                  0 Comments
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
