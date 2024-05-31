import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/Components/ThemeProvider";
import { Toaster } from "@/Components/ui/toaster";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker Application",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
        <body className={outfit.className}>
          <ThemeProvider>

            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
