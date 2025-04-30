import { useState } from "react";
import { User, UserService } from "@/app/services/user-service";

/**
 * Hook to fetch and cache user data
 */
export function useUsers() {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, Error>>({});

  /**
   * Get a single user by ID
   */
  const getUser = async (userId: string): Promise<User | null> => {
    // Return from cache if available
    if (users[userId]) {
      return users[userId];
    }

    // Skip if already loading
    if (loading[userId]) {
      return null;
    }

    try {
      setLoading((prev) => ({ ...prev, [userId]: true }));
      const user = await UserService.getUserById(userId);

      if (user) {
        setUsers((prev) => ({ ...prev, [userId]: user }));
        return user;
      }
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError((prev) => ({ ...prev, [userId]: error }));
      return null;
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  /**
   * Get multiple users by IDs
   */
  const getUsers = async (userIds: string[]): Promise<void> => {
    // Filter out IDs that are already loaded or loading
    const idsToFetch = userIds.filter((id) => !users[id] && !loading[id]);

    if (!idsToFetch.length) return;

    try {
      // Mark all as loading
      const newLoading = idsToFetch.reduce(
        (acc, id) => {
          acc[id] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      setLoading((prev) => ({ ...prev, ...newLoading }));

      const fetchedUsers = await UserService.getUsersByIds(idsToFetch);

      setUsers((prev) => ({ ...prev, ...fetchedUsers }));
    } catch (err) {
      console.error("Error fetching multiple users:", err);
    } finally {
      // Mark all as not loading
      const finishedLoading = idsToFetch.reduce(
        (acc, id) => {
          acc[id] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      setLoading((prev) => ({ ...prev, ...finishedLoading }));
    }
  };

  return {
    users,
    loading,
    error,
    getUser,
    getUsers,
  };
}
