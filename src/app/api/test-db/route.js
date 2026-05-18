import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // A simple query to check the connection
    // We try to show tables or just select 1
    const result = await query('SELECT 1 + 1 AS result');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!',
      data: result 
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    }, { status: 500 });
  }
}
