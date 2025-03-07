"use client";

import { useState } from "react";
import ForumSidebar from "@/components/forum/ForumSidebar";
import ForumMainPanel from "@/components/forum/ForumMainPanel";
import { Post } from "@/types/forum";

export default function ForumPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto mt-8 flex h-[calc(100vh-8rem)] gap-8">
      {/* Left Sidebar */}
      <div className="w-1/3">
        <ForumSidebar
          onPostSelect={handlePostSelect}
          selectedPostId={selectedPost?.id}
        />
      </div>

      {/* Main Content */}
      <div className="w-2/3">
        <ForumMainPanel post={selectedPost} />
      </div>
    </div>
  );
}
