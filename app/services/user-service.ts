import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export class UserService {
  /**
   * Get a user by their ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, email, created_at")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getUserById:", error);
      return null;
    }
  }

  /**
   * Get multiple users by their IDs
   */
  static async getUsersByIds(userIds: string[]): Promise<Record<string, User>> {
    if (!userIds.length) return {};

    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, email, created_at")
        .in("id", userIds);

      if (error) {
        console.error("Error fetching users:", error);
        return {};
      }

      // Convert array to object with user IDs as keys
      return (data || []).reduce(
        (acc, user) => {
          acc[user.id] = user;
          return acc;
        },
        {} as Record<string, User>,
      );
    } catch (error) {
      console.error("Error in getUsersByIds:", error);
      return {};
    }
  }
}
