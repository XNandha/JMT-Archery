# 🆓 FREE DATABASE ALTERNATIVES - Pengganti PlanetScale

## 🚨 Masalah
PlanetScale sekarang berbayar, jadi kita perlu alternatif database gratis

## ✅ Database Gratis yang Bisa Digunakan

### 1. 🐘 **Supabase (RECOMMENDED)**
**Keunggulan:**
- ✅ Gratis selamanya (500MB database)
- ✅ PostgreSQL (lebih powerful dari MySQL)
- ✅ Built-in authentication
- ✅ Real-time features
- ✅ Dashboard yang bagus
- ✅ Easy setup

**Setup:**
1. Buka [supabase.com](https://supabase.com)
2. Sign Up (Gratis)
3. New Project
4. Copy connection string

### 2. 🗄️ **Neon (PostgreSQL)**
**Keunggulan:**
- ✅ Gratis selamanya (3GB storage)
- ✅ PostgreSQL serverless
- ✅ Branching seperti Git
- ✅ Auto-scaling

**Setup:**
1. Buka [neon.tech](https://neon.tech)
2. Sign Up (Gratis)
3. Create Project
4. Copy connection string

### 3. 🐘 **Railway (PostgreSQL)**
**Keunggulan:**
- ✅ Gratis untuk development ($5 credit)
- ✅ Easy deployment
- ✅ PostgreSQL
- ✅ Good performance

**Setup:**
1. Buka [railway.app](https://railway.app)
2. Sign Up (Gratis)
3. New Project → Database
4. Copy connection string

### 4. 🗄️ **Clever Cloud (MySQL)**
**Keunggulan:**
- ✅ Gratis untuk development
- ✅ MySQL (kompatibel dengan Prisma)
- ✅ European hosting

**Setup:**
1. Buka [clever-cloud.com](https://clever-cloud.com)
2. Sign Up (Gratis)
3. Create MySQL database
4. Copy connection string

## 🚀 Quick Setup dengan Supabase (Paling Mudah)

### Langkah 1: Buat Akun Supabase
1. **Buka [supabase.com](https://supabase.com)**
2. **Klik Sign Up** (Gratis)
3. **Verifikasi email**

### Langkah 2: Buat Project
1. **Klik New Project**
2. **Isi form:**
   - **Name:** `jmt-archery`
   - **Database Password:** (buat password kuat)
   - **Region:** Asia Pacific (Singapore)
3. **Klik Create new project**

### Langkah 3: Dapatkan Connection String
1. **Klik project `jmt-archery`**
2. **Settings** → **Database**
3. **Copy connection string**

**Format Supabase:**
```
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Langkah 4: Update Prisma Schema untuk PostgreSQL

Karena Supabase menggunakan PostgreSQL, kita perlu update schema. Buat file `prisma/schema-postgres.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserActivityType {
  SIGNIN
  PASSWORD_CHANGE
}

model User {
  id             Int         @id @default(autoincrement())
  email          String      @unique
  password       String
  name           String?
  address        String?
  profilePicture String?
  isAdmin        Boolean     @default(false)
  isActive       Boolean     @default(true)
  birthDate      DateTime?
  phone          String?     @unique
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
  logins         UserLogin[]
  carts          Cart[]
  orders         Order[]
  addresses      Address[]
}

model UserLogin {
  id          Int              @id @default(autoincrement())
  userId      Int
  loginTime   DateTime         @default(now())
  ipAddress   String?
  userAgent   String?
  activity    UserActivityType
  oldPassword String?
  waktu       DateTime         @default(now())
  user        User             @relation(fields: [userId], references: [id])
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Int
  stock       Int
  image       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  carts       Cart[]
  orderItems  OrderItem[]
}

model Cart {
  id          Int      @id @default(autoincrement())
  userId      Int
  productId   Int
  quantity    Int      @default(1)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  product     Product  @relation(fields: [productId], references: [id])
}

model Order {
  id          Int         @id @default(autoincrement())
  userId      Int
  totalAmount Int
  status      String      @default("pending")
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[] 
  payments    Payment[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Int

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

model Address {
  id        Int    @id @default(autoincrement())
  userId    Int
  label     String
  address   String
  city      String
  province  String
  postal    String
  phone     String
  user      User   @relation(fields: [userId], references: [id])
}

model Payment {
  id              Int       @id @default(autoincrement())
  orderId         Int
  amount          Int
  method          String
  bank            String?
  status          String    @default("pending")
  transactionId   String?   @unique
  gatewayResponse String?
  verificationCode String?
  paidAt          DateTime?
  expiresAt       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  order           Order     @relation(fields: [orderId], references: [id])
}
```

### Langkah 5: Setup Environment Variables

Buat file `.env` dengan connection string Supabase:

```env
# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

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

### Langkah 6: Deploy Schema

```bash
# Copy schema PostgreSQL
cp prisma/schema-postgres.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push
```

## 🗄️ Alternatif: Tetap Pakai MySQL (Clever Cloud)

Jika ingin tetap pakai MySQL, gunakan Clever Cloud:

### Setup Clever Cloud:
1. **Buka [clever-cloud.com](https://clever-cloud.com)**
2. **Sign Up** (Gratis)
3. **Add a service** → **MySQL**
4. **Copy connection string**

**Format Clever Cloud:**
```
mysql://[username]:[password]@[host]:[port]/[database]
```

**Tidak perlu ubah schema, tetap pakai MySQL!**

## 🔍 Verifikasi Setup

### Test Database Connection:
```bash
# Test koneksi
node scripts/test-db.js
```

### Expected Output:
```
✅ Database connected successfully!
📊 Products in database: 0
👥 Users in database: 0
🎉 All database tests passed!
```

## 📋 Checklist Setup

- [ ] Pilih database provider (Supabase/Neon/Railway/Clever Cloud)
- [ ] Buat akun dan project
- [ ] Copy connection string
- [ ] Update file `.env`
- [ ] Update schema (jika PostgreSQL)
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Test connection dengan `node scripts/test-db.js`
- [ ] Run aplikasi dengan `npm run dev`

## 🎯 Recommendation

**Untuk development sementara, saya rekomendasikan:**

1. **Supabase** - Paling mudah setup, gratis selamanya
2. **Neon** - PostgreSQL serverless, gratis selamanya
3. **Clever Cloud** - Jika ingin tetap pakai MySQL

## 📞 Need Help?

1. Check dokumentasi provider yang dipilih
2. Run `node scripts/test-db.js` untuk debug
3. Check terminal logs untuk error details

---

**Pilih salah satu database gratis di atas, setup sesuai panduan, dan aplikasi akan berjalan tanpa error!** 