import { auth } from '../../auth';
import { getUserItems } from '../../lib/data';
import ItemCard from '../components/ItemCard';
import DeleteButton from './DeleteButton';
import styles from './page.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MyItemsPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className={styles['container']}>
        <p>יש להתחבר כדי לצפות בפריטים שלך.</p>
        <Link href="/api/auth/signin" className={styles['btn-login']}>התחברות</Link>
      </div>
    );
  }

  const items = await getUserItems(session.user.id);

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>הפריטים שלי</h1>

      {items.length === 0 ? (
        <div className={styles['empty-state']}>
          <p>טרם העלית פריטים למכירה או למסירה.</p>
          <Link href="/upload" className={styles['btn-primary']}>העלאת פריט ראשון</Link>
        </div>
      ) : (
        <div className={styles['items-grid']}>
          {items.map((item) => (
            <div key={item.id} className={styles['item-wrapper']}>
              <ItemCard item={item} />
              <div className={styles['item-actions']}>
                <Link href={`/my-items/edit/${item.id}`} className={styles['btn-edit']}>עריכה</Link>
                <DeleteButton itemId={item.id} />
              </div>
              <div className={styles['status-badge']} data-status={item.status}>
                {item.status === 'pending' ? 'ממתין לאישור' :
                  item.status === 'approved' ? 'מפורסם' : 'נדחה'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}