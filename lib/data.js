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

export async function getUserItems(userId) {
  const { sql } = await import('./db');
  try {
    const items = await sql`
      SELECT * FROM items 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getItemById(id) {
  const { sql } = await import('./db');
  try {
    const [item] = await sql`
      SELECT * FROM items 
      WHERE id = ${id}
    `;
    return item;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
