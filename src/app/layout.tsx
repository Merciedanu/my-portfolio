import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const viewport: Viewport = {
  themeColor: '#1a1c1c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Mercy Ndanu | Software Developer & Systems Architect',
  description: 'Portfolio of Mercy Ndanu — Building scalable web & mobile solutions with a focus on impact and technical excellence.',
  keywords: ['Mercy Ndanu', 'Software Developer', 'Systems Architect', 'Full Stack Engineer', 'Nairobi Kenya', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Mercy Ndanu' }],
  openGraph: {
    title: 'Mercy Ndanu | Software Developer & Systems Architect',
    description: 'Portfolio of Mercy Ndanu — Building scalable web & mobile solutions with a focus on impact and technical excellence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mercy Ndanu Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased selection:bg-[#825500] selection:text-white">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
