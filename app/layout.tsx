import { Geist_Mono, Raleway } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        raleway.variable
      )}
    >
      <body>
        <ThemeProvider>
          <header className="flex h-16 items-center gap-2 bg-secondary px-4">
            <nav className="flex">
              <Button asChild variant="ghost">
                <Link href="/">Book listings</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/books/create">Add book</Link>
              </Button>
            </nav>
          </header>
          {children}

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
