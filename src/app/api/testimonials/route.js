import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const values = [
            data.name,
            data.role || null,
            data.image || null,
            data.text,
            data.rating || 5
        ];

        const result = await query(`
            INSERT INTO testimonials (name, role, image, text, rating) 
            VALUES (?, ?, ?, ?, ?)
        `, values);

        return NextResponse.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create testimonial', details: error.message }, { status: 500 });
    }
}
