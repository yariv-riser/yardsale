import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { sql } from '../../../../lib/db';

export async function DELETE(request, { params }) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the item belongs to the user (unless they are admin)
    const [item] = await sql`SELECT user_id FROM items WHERE id = ${id}`;

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (item.user_id !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await sql`DELETE FROM items WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, price, phone, category, condition } = body;

    // Verify ownership
    const [item] = await sql`SELECT user_id FROM items WHERE id = ${id}`;

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (item.user_id !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await sql`
      UPDATE items 
      SET 
        title = ${title}, 
        description = ${description}, 
        price = ${price}, 
        seller_phone = ${phone}, 
        category = ${category}, 
        condition = ${condition},
        status = 'pending'
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
