/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'دعوة زفاف وعقد قران رانيا السلامي & يوسف بن سالم',
  description: 'يتشرف جميل رضوان السلامي وعائلة المرحوم فضيل بن سالم بدعوتكم لحضور عقد قران وزفاف نجليهما رانيا ويوسف بنزل تونس الكبير في 11 أكتوبر 2026',
  openGraph: {
    title: 'دعوة زفاف رانيا السلامي & يوسف بن سالم',
    description: 'دعوة زفاف وعقد قران - نزل تونس الكبير - الأحد 11 أكتوبر 2026',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دعوة زفاف رانيا السلامي & يوسف بن سالم',
    description: 'دعوة زفاف وعقد قران - نزل تونس الكبير - الأحد 11 أكتوبر 2026',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@300;400;500;600;700;800&family=Reem+Kufi:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f0f6fc] text-[#0f2742] antialiased selection:bg-[#d4af37]/30 selection:text-[#0b2038]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

