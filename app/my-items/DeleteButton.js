'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DeleteButton({ itemId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('שגיאה במחיקת הפריט');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('שגיאה במחיקת הפריט');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className={styles['btn-delete']}
    >
      {isDeleting ? 'מוחק...' : 'מחיקה'}
    </button>
  );
}
