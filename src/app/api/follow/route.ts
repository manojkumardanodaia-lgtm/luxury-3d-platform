import { NextResponse } from "next/server";

let followers: string[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: followers.length,
    followers,
  });
}

export async function POST(req: Request) {
  const { creatorId } = await req.json();

  if (!followers.includes(creatorId)) {
    followers.push(creatorId);
  }

  return NextResponse.json({
    success: true,
    count: followers.length,
  });
}

export async function DELETE(req: Request) {
  const { creatorId } = await req.json();

  followers = followers.filter((x) => x !== creatorId);

  return NextResponse.json({
    success: true,
    count: followers.length,
  });
}