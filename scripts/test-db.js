#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

console.log('🔍 Testing database connection...\n');

// Check if DATABASE_URL is set
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your environment variables.');
  process.exit(1);
}

console.log('✅ DATABASE_URL is set');
console.log('📍 Host:', DATABASE_URL.split('@')[1]?.split('/')[0] || 'unknown');

// Test database connection
async function testConnection() {
  const prisma = new PrismaClient({
    log: ['error'],
  });

  try {
    console.log('\n🔄 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Test a simple query
    console.log('🔄 Testing query...');
    const userCount = await prisma.user.count();
    console.log('✅ Query successful!');
    console.log(`📊 Total users in database: ${userCount}`);

    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.message.includes('localhost')) {
      console.error('\n🔧 This usually means:');
      console.error('1. DATABASE_URL is not set correctly');
      console.error('2. You need to set up PlanetScale database');
      console.error('3. Check Vercel environment variables');
    }
    
    process.exit(1);
  }
}

testConnection(); 