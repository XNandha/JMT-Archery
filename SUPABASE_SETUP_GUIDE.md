# 🐘 SUPABASE SETUP GUIDE - Database PostgreSQL Gratis

## ✅ Connection String Anda
```
postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres
```

## 🚀 Langkah Setup Lengkap

### Langkah 1: Install Node.js (jika belum)
1. **Download Node.js** dari [nodejs.org](https://nodejs.org/)
2. **Install dengan default settings**
3. **Restart terminal/command prompt**
4. **Verify dengan:** `node --version`

### Langkah 2: Buat File .env
Buat file `.env` di root project (sejajar dengan `package.json`) dengan isi:

```env
# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres"

# JWT Configuration (Auto-generated)
JWT_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"

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
NEXTAUTH_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"
```

**⚠️ PENTING:** Ganti `[YOUR-PASSWORD]` dengan password Supabase Anda!

### Langkah 3: Switch ke PostgreSQL Schema
Karena Supabase menggunakan PostgreSQL, kita perlu update schema:

```bash
# Copy schema PostgreSQL
cp prisma/schema-postgres.prisma prisma/schema.prisma
```

### Langkah 4: Install Dependencies
```bash
# Install semua dependencies
npm install
```

### Langkah 5: Generate Prisma Client
```bash
# Generate Prisma client untuk PostgreSQL
npx prisma generate
```

### Langkah 6: Push Schema ke Database
```bash
# Push schema ke Supabase database
npx prisma db push
```

### Langkah 7: Test Database Connection
```bash
# Test koneksi database
node scripts/test-db.js
```

### Langkah 8: Run Aplikasi
```bash
# Start development server
npm run dev
```

## ✅ Expected Results

Setelah setup lengkap:
- ✅ "Database connected successfully"
- ✅ "Connected to: db.ygqnzarecrqkzcjoayvk.supabase.co"
- ✅ API `/api/product` working
- ✅ No more 500 errors
- ✅ Website accessible di http://localhost:3000

## 🚨 Troubleshooting

### Error: "npm not recognized"
1. Install Node.js dari [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Try again

### Error: "Database connection failed"
1. **Check password di connection string:**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres
   ```
   Ganti `[YOUR-PASSWORD]` dengan password Supabase Anda!

2. **Check Supabase dashboard:**
   - Database status: Active
   - Connection string: Valid
   - SSL: Enabled

3. **Check file .env:**
   - File ada di root project
   - Format benar
   - Password sudah diganti

### Error: "Schema push failed"
1. Check Supabase connection string
2. Verify database exists
3. Check internet connection

### Error: "Access denied"
1. Check password di connection string
2. Regenerate connection string di Supabase
3. Update DATABASE_URL di .env

## 📋 Checklist Setup

- [ ] Node.js terinstall
- [ ] File `.env` dibuat di root project
- [ ] `DATABASE_URL` di-update dengan connection string Supabase
- [ ] Password `[YOUR-PASSWORD]` sudah diganti
- [ ] Schema PostgreSQL di-copy: `cp prisma/schema-postgres.prisma prisma/schema.prisma`
- [ ] Dependencies di-install: `npm install`
- [ ] Prisma client di-generate: `npx prisma generate`
- [ ] Schema di-push: `npx prisma db push`
- [ ] Database connection test berhasil: `node scripts/test-db.js`
- [ ] Aplikasi di-run: `npm run dev`

## 🎯 Quick Commands (Setelah Install Node.js)

```bash
# Setup lengkap dalam satu baris
npm install && cp prisma/schema-postgres.prisma prisma/schema.prisma && npx prisma generate && npx prisma db push && node scripts/test-db.js && npm run dev
```

## 🔍 Debug Commands

```bash
# Test database connection
node scripts/test-db.js

# Check environment variables
node -e "console.log(process.env.DATABASE_URL)"

# Check Prisma schema
npx prisma validate
```

## 📞 Need Help?

1. Check Supabase dashboard untuk status database
2. Verify connection string format
3. Run `node scripts/test-db.js` untuk debug
4. Check terminal logs untuk error details

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Node.js Download](https://nodejs.org/)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Setelah setup lengkap, aplikasi akan berjalan tanpa error "database not configured"!**

**Waktu setup: ~10 menit** 