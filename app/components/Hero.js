import ItemCard from './ItemCard';
import styles from './Hero.module.css';

export default function Hero({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles['hero-container']}>
      <div className={styles['hero-header']}>
        <h2 className={styles['hero-title']}>הפריטים הנצפים ביותר</h2>
        <p className={styles['hero-subtitle']}>הזדמנות אחרונה למצוא מציאות שוות מהקהילה שלנו</p>
      </div>
      <div className={styles['hero-grid']}>
        {items.map(item => (
          <div key={item.id} className={styles['hero-item']}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
