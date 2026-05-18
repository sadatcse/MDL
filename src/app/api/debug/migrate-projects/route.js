import { NextResponse } from 'next/server';
import { connectMongo, getModel } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('Starting migration via API...');
        
        await connectMongo();
        const Model = getModel('projects');

        const files = ['src/data/projects.json', 'src/data/projects1.json'];
        let count = 0;

        for (const file of files) {
            const filePath = path.join(process.cwd(), file);
            if (!fs.existsSync(filePath)) continue;

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            for (const p of data) {
                // Ensure id field is set
                const docData = { ...p };
                if (!docData.id) {
                    docData.id = `project-${Math.random().toString(36).substr(2, 9)}`;
                }

                // Upsert based on slug or id
                await Model.findOneAndUpdate(
                    { $or: [{ slug: docData.slug }, { id: docData.id }] },
                    docData,
                    { upsert: true, new: true }
                );
                count++;
            }
        }

        return NextResponse.json({ success: true, message: `Migrated ${count} projects successfully to MongoDB!` });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
