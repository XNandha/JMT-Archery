# 🚨 FINAL FIX: Database Not Configured Error

## Error yang Terjadi
```
Failed to load resource: the server responded with a status of 500 ()
database not configured
```

## ⚡ Solusi Super Cepat (3 Langkah)

### Langkah 1: Setup Environment Variables
```bash
# Jalankan script setup otomatis
npm run setup-env
```

Script ini akan:
- ✅ Buat file `.env` otomatis
- ✅ Generate JWT_SECRET otomatis
- ✅ Berikan template yang benar

### Langkah 2: Setup PlanetScale Database (Gratis)

#### A. Buat Akun & Database
1. Buka [planetscale.com](https://planetscale.com)
2. **Sign Up** (Gratis)
3. **New Database**:
   - Name: `jmt-archery`
   - Region: Asia Pacific
   - Plan: Hobby (Gratis)

#### B. Dapatkan Connection String
1. Klik database `jmt-archery`
2. Tab **Connect** → **Connect with Prisma**
3. **Copy connection string**

#### C. Update .env
Edit file `.env` dan ganti `DATABASE_URL`:

```env
# Ganti ini:
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"

# Dengan connection string dari PlanetScale
DATABASE_URL="mysql://[username]:[password]@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict"
```

### Langkah 3: Deploy Database & Run
```bash
# Install dependencies
npm install

# Push schema ke database
npx prisma db push

# Test koneksi
npm run test-db

# Run aplikasi
npm run dev
```

## ✅ Expected Results

Setelah setup:
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ✅ API `/api/product` working
- ✅ No more 500 errors
- ✅ Website accessible

## 🚨 Troubleshooting

### Error: "npm not recognized"
1. Install Node.js dari [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Try again

### Error: "Database connection failed"
1. Check `DATABASE_URL` format di `.env`
2. Verify PlanetScale database status
3. Run `npm run test-db`

### Error: "Schema push failed"
1. Check PlanetScale connection string
2. Verify database exists
3. Check internet connection

## 📋 Quick Checklist

- [ ] Run `npm run setup-env`
- [ ] Buat akun PlanetScale
- [ ] Buat database `jmt-archery`
- [ ] Copy connection string
- [ ] Update `DATABASE_URL` di `.env`
- [ ] Run `npm install`
- [ ] Run `npx prisma db push`
- [ ] Run `npm run test-db`
- [ ] Run `npm run dev`

## 🎯 One-Liner Commands

```bash
# Setup lengkap (setelah buat database PlanetScale)
npm run setup-env && npm install && npx prisma db push && npm run test-db && npm run dev
```

## 📞 Need Help?

1. Check `QUICK_DATABASE_SETUP.md` untuk panduan detail
2. Check `PLANETSCALE_SETUP.md` untuk setup database
3. Run `npm run test-db` untuk debug
4. Check terminal logs untuk error details

## 🔗 Useful Links

- [PlanetScale Sign Up](https://planetscale.com)
- [Node.js Download](https://nodejs.org/)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Error "database not configured" akan hilang setelah DATABASE_URL diset dengan benar!**

**Waktu setup: ~5 menit** 