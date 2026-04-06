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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}