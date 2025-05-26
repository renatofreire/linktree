import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Share your links",
  description: "A simple way to share your links with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
