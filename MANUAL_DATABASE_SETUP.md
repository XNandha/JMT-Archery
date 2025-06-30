# 🚨 MANUAL DATABASE SETUP - Tanpa Node.js

## Masalah
- Database tidak terkonfigurasi
- Tabel belum dibuat
- Node.js belum terinstall

## ✅ Solusi Manual (Tanpa Node.js)

### Langkah 1: Buat File .env Manual

Buat file `.env` di root project (sejajar dengan `package.json`) dengan isi:

```env
# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres"

# JWT Configuration
JWT_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"

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
NEXTAUTH_SECRET="8f7d3b2a1e9c6f5d4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0"
```

**⚠️ PENTING:** Ganti `[YOUR-PASSWORD]` dengan password Supabase Anda!

### Langkah 2: Update Schema PostgreSQL

Copy isi dari `prisma/schema-postgres.prisma` ke `prisma/schema.prisma`:

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

### Langkah 3: Install Node.js

1. **Download Node.js** dari [nodejs.org](https://nodejs.org/)
2. **Install dengan default settings**
3. **Restart terminal/command prompt**
4. **Verify dengan:** `node --version`

### Langkah 4: Setup Database (Setelah Install Node.js)

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema ke database (membuat tabel)
npx prisma db push

# Test connection
node scripts/test-db.js
```

### Langkah 5: Run Aplikasi

```bash
# Start development server
npm run dev
```

## 🚨 Troubleshooting

### Error: "Database connection failed"
1. **Check password di file .env:**
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ygqnzarecrqkzcjoayvk.supabase.co:5432/postgres"
   ```
   Ganti `[YOUR-PASSWORD]` dengan password Supabase Anda!

2. **Check Supabase dashboard:**
   - Database status: Active
   - Connection string: Valid
   - SSL: Enabled

### Error: "Schema push failed"
1. Check Supabase connection string
2. Verify database exists
3. Check internet connection

### Error: "npm not recognized"
1. Install Node.js dari [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Try again

## 📋 Checklist Manual

- [ ] File `.env` dibuat dengan connection string Supabase
- [ ] Password `[YOUR-PASSWORD]` sudah diganti
- [ ] Schema PostgreSQL di-copy ke `prisma/schema.prisma`
- [ ] Node.js terinstall (`node --version`)
- [ ] Dependencies di-install (`npm install`)
- [ ] Prisma client di-generate (`npx prisma generate`)
- [ ] Schema di-push ke database (`npx prisma db push`)
- [ ] Database connection test berhasil (`node scripts/test-db.js`)
- [ ] Aplikasi di-run (`npm run dev`)

## 🎯 Expected Results

Setelah setup lengkap:
- ✅ "Database connected successfully"
- ✅ "Connected to: db.ygqnzarecrqkzcjoayvk.supabase.co"
- ✅ Tabel User, Product, Cart, Order, dll terbuat
- ✅ API `/api/product` working
- ✅ No more 500 errors
- ✅ Website accessible di http://localhost:3000

## 📞 Need Help?

1. Check Supabase dashboard untuk status database
2. Verify connection string format
3. Check terminal logs untuk error details
4. Pastikan password Supabase sudah diganti

---

**Setelah setup lengkap, database akan terkonfigurasi dan tabel akan terbuat!** 