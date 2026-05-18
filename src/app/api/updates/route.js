import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const updates = await query('SELECT * FROM updates ORDER BY created_at DESC');
        return NextResponse.json(updates);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const slug = data.slug || data.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, '');
        
        const values = [
            slug,
            data.type || 'Media',
            data.title,
            data.source || null,
            data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
            data.image || null,
            data.excerpt || null,
            data.content || null
        ];

        const result = await query(`
            INSERT INTO updates (slug, type, title, source, date, image, excerpt, content) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, values);

        return NextResponse.json({ success: true, id: result.insertId, slug });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create update', details: error.message }, { status: 500 });
    }
}
