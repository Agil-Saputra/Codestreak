import type { Metadata } from "next";
import { ThemeProvider } from "next-themes"
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeStreak",
  description: "App For Solving Coding Problem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
