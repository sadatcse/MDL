import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/projects/[id] - Get a single project
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const projects = await query('SELECT * FROM projects WHERE slug = ? OR id = ?', [id, id]);
        
        if (projects.length === 0) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(projects[0]);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        
        const sql = `
            UPDATE projects SET 
                project_name = ?, developer = ?, project_address = ?, google_map_url = ?, 
                latitude = ?, longitude = ?, photo_thumbnail = ?, project_status = ?, 
                project_type = ?, city = ?, area = ?, postal_code = ?, 
                total_floors = ?, total_units = ?, year_started = ?, year_completion = ?, 
                description = ?, flat_size = ?, price_range = ?, brochure_url = ?, 
                project_url = ?, for_sale = ?, registration_open = ?, 
                photos = ?, amenities = ?, features = ?, flat_types = ?
            WHERE slug = ? OR id = ?
        `;

        const values = [
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
            JSON.stringify(data.flat_types || []),
            id,
            id
        ];

        await query(sql, values);
        return NextResponse.json({ success: true, message: 'Project updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to update project', details: error.message }, { status: 500 });
    }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await query('DELETE FROM projects WHERE slug = ? OR id = ?', [id, id]);
        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
