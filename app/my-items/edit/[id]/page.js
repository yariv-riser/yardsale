import { auth } from '../../../../auth';
import { getItemById } from '../../../../lib/data';
import ItemForm from '../../../components/ItemForm';
import styles from '../../page.module.css';
import { redirect } from 'next/navigation';

export default async function EditItemPage({ params }) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const item = await getItemById(id);

  if (!item) {
    return <div className={styles['container']}>הפריט לא נמצא.</div>;
  }

  if (item.user_id !== session.user.id && session.user.role !== 'admin') {
    return <div className={styles['container']}>אין לך הרשאה לערוך פריט זה.</div>;
  }

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>עריכת פריט</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px' }}>
        <ItemForm initialData={item} itemId={id} />
      </div>
    </div>
  );
}
