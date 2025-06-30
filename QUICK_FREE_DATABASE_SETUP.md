# ⚡ QUICK SETUP: Database Gratis (Pengganti PlanetScale)

## 🚨 Masalah
PlanetScale sekarang berbayar, jadi kita perlu database gratis

## 🎯 Solusi Super Cepat (Pilih 1)

### Opsi 1: 🐘 Supabase (RECOMMENDED - Paling Mudah)

#### Langkah 1: Buat Akun Supabase
1. **Buka [supabase.com](https://supabase.com)**
2. **Sign Up** (Gratis)
3. **Verifikasi email**

#### Langkah 2: Buat Project
1. **Klik New Project**
2. **Isi:**
   - Name: `jmt-archery`
   - Database Password: (buat password kuat)
   - Region: Asia Pacific (Singapore)
3. **Create new project**

#### Langkah 3: Dapatkan Connection String
1. **Klik project `jmt-archery`**
2. **Settings** → **Database**
3. **Copy connection string**

#### Langkah 4: Setup Aplikasi
```bash
# 1. Buat file .env
npm run setup-env

# 2. Update DATABASE_URL di .env dengan connection string Supabase
# Format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# 3. Switch ke PostgreSQL schema
cp prisma/schema-postgres.prisma prisma/schema.prisma

# 4. Setup database
npm install
npx prisma generate
npx prisma db push

# 5. Test & run
node scripts/test-db.js
npm run dev
```

---

### Opsi 2: 🗄️ Clever Cloud (MySQL - Tidak Perlu Ubah Schema)

#### Langkah 1: Buat Akun Clever Cloud
1. **Buka [clever-cloud.com](https://clever-cloud.com)**
2. **Sign Up** (Gratis)
3. **Verifikasi email**

#### Langkah 2: Buat MySQL Database
1. **Add a service** → **MySQL**
2. **Isi form database**
3. **Copy connection string**

#### Langkah 3: Setup Aplikasi
```bash
# 1. Buat file .env
npm run setup-env

# 2. Update DATABASE_URL di .env dengan connection string Clever Cloud
# Format: mysql://[username]:[password]@[host]:[port]/[database]

# 3. Setup database (tidak perlu ubah schema)
npm install
npx prisma generate
npx prisma db push

# 4. Test & run
node scripts/test-db.js
npm run dev
```

---

### Opsi 3: 🗄️ Neon (PostgreSQL)

#### Langkah 1: Buat Akun Neon
1. **Buka [neon.tech](https://neon.tech)**
2. **Sign Up** (Gratis)
3. **Verifikasi email**

#### Langkah 2: Buat Project
1. **Create Project**
2. **Isi form project**
3. **Copy connection string**

#### Langkah 3: Setup Aplikasi
```bash
# 1. Buat file .env
npm run setup-env

# 2. Update DATABASE_URL di .env dengan connection string Neon
# Format: postgresql://[username]:[password]@[host]/[database]

# 3. Switch ke PostgreSQL schema
cp prisma/schema-postgres.prisma prisma/schema.prisma

# 4. Setup database
npm install
npx prisma generate
npx prisma db push

# 5. Test & run
node scripts/test-db.js
npm run dev
```

## 🎯 Recommendation

**Untuk development sementara:**

1. **Supabase** - Paling mudah, gratis selamanya
2. **Clever Cloud** - Jika ingin tetap pakai MySQL
3. **Neon** - PostgreSQL serverless

## 📋 Checklist Cepat

- [ ] Pilih provider (Supabase/Clever Cloud/Neon)
- [ ] Buat akun dan project
- [ ] Copy connection string
- [ ] Run `npm run setup-env`
- [ ] Update `DATABASE_URL` di `.env`
- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `node scripts/test-db.js`
- [ ] Run `npm run dev`

## 🚨 Troubleshooting

### Error: "npm not recognized"
1. Install Node.js dari [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Try again

### Error: "Database connection failed"
1. Check `DATABASE_URL` format di `.env`
2. Verify database provider status
3. Run `node scripts/test-db.js`

### Error: "Schema push failed"
1. Check connection string
2. Verify database exists
3. Check internet connection

## 🔍 Debug Commands

```bash
# Check database setup
npm run setup-database

# Test connection
npm run test-db

# Check environment
node -e "console.log(process.env.DATABASE_URL)"
```

## 📞 Need Help?

1. Run `npm run setup-database` untuk panduan lengkap
2. Check `FREE_DATABASE_ALTERNATIVES.md`
3. Check `DATABASE_SETUP_GUIDE.md`
4. Run `npm run test-db` untuk debug

## 🔗 Quick Links

- [Supabase](https://supabase.com) - PostgreSQL gratis
- [Clever Cloud](https://clever-cloud.com) - MySQL gratis
- [Neon](https://neon.tech) - PostgreSQL serverless
- [Node.js](https://nodejs.org/) - Install Node.js

---

**Pilih salah satu database gratis di atas, ikuti langkah-langkah, dan aplikasi akan berjalan tanpa error!**

**Waktu setup: ~5-10 menit** 