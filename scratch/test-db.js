const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function testConnection() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('.env.local file not found!');
        return;
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        const key = parts[0];
        const value = parts.slice(1).join('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    console.log('Environment configuration loaded:');
    console.log('Host:', env.DB_HOST);
    console.log('User:', env.DB_USER);
    console.log('Database:', env.DB_NAME);

    console.log('Attempting to connect to the database...');
    try {
        const connection = await mysql.createConnection({
            host: env.DB_HOST,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
        });
        console.log('✅ Connection successful!');
        
        // Show Tables
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('\n--- Database Tables ---');
        console.log('Total Tables found:', tables.length);
        
        for (const row of tables) {
            const tableName = Object.values(row)[0];
            try {
                const [countResult] = await connection.execute(`SELECT COUNT(*) as count FROM \`${tableName}\``);
                const count = countResult[0].count;
                console.log(`- Table: ${tableName} (${count} rows)`);
            } catch (err) {
                console.log(`- Table: ${tableName} (Error reading row count: ${err.message})`);
            }
        }
        console.log('-----------------------\n');
        
        await connection.end();
        console.log('Connection closed safely.');
    } catch (error) {
        console.error('❌ Connection failed!');
        console.error(error);
    }
}

testConnection();
