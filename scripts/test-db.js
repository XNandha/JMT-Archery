#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    console.log('💡 Please set DATABASE_URL in your .env file');
    process.exit(1);
  }
  
  console.log('📍 Database URL:', DATABASE_URL.split('@')[1]?.split('/')[0] || 'unknown host');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  });
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test query
    const productCount = await prisma.product.count();
    console.log(`📊 Products in database: ${productCount}`);
    
    // Test user count
    const userCount = await prisma.user.count();
    console.log(`👥 Users in database: ${userCount}`);
    
    console.log('🎉 All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    
    if (error.message.includes('P1001')) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Check if your database server is running');
      console.log('2. Verify DATABASE_URL is correct');
      console.log('3. Check if database exists');
      console.log('4. Verify network connectivity');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection(); 