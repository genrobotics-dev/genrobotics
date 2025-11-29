import { Roboto, Anton, Quattrocento } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: 'variable',
});

export const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
  weight: ['400'],
});

export const quattro = Quattrocento({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quattro',
  weight: ['400'],
});