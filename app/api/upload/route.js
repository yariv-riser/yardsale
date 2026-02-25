import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { sql } from '../../../lib/db';

export async function POST(request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const file = formData.get('image');
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const phone = formData.get('phone');
    const category = formData.get('category');
    const condition = formData.get('condition');

    if (!file || !title || !price || !category || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, { access: 'private' });

    // Save to Database
    await sql`
      INSERT INTO items (
        user_id, title, description, price, condition, category, image_url, seller_phone, status
      ) VALUES (
        ${session.user.id}, ${title}, ${description}, ${price}, ${condition}, ${category}, ${blob.url}, ${phone}, 'pending'
      )
    `;

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
