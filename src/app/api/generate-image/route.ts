import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: "API route is working",
    prompt: body.prompt,
    style: body.style,
  });
}