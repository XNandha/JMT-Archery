# 🗄️ PlanetScale Database Setup Guide

## 🚨 Error yang Terjadi
```
Can't reach database server at `localhost:3306`
```

**Penyebab:** `DATABASE_URL` tidak diset atau salah format

## ✅ Solusi: Setup PlanetScale Database

### Langkah 1: Buat Akun PlanetScale
1. Kunjungi [planetscale.com](https://planetscale.com)
2. Klik **Sign Up** (Gratis)
3. Verifikasi email

### Langkah 2: Buat Database
1. Login ke PlanetScale Dashboard
2. Klik **New Database**
3. Isi:
   - **Name:** `jmt-archery`
   - **Region:** Pilih yang terdekat (Asia Pacific)
   - **Plan:** Hobby (Gratis)
4. Klik **Create Database**

### Langkah 3: Dapatkan Connection String
1. Klik database `jmt-archery` yang baru dibuat
2. Klik tab **Connect**
3. Pilih **Connect with Prisma**
4. Copy connection string yang muncul

**Format yang benar:**
```
mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
```

### Langkah 4: Setup Environment Variables di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Pilih project **JMT-Archery**
3. Settings → Environment Variables
4. Klik **Add New**

**Tambahkan:**
```
Name: DATABASE_URL
Value: mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
Environment: Production, Preview, Development
```

### Langkah 5: Push Database Schema
```bash
# Install PlanetScale CLI
npm install -g pscale

# Login ke PlanetScale
pscale auth login

# Push schema ke database
npx prisma db push
```

### Langkah 6: Redeploy di Vercel
1. Klik **Save** di environment variables
2. Vercel akan otomatis redeploy
3. Tunggu 2-3 menit

## 🔍 Verifikasi Setup

### 1. Check PlanetScale Dashboard
- ✅ Database status: **Active**
- ✅ Connection string: **Valid**
- ✅ SSL: **Enabled**

### 2. Check Vercel Environment Variables
- ✅ `DATABASE_URL` ada dan tidak kosong
- ✅ Format connection string benar
- ✅ Set untuk Production environment

### 3. Check Vercel Logs
Setelah deploy, cek logs:
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ❌ "Database connection failed"

## 🚨 Troubleshooting

### Error: "Can't reach database server"
1. **Check DATABASE_URL format:**
   ```
   ✅ mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
   ❌ mysql://localhost:3306/jmt_archery
   ```

2. **Check PlanetScale database:**
   - Database status: Active
   - Connection string: Valid
   - SSL: Enabled

3. **Check Vercel environment:**
   - Variables saved
   - Redeployed after adding variables

### Error: "Access denied"
1. **Check username/password** di connection string
2. **Regenerate connection string** di PlanetScale
3. **Update DATABASE_URL** di Vercel

### Error: "Database not found"
1. **Check database name** di connection string
2. **Verify database exists** di PlanetScale
3. **Push schema** dengan `npx prisma db push`

## 📋 Checklist Setup

- [ ] Akun PlanetScale dibuat
- [ ] Database `jmt-archery` dibuat
- [ ] Connection string di-copy
- [ ] `DATABASE_URL` ditambahkan di Vercel
- [ ] Schema di-push ke database
- [ ] Vercel di-redeploy
- [ ] Database connected successfully

## 🎯 Expected Results

Setelah setup PlanetScale:
- ✅ Build successful
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ✅ API endpoints working
- ✅ Authentication working

## 📞 Support

Jika masih ada masalah:
1. Check PlanetScale database status
2. Verify connection string format
3. Check Vercel environment variables
4. Review Vercel Function Logs

## 🔗 Useful Links

- [PlanetScale Documentation](https://planetscale.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) 