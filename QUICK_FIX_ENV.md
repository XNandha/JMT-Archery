# ⚡ Quick Fix: Environment Variables Error

## 🚨 Error yang Terjadi
```
PrismaClientInitializationError: Environment variable not found: DATABASE_URL
```

## 🚀 Solusi Cepat (5 Menit)

### Langkah 1: Generate JWT Secret
```bash
npm run generate-secrets
```

### Langkah 2: Setup PlanetScale Database
1. Buka [planetscale.com](https://planetscale.com)
2. Buat database baru: `jmt-archery`
3. Klik **Connect** → **Connect with Prisma**
4. Copy connection string

### Langkah 3: Setup Vercel Environment Variables
1. Buka [vercel.com](https://vercel.com)
2. Pilih project **JMT-Archery**
3. Settings → Environment Variables
4. Tambahkan:

```
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
JWT_SECRET=your-generated-secret-from-step-1
```

### Langkah 4: Redeploy
1. Klik **Save** di environment variables
2. Vercel akan otomatis redeploy
3. Tunggu 2-3 menit

## ✅ Expected Results
- ✅ Build successful
- ✅ "Database connected successfully" di logs
- ✅ Website accessible
- ✅ API endpoints working

## 🔍 Jika Masih Error

### Check Vercel Logs:
1. Vercel Dashboard → Deployments
2. Klik deployment terbaru
3. Check Function Logs

### Common Issues:
1. **DATABASE_URL format salah** - Pastikan format PlanetScale
2. **JWT_SECRET kosong** - Generate ulang dengan `npm run generate-secrets`
3. **Database belum dibuat** - Buat database di PlanetScale dulu

## 📞 Need Help?
1. Check `VERCEL_ENV_SETUP.md` untuk panduan lengkap
2. Verify PlanetScale database status
3. Check Vercel environment variables 