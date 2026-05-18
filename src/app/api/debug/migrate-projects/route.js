import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('Starting migration via API...');
        
        await query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                project_name VARCHAR(255) NOT NULL,
                developer VARCHAR(255),
                project_address TEXT,
                google_map_url TEXT,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                photo_thumbnail TEXT,
                project_status VARCHAR(50),
                project_type VARCHAR(50),
                city VARCHAR(100),
                area VARCHAR(100),
                postal_code VARCHAR(20),
                total_floors INT,
                total_units INT,
                year_started INT,
                year_completion INT,
                description TEXT,
                flat_size VARCHAR(100),
                price_range VARCHAR(100),
                brochure_url TEXT,
                project_url TEXT,
                for_sale TINYINT(1) DEFAULT 1,
                registration_open TINYINT(1) DEFAULT 0,
                photos JSON,
                amenities JSON,
                features JSON,
                flat_types JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        const files = ['src/data/projects.json', 'src/data/projects1.json'];
        let count = 0;

        for (const file of files) {
            const filePath = path.join(process.cwd(), file);
            if (!fs.existsSync(filePath)) continue;

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            for (const p of data) {
                const values = [
                    p.id || `project-${Math.random().toString(36).substr(2, 9)}`,
                    p.project_name || 'Unnamed Project',
                    p.developer || null,
                    p.project_address || null,
                    p.google_map_url || null,
                    p.latitude || null,
                    p.longitude || null,
                    p.photo_thumbnail || null,
                    p.project_status || 'ongoing',
                    p.project_type || 'Residential',
                    p.city || null,
                    p.area || null,
                    p.postal_code || null,
                    p.total_floors || null,
                    p.total_units || null,
                    p.year_started || null,
                    p.year_completion || null,
                    p.description || null,
                    p.flat_size || null,
                    p.price_range || null,
                    p.brochure_url || null,
                    p.project_url || null,
                    p.for_sale ? 1 : 0,
                    p.registration_open ? 1 : 0,
                    JSON.stringify(p.photos || []),
                    JSON.stringify(p.amenities || []),
                    JSON.stringify(p.features || []),
                    JSON.stringify(p.flat_types || [])
                ];

                await query(`
                    INSERT INTO projects (
                        slug, project_name, developer, project_address, google_map_url, 
                        latitude, longitude, photo_thumbnail, project_status, project_type, 
                        city, area, postal_code, total_floors, total_units, 
                        year_started, year_completion, description, flat_size, price_range, 
                        brochure_url, project_url, for_sale, registration_open, 
                        photos, amenities, features, flat_types
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE project_name = VALUES(project_name)
                `, values);
                count++;
            }
        }

        return NextResponse.json({ success: true, message: `Migrated ${count} projects successfully!` });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
