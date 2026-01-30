import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fen Kampı | Deney Temelli Fen Atölyeleri",
  description:
    "Ortaokul öğrencileri için profesyonel öğretmenler eşliğinde deney temelli fen workshopları ve kamp dönemleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center px-4">
            <Link href="/" className="font-semibold">
              Fen Kampı
            </Link>
            <nav className="ml-8 flex gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Anasayfa
              </Link>
              <Link href="/rezervasyon" className="text-sm text-muted-foreground hover:text-foreground">
                Rezervasyon
              </Link>
              <Link href="/iletisim" className="text-sm text-muted-foreground hover:text-foreground">
                İletişim
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-8 mt-auto">
          <div className="container px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fen Kampı. Tüm hakları saklıdır.
          </div>
        </footer>
      </body>
    </html>
  );
}
