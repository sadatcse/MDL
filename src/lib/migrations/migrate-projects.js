const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function migrate() {
    // Load .env.local manually
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    });

    console.log('Creating projects table...');
    await connection.execute(`
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
    
    for (const file of files) {
        const filePath = path.join(process.cwd(), file);
        if (!fs.existsSync(filePath)) {
            console.log(`File ${file} not found, skipping...`);
            continue;
        }

        console.log(`Migrating data from ${file}...`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const p of data) {
            try {
                // Prepare values, ensuring JSON fields are strings
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

                await connection.execute(`
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
            } catch (err) {
                console.error(`Error migrating project ${p.id}:`, err.message);
            }
        }
    }

    console.log('Migration completed successfully!');
    await connection.end();
}

migrate().catch(console.error);
