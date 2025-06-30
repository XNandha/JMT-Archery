import { prisma } from './prisma';

// Utility function to check database connection
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    return { connected: true };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown database error' 
    };
  }
}

// Utility function to safely execute database operations
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error: unknown) {
    console.error('Database operation failed:', error);
    
    // Check if it's a connection error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('DATABASE_URL') || errorMessage.includes('localhost')) {
      return { 
        success: false, 
        error: 'Database connection not configured. Please set DATABASE_URL environment variable.' 
      };
    }
    
    return { 
      success: false, 
      error: errorMessage,
      data: fallback 
    };
  }
}

// Utility function to get database status
export async function getDatabaseStatus() {
  const connection = await checkDatabaseConnection();
  
  if (!connection.connected) {
    return {
      status: 'disconnected',
      message: 'Database connection failed',
      error: connection.error
    };
  }

  try {
    // Test a simple query
    const userCount = await prisma.user.count();
    return {
      status: 'connected',
      message: 'Database connected successfully',
      userCount
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'error',
      message: 'Database query failed',
      error: errorMessage
    };
  }
} 