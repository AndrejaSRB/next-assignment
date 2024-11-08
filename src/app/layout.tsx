import type { Metadata } from 'next';
import './globals.css';
import inter from '@/fonts/inter';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Crypto Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
