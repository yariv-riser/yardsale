'use client';
import { useSession } from 'next-auth/react';
import ItemForm from '../components/ItemForm';
import styles from './page.module.css';

export default function UploadPage() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <div className={styles['message-box']}>אנא התחבר כדי להעלות פריט.</div>;
  }

  return (
    <div className={styles['upload-container']}>
      <h1 className={styles['upload-title']}>העלאת פריט</h1>
      <p className={styles['upload-subtitle']}>הפריט יעבור לאישור לפני שיוצג באתר.</p>
      <ItemForm />
    </div>
  );
}
