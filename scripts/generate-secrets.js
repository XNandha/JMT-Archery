#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔐 Generating secrets for JMT Archery...\n');

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('✅ JWT_SECRET generated:');
console.log(jwtSecret);
console.log('');

// Generate example environment variables
console.log('📝 Copy these to your Vercel Environment Variables:\n');

console.log('DATABASE_URL=mysql://username:password@host:port/database');
console.log('JWT_SECRET=' + jwtSecret);
console.log('EMAIL_USER=your-email@gmail.com');
console.log('EMAIL_PASS=your-app-password');
console.log('CLOUDINARY_CLOUD_NAME=your-cloud-name');
console.log('CLOUDINARY_API_KEY=your-api-key');
console.log('CLOUDINARY_API_SECRET=your-api-secret');

console.log('\n🎯 Next steps:');
console.log('1. Copy JWT_SECRET above');
console.log('2. Setup database at PlanetScale');
console.log('3. Add environment variables to Vercel');
console.log('4. Redeploy your application'); 