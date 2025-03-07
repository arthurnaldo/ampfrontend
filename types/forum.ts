export interface Post {
  id: string;
  title: string;
  author: string;
  timestamp: string;
  content?: string;
  upvotes?: number;
  comments?: number;
}
