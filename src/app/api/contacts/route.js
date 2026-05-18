import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const contacts = await query('SELECT * FROM contacts ORDER BY created_at DESC');
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        
        if (!data.name || !data.email) {
            return NextResponse.json({ error: 'Name and email are required fields.' }, { status: 400 });
        }

        const values = [
            data.name,
            data.email,
            data.subject || null,
            data.message || null
        ];

        const result = await query(`
            INSERT INTO contacts (name, email, subject, message) 
            VALUES (?, ?, ?, ?)
        `, values);

        return NextResponse.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to submit message', details: error.message }, { status: 500 });
    }
}
