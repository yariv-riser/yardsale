'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ItemForm.module.css';

const CATEGORIES = ['רכב', 'ביגוד', 'ריהוט', 'צעצועים', 'אלקטרוניקה', 'ספרים', 'אחר'];
const CONDITIONS = ['חדש באריזה', 'כמו חדש', 'משומש במצב טוב', 'משומש'];

export default function ItemForm({ initialData, itemId }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!itemId;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);

    try {
      if (isEdit) {
        // For editing, we send a JSON PATCH request
        // NOTE: We don't support updating the image yet for simplicity
        const data = {
          title: formData.get('title'),
          description: formData.get('description'),
          price: formData.get('price'),
          phone: formData.get('phone'),
          category: formData.get('category'),
          condition: formData.get('condition'),
        };

        const res = await fetch(`/api/items/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('שגיאה בעדכון הפריט');
        router.push('/my-items?updated=true');
      } else {
        // For uploading, we send FormData
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('שגיאה בהעלאת הפריט');
        router.push('/?success=true');
      }
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles['upload-form']}>
      {error && <div className={styles['error-message']}>{error}</div>}

      <div className={styles['form-group']}>
        <label className={styles['form-label']}>שם הפריט</label>
        <input
          name="title"
          required
          className={styles['form-input']}
          placeholder="לדוגמה: אופניים חשמליים במצב מעולה"
          defaultValue={initialData?.title}
        />
      </div>

      <div className={styles['form-group']}>
        <label className={styles['form-label']}>תיאור</label>
        <textarea
          name="description"
          className={styles['form-textarea']}
          rows="4"
          placeholder="מדוע נמסר/פגמים/כמה שומש..."
          defaultValue={initialData?.description}
        ></textarea>
      </div>

      <div className={styles['form-row']}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>מחיר</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="1"
            className={styles['form-input']}
            placeholder="₪0"
            defaultValue={initialData?.price}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles['form-label']}>טלפון ליצירת קשר</label>
          <input
            type="tel"
            name="phone"
            required
            className={styles['form-input']}
            pattern='^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$'
            defaultValue={initialData?.seller_phone}
          />
        </div>
      </div>

      <div className={styles['form-row']}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>קטגוריה</label>
          <select name="category" required className={styles['form-select']} defaultValue={initialData?.category}>
            <option value="">בחר קטגוריה</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles['form-group']}>
          <label className={styles['form-label']}>מצב הפריט</label>
          <select name="condition" required className={styles['form-select']} defaultValue={initialData?.condition}>
            <option value="">בחרו מצב</option>
            {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {!isEdit && (
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>תמונה</label>
          <input type="file" name="image" required accept="image/*" className={styles['form-file']} />
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className={styles['btn-submit']}>
        {isSubmitting ? 'שולח...' : isEdit ? 'עדכן פריט' : 'שלחו לאישור'}
      </button>
    </form>
  );
}
