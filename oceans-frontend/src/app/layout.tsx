import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oceans Restaurant",
  description: "Oceans Restaurant gestión de ordenes para productos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
