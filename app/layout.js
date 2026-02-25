import './globals.css';
import Header from './components/Header';
import Providers from './components/Providers';

export const metadata = {
  title: 'Yardsale כפר גליקסון',
  description: 'קהילת יד שנייה של כפר גליקסון',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
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
