# 🔧 Vercel Environment Variables Setup

## 🚨 Error yang Terjadi
```
PrismaClientInitializationError: Invalid prisma.user.findUnique() invocation: 
error: Environment variable not found: DATABASE_URL.
```

## ✅ Solusi: Setup Environment Variables di Vercel

### Langkah 1: Buka Vercel Dashboard
1. Kunjungi [vercel.com](https://vercel.com)
2. Login ke akun Anda
3. Pilih project **JMT-Archery**

### Langkah 2: Buka Environment Variables
1. Klik tab **Settings**
2. Scroll ke bawah, cari **Environment Variables**
3. Klik **Add New**

### Langkah 3: Tambahkan Environment Variables

#### 1. DATABASE_URL (WAJIB)
```
Name: DATABASE_URL
Value: mysql://username:password@host:port/database
Environment: Production, Preview, Development
```

**Contoh untuk PlanetScale:**
```
mysql://username:password@aws.connect.psdb.cloud/jmt_archery?sslaccept=strict
```

#### 2. JWT_SECRET (WAJIB)
```
Name: JWT_SECRET
Value: your-super-secret-jwt-key-here
Environment: Production, Preview, Development
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. EMAIL_USER (Opsional - untuk reset password)
```
Name: EMAIL_USER
Value: your-email@gmail.com
Environment: Production, Preview, Development
```

#### 4. EMAIL_PASS (Opsional - untuk reset password)
```
Name: EMAIL_PASS
Value: your-app-password
Environment: Production, Preview, Development
```

#### 5. CLOUDINARY Variables (Opsional - untuk image upload)
```
Name: CLOUDINARY_CLOUD_NAME
Value: your-cloud-name
Environment: Production, Preview, Development

Name: CLOUDINARY_API_KEY
Value: your-api-key
Environment: Production, Preview, Development

Name: CLOUDINARY_API_SECRET
Value: your-api-secret
Environment: Production, Preview, Development
```

### Langkah 4: Redeploy
1. Setelah menambahkan semua environment variables
2. Klik **Save**
3. Vercel akan otomatis redeploy
4. Atau klik **Redeploy** di tab **Deployments**

## 🗄️ Setup Database (PlanetScale)

### 1. Buat Database di PlanetScale
1. Kunjungi [planetscale.com](https://planetscale.com)
2. Login dan buat database baru
3. Klik **Connect** untuk mendapatkan connection string

### 2. Dapatkan Connection String
1. Klik **Connect** di database
2. Pilih **Connect with Prisma**
3. Copy connection string
4. Paste ke `DATABASE_URL` di Vercel

### 3. Push Database Schema
```bash
# Install PlanetScale CLI
npm install -g pscale

# Login
pscale auth login

# Push schema
npx prisma db push
```

## 🔍 Verifikasi Setup

### 1. Check Environment Variables
Di Vercel Dashboard → Settings → Environment Variables:
- ✅ DATABASE_URL ada dan valid
- ✅ JWT_SECRET ada dan tidak kosong
- ✅ Semua variables set untuk Production

### 2. Check Database Connection
Setelah deploy, cek logs di Vercel:
- ✅ "Database connected successfully"
- ❌ "Database connection failed"

### 3. Test API Endpoints
```bash
# Test database connection
curl https://your-app.vercel.app/api/product

# Test authentication
curl https://your-app.vercel.app/api/auth/me
```

## 🚨 Troubleshooting

### Error: "Database connection failed"
1. **Check DATABASE_URL format:**
   ```
   mysql://username:password@host:port/database
   ```

2. **Check PlanetScale connection:**
   - Database status: Active
   - Connection string: Valid
   - SSL: Enabled

3. **Check Vercel environment:**
   - Variables saved
   - Redeployed after adding variables

### Error: "JWT_SECRET not found"
1. Generate new JWT secret
2. Update di Vercel environment variables
3. Redeploy application

### Error: "Prisma schema not found"
1. Check if `prisma/schema.prisma` exists
2. Run `npx prisma generate` locally
3. Push changes to GitHub

## 📋 Checklist Environment Variables

- [ ] DATABASE_URL (PlanetScale connection string)
- [ ] JWT_SECRET (64-character random string)
- [ ] EMAIL_USER (Gmail address)
- [ ] EMAIL_PASS (Gmail app password)
- [ ] CLOUDINARY_CLOUD_NAME (Cloudinary cloud name)
- [ ] CLOUDINARY_API_KEY (Cloudinary API key)
- [ ] CLOUDINARY_API_SECRET (Cloudinary API secret)

## 🎯 Expected Results

Setelah setup environment variables:
- ✅ Build successful
- ✅ Database connected
- ✅ API endpoints working
- ✅ Authentication working
- ✅ Image upload working (jika Cloudinary setup)

## 📞 Support

Jika masih ada masalah:
1. Check Vercel Function Logs
2. Verify environment variables
3. Test database connection locally
4. Check PlanetScale database status 