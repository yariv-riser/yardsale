'use client';
import { useState } from 'react';
import ItemCard from './ItemCard';
import styles from './Feed.module.css';

const CATEGORIES = ['הכל', 'ביגוד', 'ריהוט', 'צעצועים', 'אלקטרוניקה', 'ספרים', 'אחר'];
const CONDITIONS = ['הכל', 'חדש באריזה', 'כמו חדש', 'משומש במצב טוב', 'משומש'];

export default function Feed({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [filterCategory, setFilterCategory] = useState('הכל');
  const [filterCondition, setFilterCondition] = useState('הכל');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredItems = items.filter(item => {
    const matchCategory = filterCategory === 'הכל' || item.category === filterCategory;
    const matchCondition = filterCondition === 'הכל' || item.condition === filterCondition;
    const matchPrice = maxPrice === '' || parseFloat(item.price) <= parseFloat(maxPrice);
    
    return matchCategory && matchCondition && matchPrice;
  });

  return (
    <div className={styles['feed-container']}>
      <aside className={styles['filter-sidebar']}>
        <div className={styles['filter-group']}>
          <label className={styles['filter-label']}>קטגוריה</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles['filter-select']}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles['filter-group']}>
          <label className={styles['filter-label']}>מצב</label>
          <select 
            value={filterCondition} 
            onChange={(e) => setFilterCondition(e.target.value)}
            className={styles['filter-select']}
          >
            {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles['filter-group']}>
          <label className={styles['filter-label']}>מחיר מקסימלי (₪)</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="ללא הגבלה"
            className={styles['filter-input']}
            min="0"
          />
        </div>
      </aside>

      <div className={styles['items-grid']}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className={styles['no-items']}>לא נמצאו פריטים התואמים לחיפוש.</div>
        )}
      </div>
    </div>
  );
}
