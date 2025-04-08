import { useState } from 'react';
import ForumSidebar from './ForumSidebar';
import ForumMainPanel from './ForumMainPanel';
import { Post } from "@/types/forum";

export default function Forum() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostSelect = (post: Post) => {
    console.log("Selected Post:", post);
    setSelectedPost(post);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <ForumSidebar onPostSelect={handlePostSelect} selectedPostId={selectedPost?.id} />

      {/* Main panel showing selected post */}
      <ForumMainPanel selectedPost={selectedPost} />
    </div>
  );
}
