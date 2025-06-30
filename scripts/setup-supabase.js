const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🐘 Supabase Setup Helper\n');

// Connection string dari user
const SUPABASE_CONNECTION_STRING = "postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres";

console.log('✅ Connection string Supabase Anda:');
console.log(SUPABASE_CONNECTION_STRING);
console.log('\n⚠️  PENTING: Ganti [YOUR-PASSWORD] dengan password Supabase Anda!\n');

// Generate JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Template .env content
const envContent = `# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="${SUPABASE_CONNECTION_STRING}"

# JWT Configuration (Auto-generated)
JWT_SECRET="${jwtSecret}"

# Email Configuration (untuk reset password)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Payment Gateway (opsional)
PAYMENT_SECRET="your-payment-secret"

# Cloudinary (untuk image upload)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${jwtSecret}"
`;

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  File .env sudah ada!');
  console.log('📝 Current .env content:');
  console.log('─'.repeat(50));
  console.log(fs.readFileSync(envPath, 'utf8'));
  console.log('─'.repeat(50));
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\n❓ Do you want to overwrite? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('✅ Keeping existing .env file');
      console.log('💡 Edit manually if needed');
      showNextSteps();
    }
    rl.close();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ File .env created successfully!');
    console.log('🔑 JWT_SECRET auto-generated');
    showNextSteps();
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

function showNextSteps() {
  console.log('\n📋 Next Steps:\n');
  
  console.log('1. 🔧 Install Node.js (jika belum):');
  console.log('   Download dari: https://nodejs.org/');
  console.log('   Restart terminal setelah install\n');
  
  console.log('2. 🔑 Update password di file .env:');
  console.log('   Ganti [YOUR-PASSWORD] dengan password Supabase Anda\n');
  
  console.log('3. 🗄️  Switch ke PostgreSQL schema:');
  console.log('   cp prisma/schema-postgres.prisma prisma/schema.prisma\n');
  
  console.log('4. 📦 Install dependencies:');
  console.log('   npm install\n');
  
  console.log('5. 🔄 Generate Prisma client:');
  console.log('   npx prisma generate\n');
  
  console.log('6. 🚀 Push schema ke database:');
  console.log('   npx prisma db push\n');
  
  console.log('7. 🧪 Test database connection:');
  console.log('   node scripts/test-db.js\n');
  
  console.log('8. 🎯 Run aplikasi:');
  console.log('   npm run dev\n');
  
  console.log('🎯 Quick setup (setelah install Node.js):');
  console.log('npm install && cp prisma/schema-postgres.prisma prisma/schema.prisma && npx prisma generate && npx prisma db push && node scripts/test-db.js && npm run dev\n');
  
  console.log('📖 Dokumentasi lengkap: SUPABASE_SETUP_GUIDE.md');
  console.log('🔗 Supabase Dashboard: https://supabase.com/dashboard\n');
  
  console.log('💡 Tips:');
  console.log('- Pastikan password Supabase sudah diganti di .env');
  console.log('- Pilih region Asia Pacific untuk performa terbaik');
  console.log('- Backup connection string dengan aman\n');
  
  console.log('🚀 Setelah setup lengkap, aplikasi akan berjalan tanpa error!');
} 