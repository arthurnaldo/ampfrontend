export interface Post {
  id: string;
  title: string;
  author: string;
  created_at: string;
  content?: string;
  upvotes?: number;
  comments?: number;
}
