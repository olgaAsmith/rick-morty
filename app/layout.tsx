import type { Metadata } from 'next';
import './globals.css';
import { Marck_Script } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Rick&Morty Search',
  description: 'Searching characters',
};

const marckScript = Marck_Script({
  weight: '400',
  subsets: ['cyrillic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${marckScript.className} flex flex-col min-h-screen`}>
        <header className='h-[100px]'></header>
        <main className='grow px-4 md:px-8'>{children}</main>
        <footer className='h-[100px]'></footer>
      </body>
    </html>
  );
}
