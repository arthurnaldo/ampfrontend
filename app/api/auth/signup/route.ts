import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  return NextResponse.json({ message: `Signup attempt for ${email}` });
}
