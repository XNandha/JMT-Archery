# 🚨 QUICK FIX: Database Not Configured Error

## Error yang Terjadi
```
Failed to load resource: the server responded with a status of 500 ()
database not configured
```

## ⚡ Solusi Cepat (5 Menit)

### Langkah 1: Buat File .env
Buat file `.env` di root project (sejajar dengan `package.json`):

```bash
# Di root project, buat file .env
touch .env
```

### Langkah 2: Isi File .env
Copy paste ini ke file `.env`:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"

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
NEXTAUTH_SECRET="your-nextauth-secret"
```

### Langkah 3: Setup PlanetScale Database (Gratis)

#### A. Buat Akun PlanetScale
1. Buka [planetscale.com](https://planetscale.com)
2. Klik **Sign Up** (Gratis)
3. Verifikasi email

#### B. Buat Database
1. Login ke PlanetScale Dashboard
2. Klik **New Database**
3. Isi:
   - **Name:** `jmt-archery`
   - **Region:** Asia Pacific
   - **Plan:** Hobby (Gratis)
4. Klik **Create Database**

#### C. Dapatkan Connection String
1. Klik database `jmt-archery`
2. Tab **Connect** → **Connect with Prisma**
3. **Copy connection string**

#### D. Update .env
Ganti `DATABASE_URL` di file `.env` dengan connection string dari PlanetScale:

```env
DATABASE_URL="mysql://[username]:[password]@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"
```

### Langkah 4: Generate JWT Secret
```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy hasilnya dan ganti `JWT_SECRET` di file `.env`:

```env
JWT_SECRET="[hasil-generate-di-atas]"
```

### Langkah 5: Push Database Schema
```bash
# Install dependencies (jika belum)
npm install

# Push schema ke database
npx prisma db push
```

### Langkah 6: Test Database Connection
```bash
# Test koneksi database
node scripts/test-db.js
```

### Langkah 7: Run Aplikasi
```bash
# Start development server
npm run dev
```

## ✅ Expected Results

Setelah setup:
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ✅ API `/api/product` working
- ✅ No more 500 errors

## 🚨 Jika Masih Error

### Check 1: File .env
```bash
# Pastikan file .env ada di root project
ls -la .env
```

### Check 2: DATABASE_URL Format
```env
# Format yang benar:
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"

# Format yang salah:
DATABASE_URL="mysql://localhost:3306/jmt_archery"
```

### Check 3: PlanetScale Database
- ✅ Database status: Active
- ✅ Connection string: Valid
- ✅ SSL: Enabled

### Check 4: Restart Server
```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

## 🔍 Debug Commands

### Test Database Connection
```bash
node scripts/test-db.js
```

### Check Environment Variables
```bash
# Di Node.js
node -e "console.log(process.env.DATABASE_URL)"
```

### Check Prisma Schema
```bash
npx prisma validate
```

## 📋 Checklist

- [ ] File `.env` dibuat di root project
- [ ] Akun PlanetScale dibuat
- [ ] Database `jmt-archery` dibuat
- [ ] Connection string di-copy dari PlanetScale
- [ ] `DATABASE_URL` di-update di `.env`
- [ ] JWT_SECRET di-generate dan di-set
- [ ] Schema di-push dengan `npx prisma db push`
- [ ] Database connection test berhasil
- [ ] Aplikasi di-restart

## 🎯 Quick Commands

```bash
# 1. Buat .env
echo 'DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"' > .env

# 2. Generate JWT
echo 'JWT_SECRET="'$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")'"' >> .env

# 3. Install & setup
npm install
npx prisma db push

# 4. Test & run
node scripts/test-db.js
npm run dev
```

## 📞 Need Help?

1. Check `PLANETSCALE_SETUP.md` untuk panduan lengkap
2. Verify PlanetScale database status
3. Check file `.env` format
4. Review error logs di terminal

**Error "database not configured" akan hilang setelah DATABASE_URL diset dengan benar!** 