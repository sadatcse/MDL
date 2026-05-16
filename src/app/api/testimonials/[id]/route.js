import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        
        const sql = `
            UPDATE testimonials SET 
                name = ?, role = ?, image = ?, text = ?, rating = ?
            WHERE id = ?
        `;

        const values = [
            data.name,
            data.role || null,
            data.image || null,
            data.text,
            data.rating || 5,
            id
        ];

        await query(sql, values);
        return NextResponse.json({ success: true, message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to update testimonial', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await query('DELETE FROM testimonials WHERE id = ?', [id]);
        return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
