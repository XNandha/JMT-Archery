import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if DATABASE_URL is available
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your environment variables.');
  console.error('Example: DATABASE_URL="mysql://username:password@host:port/database"');
  
  // In development, you might want to use a local database
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  Running in development mode without database connection');
  }
}

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: DATABASE_URL || 'mysql://localhost:3306/jmt_archery',
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Add error handling for database connection
if (DATABASE_URL) {
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connected successfully');
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error);
      console.error('Please check your DATABASE_URL configuration');
    });
} else {
  console.warn('⚠️  Skipping database connection - DATABASE_URL not set');
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});