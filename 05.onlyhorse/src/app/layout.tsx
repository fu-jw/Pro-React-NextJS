import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "next-cloudinary/dist/cld-video-player.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import TanStackProvider from "@/providers/TanStackProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Only Horse",
  description: "Only Horse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <div className="flex-1">
              {/* tanstack 提供状态管理: https://tanstack.com/query/latest/docs/framework/react/quick-start */}
              <TanStackProvider>{children}</TanStackProvider>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
