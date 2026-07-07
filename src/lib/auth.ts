import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "lux3d_secret_key";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lux3d_token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name?: string;
      role: string;
    };
  } catch {
    return null;
  }
}