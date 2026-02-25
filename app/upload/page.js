'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

const CATEGORIES = ['ביגוד', 'ריהוט', 'צעצועים', 'אלקטרוניקה', 'ספרים', 'אחר'];
const CONDITIONS = ['חדש באריזה', 'כמו חדש', 'משומש במצב טוב', 'משומש'];

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (status === 'unauthenticated') {
    return <div className={styles['message-box']}>אנא התחבר כדי להעלות פריט.</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('שגיאה בהעלאת הפריט');
      }

      router.push('/?success=true');
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles['upload-container']}>
      <h1 className={styles['upload-title']}>העלאת פריט חדש</h1>
      <p className={styles['upload-subtitle']}>הפריט יעבור לאישור הנהלה לפני שיוצג בפיד.</p>

      {error && <div className={styles['error-message']}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles['upload-form']}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>כותרת הפריט</label>
          <input name="title" required className={styles['form-input']} placeholder="לדוגמה: אופניים חשמליים במצב מעולה" />
        </div>

        <div className={styles['form-group']}>
          <label className={styles['form-label']}>תיאור</label>
          <textarea name="description" className={styles['form-textarea']} rows="4" placeholder="פרט על הפריט..."></textarea>
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>מחיר (₪)</label>
            <input type="number" name="price" required min="0" step="0.01" className={styles['form-input']} placeholder="0.00" />
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>טלפון ליצירת קשר</label>
            <input type="tel" name="phone" required className={styles['form-input']} placeholder="לדוגמה: 050-4840588" defaultValue="050-4840588" />
          </div>
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>קטגוריה</label>
            <select name="category" required className={styles['form-select']}>
              <option value="">בחר קטגוריה</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>מצב הפריט</label>
            <select name="condition" required className={styles['form-select']}>
              <option value="">בחר מצב</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className={styles['form-group']}>
          <label className={styles['form-label']}>תמונה</label>
          <input type="file" name="image" required accept="image/*" className={styles['form-file']} />
        </div>

        <button type="submit" disabled={isSubmitting} className={styles['btn-submit']}>
          {isSubmitting ? 'מעלה...' : 'שלח לאישור'}
        </button>
      </form>
    </div>
  );
}
