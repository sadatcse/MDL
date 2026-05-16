import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const updates = await query('SELECT * FROM updates WHERE id = ? OR slug = ?', [id, id]);
        
        if (updates.length === 0) {
            return NextResponse.json({ error: 'Update not found' }, { status: 404 });
        }
        
        return NextResponse.json(updates[0]);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch update' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        
        const sql = `
            UPDATE updates SET 
                type = ?, title = ?, source = ?, date = ?, image = ?, excerpt = ?, content = ?
            WHERE id = ?
        `;

        const values = [
            data.type,
            data.title,
            data.source || null,
            data.date,
            data.image || null,
            data.excerpt || null,
            data.content || null,
            id
        ];

        await query(sql, values);
        return NextResponse.json({ success: true, message: 'Update modified successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to update item', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await query('DELETE FROM updates WHERE id = ?', [id]);
        return NextResponse.json({ success: true, message: 'Update deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete update' }, { status: 500 });
    }
}
