import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection, createRecruitmentTable } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test database connection
    const connection = await getDbConnection();
    console.log('Database connection successful');
    
    // Create table if it doesn't exist
    await createRecruitmentTable();
    console.log('Table creation/verification successful');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection and table setup successful',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}