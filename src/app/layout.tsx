import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lens Optic",
  description: "Optical shop management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Lens Optic</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:text-blue-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-white hover:text-blue-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/receipts/new" className="text-white hover:text-blue-200">
                  New Receipt
                </a>
              </li>
              <li>
                <a href="/receipts" className="text-white hover:text-blue-200">
                  Receipt History
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  )
}

