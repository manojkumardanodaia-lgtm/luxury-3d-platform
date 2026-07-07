import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LUX3D — Premium 3D Asset Marketplace",
  description:
    "Premium 3D models, Blender assets, GLB, FBX, OBJ files and product visualization marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  );
}