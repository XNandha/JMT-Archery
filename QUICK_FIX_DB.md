# ⚡ Quick Fix: Database Connection Error

## 🚨 Error yang Terjadi
```
Can't reach database server at `localhost:3306`
```

## 🚀 Solusi Cepat (10 Menit)

### Langkah 1: Setup PlanetScale Database
1. **Buka [planetscale.com](https://planetscale.com)**
2. **Sign Up** (Gratis)
3. **Buat Database:**
   - Name: `jmt-archery`
   - Region: Asia Pacific
   - Plan: Hobby (Gratis)

### Langkah 2: Dapatkan Connection String
1. Klik database `jmt-archery`
2. Tab **Connect** → **Connect with Prisma**
3. **Copy connection string**

**Format yang benar:**
```
mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
```

### Langkah 3: Setup Vercel Environment Variables
1. **Buka [vercel.com](https://vercel.com)**
2. Pilih project **JMT-Archery**
3. **Settings** → **Environment Variables**
4. **Add New:**

```
Name: DATABASE_URL
Value: [paste connection string dari PlanetScale]
Environment: Production, Preview, Development
```

### Langkah 4: Generate JWT Secret
```bash
npm run generate-secrets
```

**Tambahkan JWT_SECRET di Vercel:**
```
Name: JWT_SECRET
Value: [hasil dari generate-secrets]
Environment: Production, Preview, Development
```

### Langkah 5: Push Database Schema
```bash
# Install PlanetScale CLI
npm install -g pscale

# Login
pscale auth login

# Push schema
npx prisma db push
```

### Langkah 6: Redeploy
1. **Save** environment variables di Vercel
2. Vercel akan otomatis redeploy
3. Tunggu 2-3 menit

## ✅ Expected Results

Setelah setup:
- ✅ Build successful
- ✅ "Database connected successfully"
- ✅ "Connected to: aws.connect.psdb.cloud"
- ✅ Website accessible
- ✅ API endpoints working

## 🔍 Test Database Connection

### Test Lokal (jika ada .env.local):
```bash
npm run test-db
```

### Test di Vercel:
1. Vercel Dashboard → Deployments
2. Klik deployment terbaru
3. Check Function Logs

## 🚨 Jika Masih Error

### Check Vercel Environment Variables:
- ✅ `DATABASE_URL` ada dan tidak kosong
- ✅ Format: `mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict`
- ✅ Set untuk Production environment

### Check PlanetScale:
- ✅ Database status: Active
- ✅ Connection string: Valid
- ✅ SSL: Enabled

### Common Issues:
1. **Wrong format** - Pastikan format PlanetScale, bukan localhost
2. **Not saved** - Pastikan klik Save di Vercel
3. **Not redeployed** - Vercel harus redeploy setelah save

## 📞 Need Help?

1. Check `PLANETSCALE_SETUP.md` untuk panduan lengkap
2. Verify PlanetScale database status
3. Check Vercel environment variables
4. Review Vercel Function Logs 