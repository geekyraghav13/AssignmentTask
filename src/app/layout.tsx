import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Import Inter font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ // Initialize Inter font
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter
});

export const metadata: Metadata = {
  title: 'TwentyFortyFun - The 2048 Game',
  description: 'Play the classic 2048 game, rebuilt with Next.js. Combine tiles to reach 2048!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}> {/* Apply Inter font variable */}
      <body className={`font-sans antialiased`}> {/* Use font-sans which will pick up Inter */}
        {children}
        <Toaster /> {/* Add Toaster for potential future notifications */}
      </body>
    </html>
  );
}
