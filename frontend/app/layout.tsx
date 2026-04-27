import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Compose Dashboard",
  description: "Dashboard de monitoramento para ilhas de edição",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="">
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white transition-colors duration-300">{children}</body>
    </html>
  );
}