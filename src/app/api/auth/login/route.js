import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { comparePassword, login } from '@/lib/auth';

export async function POST(request) {
  try {
    console.log('Login attempt started...');
    const body = await request.json();
    const { email, password } = body;
    console.log('Login for:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Querying database for user...');
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    console.log('User found:', !!user);

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('Comparing passwords...');
    const isPasswordValid = await comparePassword(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('Creating session...');
    // Don't include password in session
    const { password: _, ...userWithoutPassword } = user;
    await login(userWithoutPassword);
    console.log('Login successful');

    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
