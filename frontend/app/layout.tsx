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
      <body className="
          bg-[rgba(245,245,245,1)] text-slate-900
          dark:bg-[rgba(32,32,32,1)] dark:text-[rgba(227,227,233,1)]
          transition-colors duration-300
        "
      >{children}
      </body>
    </html>
  );
}