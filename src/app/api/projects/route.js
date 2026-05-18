import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/projects - List all projects
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        
        let sql = 'SELECT * FROM projects ORDER BY created_at DESC';
        const params = [];

        if (status || type) {
            sql = 'SELECT * FROM projects WHERE 1=1';
            if (status) {
                sql += ' AND project_status = ?';
                params.push(status);
            }
            if (type) {
                sql += ' AND project_type = ?';
                params.push(type);
            }
            sql += ' ORDER BY created_at DESC';
        }

        const projects = await query(sql, params);
        return NextResponse.json(projects);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

// POST /api/projects - Create a new project
export async function POST(request) {
    try {
        const data = await request.json();
        
        const slug = data.slug || data.project_name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, '');
        
        const values = [
            slug,
            data.project_name,
            data.developer || null,
            data.project_address || null,
            data.google_map_url || null,
            data.latitude || null,
            data.longitude || null,
            data.photo_thumbnail || null,
            data.project_status || 'ongoing',
            data.project_type || 'Residential',
            data.city || null,
            data.area || null,
            data.postal_code || null,
            data.total_floors || null,
            data.total_units || null,
            data.year_started || null,
            data.year_completion || null,
            data.description || null,
            data.flat_size || null,
            data.price_range || null,
            data.brochure_url || null,
            data.project_url || null,
            data.for_sale ? 1 : 0,
            data.registration_open ? 1 : 0,
            JSON.stringify(data.photos || []),
            JSON.stringify(data.amenities || []),
            JSON.stringify(data.features || []),
            JSON.stringify(data.flat_types || [])
        ];

        const result = await query(`
            INSERT INTO projects (
                slug, project_name, developer, project_address, google_map_url, 
                latitude, longitude, photo_thumbnail, project_status, project_type, 
                city, area, postal_code, total_floors, total_units, 
                year_started, year_completion, description, flat_size, price_range, 
                brochure_url, project_url, for_sale, registration_open, 
                photos, amenities, features, flat_types
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, values);

        return NextResponse.json({ success: true, id: result.insertId, slug });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create project', details: error.message }, { status: 500 });
    }
}
