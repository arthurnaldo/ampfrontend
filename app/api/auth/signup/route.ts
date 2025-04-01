import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Email, password, and username are required" },
        { status: 400 },
      );
    }

    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Then, create the user in the public.users table
    const { error: userError } = await supabase.from("users").insert([
      {
        id: authData.user?.id,
        email,
        username,
      },
    ]);

    if (userError) {
      // If user creation fails, we should clean up the auth user
      await supabase.auth.signOut();
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
