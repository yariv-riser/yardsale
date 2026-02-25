import { auth } from '../../auth';
import { sql } from '../../lib/db';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const pendingItems = await sql`
    SELECT items.*, users.name as seller_name 
    FROM items 
    JOIN users ON items.user_id = users.id 
    WHERE items.status = 'pending' 
    ORDER BY items.created_at ASC
  `;

  return (
    <div className={styles['admin-container']}>
      <h1 className={styles['admin-title']}>לוח בקרה - ניהול פריטים</h1>
      <p className={styles['admin-subtitle']}>אשר או דחה פריטים הממתינים לפרסום בקהילה.</p>

      {pendingItems.length === 0 ? (
        <div className={styles['empty-state']}>אין פריטים הממתינים לאישור.</div>
      ) : (
        <div className={styles['items-list']}>
          {pendingItems.map(item => (
            <div key={item.id} className={styles['admin-item-card']}>
              <div className={styles['item-image-wrapper']}>
                <Image src={item.image_url} alt={item.title} fill className={styles['item-image']} />
              </div>
              <div className={styles['item-details']}>
                <h3>{item.title}</h3>
                <p><strong>מחיר:</strong> ₪{item.price}</p>
                <p><strong>מוכר:</strong> {item.seller_name}</p>
                <p><strong>טלפון:</strong> {item.seller_phone}</p>
                <p><strong>קטגוריה:</strong> {item.category} | <strong>מצב:</strong> {item.condition}</p>
              </div>
              <div className={styles['item-actions']}>
                <form action={async () => {
                  'use server';
                  const { sql } = await import('../../lib/db');
                  await sql`UPDATE items SET status = 'approved' WHERE id = ${item.id}`;
                  const { revalidatePath } = await import('next/cache');
                  revalidatePath('/admin');
                  revalidatePath('/');
                }}>
                  <button type="submit" className={styles['btn-approve']}>אישור</button>
                </form>
                <form action={async () => {
                  'use server';
                  const { sql } = await import('../../lib/db');
                  await sql`UPDATE items SET status = 'rejected' WHERE id = ${item.id}`;
                  const { revalidatePath } = await import('next/cache');
                  revalidatePath('/admin');
                }}>
                  <button type="submit" className={styles['btn-reject']}>דחייה</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
