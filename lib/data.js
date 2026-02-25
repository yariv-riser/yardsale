export async function getApprovedItems() {
  const { sql } = await import('./db');
  try {
    const items = await sql`
      SELECT * FROM items 
      WHERE status = 'approved' 
      ORDER BY created_at DESC
    `;
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getTopItems() {
  const { sql } = await import('./db');
  try {
    const items = await sql`
      SELECT * FROM items 
      WHERE status = 'approved' 
      ORDER BY views DESC 
      LIMIT 3
    `;
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
