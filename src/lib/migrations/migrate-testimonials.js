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

    console.log('Creating testimonials table...');
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS testimonials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(255),
            image TEXT,
            text TEXT NOT NULL,
            rating INT DEFAULT 5,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    const testimonials = [
        {
            name: "G.M. Jainal Abedin Bhuiya",
            role: "Business Consultant",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            text: "A clear reflection of quality and professionalism. Thank you to the entire MDL team who put in their effort to make this happen."
        },
        {
            name: "Sarah Mahmud",
            role: "Interior Designer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            text: "Their attention to detail in architectural finishes is unmatched. Working with MDL has shown me their commitment to excellence."
        },
        {
            name: "Engr. Rafiqul Islam",
            role: "Structural Engineer",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
            text: "As a professional in the industry, I highly value structural integrity. MDL projects consistently meet the highest standards."
        },
        {
            name: "Tanvir Ahmed",
            role: "Tech Entrepreneur",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
            text: "The handover process was seamless. The transparency and professionalism at MDL are truly world-class in every aspect."
        },
        {
            name: "Nusrat Jahan",
            role: "Doctor",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
            text: "MDL doesn't just build apartments; they create homes. The community and amenities provided are perfect for a modern family."
        },
        {
            name: "Imtiaz Karim",
            role: "Architect",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
            text: "Designing with MDL has been a pleasure. Their ability to translate complex blueprints into stunning reality is commendable."
        }
    ];

    console.log('Migrating initial testimonials...');
    for (const t of testimonials) {
        try {
            await connection.execute(`
                INSERT INTO testimonials (name, role, image, text) 
                VALUES (?, ?, ?, ?)
            `, [t.name, t.role, t.image, t.text]);
        } catch (err) {
            console.error(`Error migrating testimonial for ${t.name}:`, err.message);
        }
    }

    console.log('Migration completed successfully!');
    await connection.end();
}

migrate().catch(console.error);
