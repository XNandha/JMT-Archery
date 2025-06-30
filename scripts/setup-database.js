const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🗄️  Database Setup Helper\n');

console.log('🚨 PlanetScale sekarang berbayar!');
console.log('🆓 Berikut alternatif database GRATIS:\n');

console.log('1. 🐘 Supabase (RECOMMENDED)');
console.log('   - Gratis selamanya (500MB)');
console.log('   - PostgreSQL');
console.log('   - Setup: https://supabase.com\n');

console.log('2. 🗄️  Neon (PostgreSQL)');
console.log('   - Gratis selamanya (3GB)');
console.log('   - PostgreSQL serverless');
console.log('   - Setup: https://neon.tech\n');

console.log('3. 🐘 Railway (PostgreSQL)');
console.log('   - Gratis untuk development');
console.log('   - PostgreSQL');
console.log('   - Setup: https://railway.app\n');

console.log('4. 🗄️  Clever Cloud (MySQL)');
console.log('   - Gratis untuk development');
console.log('   - MySQL (tidak perlu ubah schema)');
console.log('   - Setup: https://clever-cloud.com\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  File .env sudah ada!');
  console.log('📝 Current DATABASE_URL:');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
  
  if (dbUrlMatch) {
    const dbUrl = dbUrlMatch[1];
    if (dbUrl.includes('planetscale')) {
      console.log('❌ Masih menggunakan PlanetScale (berbayar)');
      console.log('💡 Ganti dengan database gratis di atas\n');
    } else if (dbUrl.includes('supabase')) {
      console.log('✅ Menggunakan Supabase (gratis)');
    } else if (dbUrl.includes('neon')) {
      console.log('✅ Menggunakan Neon (gratis)');
    } else if (dbUrl.includes('railway')) {
      console.log('✅ Menggunakan Railway (gratis)');
    } else if (dbUrl.includes('clever-cloud')) {
      console.log('✅ Menggunakan Clever Cloud (gratis)');
    } else {
      console.log('❓ Database provider tidak dikenali');
    }
  } else {
    console.log('❌ DATABASE_URL tidak ditemukan');
  }
} else {
  console.log('❌ File .env tidak ditemukan');
  console.log('💡 Buat file .env terlebih dahulu\n');
}

console.log('📋 Langkah Setup Database Gratis:\n');

console.log('1. Pilih provider (Supabase/Neon/Railway/Clever Cloud)');
console.log('2. Buat akun dan project');
console.log('3. Copy connection string');
console.log('4. Update DATABASE_URL di file .env');
console.log('5. Run: npm install');
console.log('6. Run: npx prisma generate');
console.log('7. Run: npx prisma db push');
console.log('8. Run: node scripts/test-db.js');
console.log('9. Run: npm run dev\n');

console.log('🎯 Quick Commands:\n');

console.log('# Untuk Supabase (PostgreSQL):');
console.log('cp prisma/schema-postgres.prisma prisma/schema.prisma');
console.log('npx prisma generate');
console.log('npx prisma db push\n');

console.log('# Untuk Clever Cloud (MySQL):');
console.log('# Tidak perlu ubah schema, langsung:');
console.log('npx prisma generate');
console.log('npx prisma db push\n');

console.log('📖 Dokumentasi lengkap:');
console.log('- FREE_DATABASE_ALTERNATIVES.md');
console.log('- DATABASE_SETUP_GUIDE.md\n');

console.log('🔗 Links:');
console.log('- Supabase: https://supabase.com');
console.log('- Neon: https://neon.tech');
console.log('- Railway: https://railway.app');
console.log('- Clever Cloud: https://clever-cloud.com\n');

console.log('💡 Tips:');
console.log('- Pilih region Asia Pacific untuk performa terbaik');
console.log('- Backup connection string dengan aman');
console.log('- Test koneksi sebelum deploy\n');

console.log('🚀 Setelah setup database, aplikasi akan berjalan tanpa error!'); 