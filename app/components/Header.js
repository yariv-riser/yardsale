'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './Header.module.css';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={styles['header-container']}>
      <div className={styles['header-content']}>
        <Link href="/" className={styles['logo']}>
          <span className={styles['logo-yardsale']}>Yardsale</span>
          <span className={styles['logo-community']}>כפר גליקסון</span>
        </Link>
        <nav className={styles['nav-links']}>
          {session ? (
            <>
              {session.user?.role === 'admin' && (
                <Link href="/admin" className={styles['nav-link']}>ניהול</Link>
              )}
              <Link href="/upload" className={styles['nav-link']}>העלאת פריט</Link>
              <div className={styles['user-menu']}>
                <span className={styles['user-name']}>{session.user.name}</span>
                <button onClick={() => signOut()} className={styles['btn-logout']}>התנתק</button>
              </div>
            </>
          ) : (
            <button onClick={() => signIn('google')} className={styles['btn-login']}>התחברות</button>
          )}
        </nav>
      </div>
    </header>
  );
}
