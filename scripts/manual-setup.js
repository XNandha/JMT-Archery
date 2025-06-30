const fs = require('fs');
const path = require('path');

console.log('🚨 MANUAL DATABASE SETUP HELPER\n');

console.log('❌ Node.js belum terinstall!');
console.log('📋 Berikut langkah-langkah manual:\n');

console.log('1. 📝 BUAT FILE .env MANUAL');
console.log('   Buat file .env di root project dengan isi:\n');

const envContent = `# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres"

# JWT Configuration
JWT_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"

# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Payment Gateway
PAYMENT_SECRET="your-payment-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"`;

console.log(envContent);
console.log('\n⚠️  PENTING: Ganti [YOUR-PASSWORD] dengan password Supabase Anda!\n');

console.log('2. 🔄 UPDATE SCHEMA POSTGRESQL');
console.log('   Copy isi dari prisma/schema-postgres.prisma ke prisma/schema.prisma\n');

console.log('3. 📦 INSTALL NODE.JS');
console.log('   Download dari: https://nodejs.org/');
console.log('   Install dengan default settings');
console.log('   Restart terminal\n');

console.log('4. 🗄️  SETUP DATABASE (Setelah Install Node.js)');
console.log('   npm install');
console.log('   npx prisma generate');
console.log('   npx prisma db push');
console.log('   node scripts/test-db.js\n');

console.log('5. 🚀 RUN APLIKASI');
console.log('   npm run dev\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ File .env sudah ada!');
  console.log('📝 Current DATABASE_URL:');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
  
  if (dbUrlMatch) {
    const dbUrl = dbUrlMatch[1];
    if (dbUrl.includes('[YOUR-PASSWORD]')) {
      console.log('❌ Password belum diganti!');
      console.log('💡 Ganti [YOUR-PASSWORD] dengan password Supabase Anda\n');
    } else if (dbUrl.includes('supabase')) {
      console.log('✅ Menggunakan Supabase');
      console.log('✅ Password sudah diganti\n');
    } else {
      console.log('❓ Database provider tidak dikenali\n');
    }
  } else {
    console.log('❌ DATABASE_URL tidak ditemukan\n');
  }
} else {
  console.log('❌ File .env tidak ditemukan');
  console.log('💡 Buat file .env terlebih dahulu\n');
}

// Check if schema is PostgreSQL
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const schemaExists = fs.existsSync(schemaPath);

if (schemaExists) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  if (schemaContent.includes('provider = "postgresql"')) {
    console.log('✅ Schema PostgreSQL sudah aktif');
  } else if (schemaContent.includes('provider = "mysql"')) {
    console.log('❌ Masih menggunakan MySQL schema');
    console.log('💡 Copy prisma/schema-postgres.prisma ke prisma/schema.prisma\n');
  } else {
    console.log('❓ Schema provider tidak dikenali\n');
  }
} else {
  console.log('❌ File prisma/schema.prisma tidak ditemukan\n');
}

console.log('📋 CHECKLIST MANUAL:');
console.log('- [ ] File .env dibuat dengan connection string Supabase');
console.log('- [ ] Password [YOUR-PASSWORD] sudah diganti');
console.log('- [ ] Schema PostgreSQL di-copy ke prisma/schema.prisma');
console.log('- [ ] Node.js terinstall (node --version)');
console.log('- [ ] Dependencies di-install (npm install)');
console.log('- [ ] Prisma client di-generate (npx prisma generate)');
console.log('- [ ] Schema di-push ke database (npx prisma db push)');
console.log('- [ ] Database connection test berhasil (node scripts/test-db.js)');
console.log('- [ ] Aplikasi di-run (npm run dev)\n');

console.log('🎯 EXPECTED RESULTS:');
console.log('- ✅ "Database connected successfully"');
console.log('- ✅ "Connected to: db.ygqnzarecrqkzcjoayvk.supabase.co"');
console.log('- ✅ Tabel User, Product, Cart, Order, dll terbuat');
console.log('- ✅ API /api/product working');
console.log('- ✅ No more 500 errors');
console.log('- ✅ Website accessible di http://localhost:3000\n');

console.log('📖 Dokumentasi lengkap: MANUAL_DATABASE_SETUP.md');
console.log('🔗 Node.js Download: https://nodejs.org/');
console.log('🔗 Supabase Dashboard: https://supabase.com/dashboard\n');

console.log('💡 Tips:');
console.log('- Pastikan password Supabase sudah diganti di .env');
console.log('- Pilih region Asia Pacific untuk performa terbaik');
console.log('- Backup connection string dengan aman');
console.log('- Restart terminal setelah install Node.js\n');

console.log('🚀 Setelah setup lengkap, database akan terkonfigurasi dan tabel akan terbuat!'); 