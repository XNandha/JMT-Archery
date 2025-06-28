import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if DATABASE_URL is available
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your environment variables.');
  console.error('Example: DATABASE_URL="mysql://username:password@host:port/database"');
  
  // Don't create Prisma client without DATABASE_URL
  throw new Error('DATABASE_URL environment variable is required');
}

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Add error handling for database connection
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
    console.log('📍 Connected to:', DATABASE_URL.split('@')[1]?.split('/')[0] || 'unknown host');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    console.error('🔧 Please check your DATABASE_URL configuration');
    console.error('📝 Current DATABASE_URL:', DATABASE_URL ? 'Set (check format)' : 'Not set');
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});