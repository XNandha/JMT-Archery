const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Setting up environment variables...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  File .env already exists!');
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
    }
    rl.close();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  // Generate JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  
  // Template .env content
  const envContent = `# Database Configuration
# Ganti dengan connection string dari PlanetScale
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"

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

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ File .env created successfully!');
    console.log('🔑 JWT_SECRET auto-generated');
    console.log('\n📋 Next steps:');
    console.log('1. Setup PlanetScale database');
    console.log('2. Update DATABASE_URL in .env');
    console.log('3. Run: npm install');
    console.log('4. Run: npx prisma db push');
    console.log('5. Run: npm run dev');
    console.log('\n📖 See QUICK_DATABASE_SETUP.md for detailed guide');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
} 