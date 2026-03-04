import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sql } from '../../../lib/db';
import { formatPrice } from '../../util';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const paramsData = await params;
  const items = await sql`SELECT title, description FROM items WHERE id = ${paramsData.id}`;
  if (!items.length) return { title: 'פריט לא נמצא' };
  return {
    title: `${items[0].title} | Yardsale כפר גליקסון`,
    description: items[0].description || `קנו ${items[0].title} בכפר גליקסון`,
  };
}

export default async function ItemPage({ params }) {
  const { id } = await params;

  // Increment views
  await sql`UPDATE items SET views = views + 1 WHERE id = ${id}`;

  const items = await sql`
    SELECT items.*, users.name as seller_name, users.image as seller_image 
    FROM items 
    JOIN users ON items.user_id = users.id 
    WHERE items.id = ${id}
  `;

  if (!items.length) {
    notFound();
  }

  const item = items[0];


  const phoneNumber = item.seller_phone;
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <div className={styles['item-container']}>
      <div className={styles['image-section']}>
        <div className={styles['image-wrapper']}>
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className={styles['item-image']}
            priority
          />
        </div>
      </div>

      <div className={styles['details-section']}>
        <h1 className={styles['item-title']}>{item.title}</h1>
        <p className={styles['item-price']}>{formatPrice(item.price)}</p>

        <div className={styles['meta-tags']}>
          <span className={styles['meta-tag']}>{item.condition}</span>
        </div>

        <div className={styles['item-description']}>
          <p>{item.description || '(ללא תיאור)'}</p>
        </div>

        <div className={styles['seller-info']}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles['btn-contact']}>
            <span>צרו קשר עם</span>
            <span>{item.seller_name}</span>
            {item.seller_image && (
              <Image src={item.seller_image} alt={item.seller_name} width={40} height={40} className={styles['seller-avatar']} />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
