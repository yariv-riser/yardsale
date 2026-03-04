import './globals.css';
import Header from './components/Header';
import Providers from './components/Providers';
import { Google_Sans } from 'next/font/google'
import { Handjet } from 'next/font/google'

export const metadata = {
  title: 'Yardsale כפר גליקסון',
  description: 'קהילת יד שנייה של כפר גליקסון',
};

const googleSans = Google_Sans({
  subsets: ['latin'],
})

const handjet = Handjet({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={`${handjet.className} ${googleSans.className}`}>
      <body>
        <Providers>
          <Header />
          <main className="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
