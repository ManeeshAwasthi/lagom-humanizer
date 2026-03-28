import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lagom — just the right amount of human",
  description:
    "Transform AI-generated text into natural, human-sounding writing. Academic and general writing modes.",
  keywords: ["AI humanizer", "text humanizer", "academic writing", "AI detection", "humanize AI text"],
  openGraph: {
    title: "lagom — just the right amount of human",
    description: "Transform AI-generated text into natural, human-sounding writing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5079753382970193"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
