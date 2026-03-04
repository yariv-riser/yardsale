'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './Header.module.css';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={styles['header-container']}>
      <div className={styles['header-content']}>
        <Link href="/" className={styles['logo']}>
          <div className={styles['logo-container']}>
            <span className={styles['logo-community']}>כפר גליקסון</span>
            <Image alt='לוגו' src="/yardsale-logo.png" height={43} width={60} />
            <span className={styles['logo-yardsale']}>Yardsale</span>
          </div>
        </Link>
        <nav className={styles['nav-links']}>

          {session ? (
            <>
              <Link href="/upload" className={`${styles['nav-link']} ${styles['upload']}`}>העלאת פריט</Link>
              <Link href="/my-items" className={styles['nav-link']}>הפריטים שלי</Link>
              <div className={styles['user-menu']}>
                {session.user?.role === 'admin' && (
                  <Link href="/admin" className={styles['nav-link']}>ניהול</Link>
                )}
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
