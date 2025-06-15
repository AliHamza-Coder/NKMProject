import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, getUserCount } from '@/lib/services/user-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (action === 'count') {
      // Get user count
      const count = await getUserCount();
      return NextResponse.json({ count });
    }

    // Get all users (without passwords)
    const users = await getAllUsers();
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json({
      message: 'Users retrieved successfully',
      users: usersWithoutPasswords,
      count: usersWithoutPasswords.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('Database connection failed')) {
      return NextResponse.json(
        { error: 'Please configure backend database connection' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}