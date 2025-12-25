import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Prompting - AI Image Prompt Generator",
  description: "Generate professional AI image prompts for Gemini, Midjourney, ChatGPT/DALL-E, and more. Features Subject, Style, Text, Composition, and Quality optimization.",
  keywords: ["AI", "Image Generation", "Prompt", "Gemini", "Midjourney", "ChatGPT", "DALL-E", "Meta Prompting"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
