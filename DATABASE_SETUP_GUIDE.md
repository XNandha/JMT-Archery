# 🗄️ DATABASE SETUP GUIDE - Mengatasi "Database Not Configured"

## 🚨 Error yang Terjadi
```
Failed to load resource: the server responded with a status of 500 ()
database not configured
```

**Penyebab:** Database belum di-setup dan DATABASE_URL belum dikonfigurasi

## ✅ Solusi Lengkap

### Langkah 1: Setup PlanetScale Database (Gratis)

#### A. Buat Akun PlanetScale
1. **Buka [planetscale.com](https://planetscale.com)**
2. **Klik Sign Up** (Gratis)
3. **Verifikasi email**

#### B. Buat Database
1. **Login ke PlanetScale Dashboard**
2. **Klik New Database**
3. **Isi form:**
   - **Name:** `jmt-archery`
   - **Region:** Asia Pacific (terdekat)
   - **Plan:** Hobby (Gratis)
4. **Klik Create Database**

#### C. Dapatkan Connection String
1. **Klik database `jmt-archery`**
2. **Klik tab Connect**
3. **Pilih Connect with Prisma**
4. **Copy connection string**

**Format yang benar:**
```
mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
```

### Langkah 2: Buat File .env

Buat file `.env` di root project (sejajar dengan `package.json`) dengan isi:

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

**⚠️ PENTING:** Ganti `DATABASE_URL` dengan connection string dari PlanetScale!

### Langkah 3: Install Node.js (jika belum)

1. **Download Node.js** dari [nodejs.org](https://nodejs.org/)
2. **Install dengan default settings**
3. **Restart terminal/command prompt**
4. **Verify dengan:** `node --version`

### Langkah 4: Setup Database Schema

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push
```

### Langkah 5: Test Database Connection

```bash
# Test koneksi database
node scripts/test-db.js
```

### Langkah 6: Run Aplikasi

```bash
# Start development server
npm run dev
```

## 🔍 Verifikasi Setup

### 1. Check PlanetScale Dashboard
- ✅ Database status: **Active**
- ✅ Connection string: **Valid**
- ✅ SSL: **Enabled**

### 2. Check File .env
- ✅ File `.env` ada di root project
- ✅ `DATABASE_URL` format benar
- ✅ Tidak ada spasi ekstra

### 3. Check Terminal Output
Setelah `npm run dev`:
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ❌ "Database connection failed"

## 🚨 Troubleshooting

### Error: "npm not recognized"
1. Install Node.js dari [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Try again

### Error: "Database connection failed"
1. **Check DATABASE_URL format:**
   ```
   ✅ mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
   ❌ mysql://localhost:3306/jmt_archery
   ```

2. **Check PlanetScale database:**
   - Database status: Active
   - Connection string: Valid
   - SSL: Enabled

3. **Check file .env:**
   - File ada di root project
   - Format benar
   - Tidak ada typo

### Error: "Schema push failed"
1. Check PlanetScale connection string
2. Verify database exists
3. Check internet connection

### Error: "Access denied"
1. Check username/password di connection string
2. Regenerate connection string di PlanetScale
3. Update DATABASE_URL di .env

## 📋 Checklist Setup

- [ ] Akun PlanetScale dibuat
- [ ] Database `jmt-archery` dibuat
- [ ] Connection string di-copy dari PlanetScale
- [ ] File `.env` dibuat di root project
- [ ] `DATABASE_URL` di-update dengan connection string benar
- [ ] Node.js terinstall
- [ ] Dependencies di-install dengan `npm install`
- [ ] Schema di-push dengan `npx prisma db push`
- [ ] Database connection test berhasil
- [ ] Aplikasi di-run dengan `npm run dev`

## 🎯 Expected Results

Setelah setup lengkap:
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ✅ API `/api/product` working
- ✅ No more 500 errors
- ✅ Website accessible
- ✅ Authentication working

## 📞 Need Help?

1. Check `PLANETSCALE_SETUP.md` untuk panduan detail
2. Check `QUICK_DATABASE_SETUP.md` untuk solusi cepat
3. Run `node scripts/test-db.js` untuk debug
4. Check terminal logs untuk error details

## 🔗 Useful Links

- [PlanetScale Sign Up](https://planetscale.com)
- [Node.js Download](https://nodejs.org/)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Error "database not configured" akan hilang setelah database di-setup dengan benar!**

**Waktu setup: ~10 menit** 