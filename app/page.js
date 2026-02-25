import Hero from './components/Hero';
import Feed from './components/Feed';
import { getApprovedItems, getTopItems } from '../lib/data';
import styles from './page.module.css';

export const dynamic = 'force-dynamic'; // Ensure fresh data on reload

export default async function Home() {
  const [topItems, allItems] = await Promise.all([
    getTopItems(),
    getApprovedItems()
  ]);

  return (
    <div className={styles['home-container']}>
      {topItems.length > 0 && <Hero items={topItems} />}
      <section className={styles['feed-section']}>
        <h2 className={styles['section-title']}>כל הפריטים</h2>
        <Feed initialItems={allItems} />
      </section>
    </div>
  );
}
