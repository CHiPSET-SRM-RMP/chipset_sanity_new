import { Router, Request, Response } from 'express';
import { getDbConnection, createRecruitmentTable } from '../database';

export const testRouter = Router();

// GET /api/test/db - Test database connection
testRouter.get('/db', async (req: Request, res: Response) => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test database connection
    const connection = await getDbConnection();
    console.log('✅ Database connection successful');
    
    // Create table if it doesn't exist
    await createRecruitmentTable();
    console.log('✅ Table creation/verification successful');
    
    res.json({
      success: true,
      message: 'Database connection and table setup successful',
      timestamp: new Date().toISOString(),
      server: 'Azure SQL Database',
      status: 'Connected'
    });
    
  } catch (error) {
    console.error('❌ Database test error:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      server: 'Azure SQL Database',
      status: 'Failed'
    });
  }
});

// GET /api/test/health - Health check
testRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'ChipSet Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});