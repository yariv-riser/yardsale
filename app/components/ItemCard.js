import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.css';

export default function ItemCard({ item }) {
  return (
    <Link href={`/item/${item.id}`} className={styles['card-link']}>
      <article className={styles['card-container']}>
        <div className={styles['image-wrapper']}>
          <Image 
            src={item.image_url} 
            alt={item.title} 
            fill 
            className={styles['card-image']}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles['card-content']}>
          <h3 className={styles['card-title']}>{item.title}</h3>
          <p className={styles['card-price']}>₪{item.price}</p>
          <div className={styles['card-meta']}>
            <span className={styles['meta-condition']}>{item.condition}</span>
            <span className={styles['meta-category']}>{item.category}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
