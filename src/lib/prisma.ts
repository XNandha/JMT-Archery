import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if DATABASE_URL is available
const DATABASE_URL = process.env.DATABASE_URL;

// Create Prisma client with proper error handling
let prisma: PrismaClient;

if (!DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL environment variable is not set!');
  console.warn('This is normal during build time. Make sure to set DATABASE_URL in production.');
  
  // Create a mock Prisma client for build time
  prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
      db: {
        url: 'mysql://dummy:dummy@localhost:3306/dummy',
      },
    },
  });
} else {
  // Create real Prisma client for runtime
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Only connect to database if DATABASE_URL is available and we're not in build time
if (DATABASE_URL && process.env.NODE_ENV !== 'production') {
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connected successfully');
      console.log('📍 Connected to:', DATABASE_URL.split('@')[1]?.split('/')[0] || 'unknown host');
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error);
      console.error('🔧 Please check your DATABASE_URL configuration');
    });
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };