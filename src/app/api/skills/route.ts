import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function GET() {
  await connectDB();

  const skills = await Skill.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    skills,
  });
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const skill = await Skill.create(body);

  return NextResponse.json({
    success: true,
    skill,
  });
}