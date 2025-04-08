"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signUp: (
    email: string,
    password: string,
    username?: string,
  ) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<{ error: Error | null }>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signUp: async () => ({ error: null, data: { user: null, session: null } }),
  signIn: async () => ({ error: null, data: { user: null, session: null } }),
  signOut: async () => ({ error: null }),
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      // First sign up with Supabase Auth
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      // If signup was successful and username was provided, store it in your users table
      if (response.data.user && username) {
        // You might need to adjust this based on your database schema
        await supabase.from("users").insert([
          {
            id: response.data.user.id,
            username,
            email,
          },
        ]);
      }

      return response;
    } catch (error) {
      console.error("Error in signUp:", error);
      return {
        error:
          error instanceof Error ? error : new Error("Unknown error occurred"),
        data: { user: null, session: null },
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{ user, session, signUp, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
