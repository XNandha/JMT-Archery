# 🚨 Troubleshooting Deployment

## Error yang Sering Terjadi

### 1. Build Error: TypeScript Errors

**Error:**
```
Failed to compile.
Type error: Route has an invalid export
```

**Solusi:**
1. **Update API Routes** - Pastikan menggunakan format Next.js 15:
   ```typescript
   // ❌ Wrong (Next.js 14)
   export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
   
   // ✅ Correct (Next.js 15)
   export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }
   ```

2. **Test Build Lokal:**
   ```bash
   npm run test-build
   ```

### 2. Prisma Client Error

**Error:**
```
Prisma Client is not generated
```

**Solusi:**
1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Update vercel.json:**
   ```json
   {
     "buildCommand": "npx prisma generate && next build"
   }
   ```

### 3. Environment Variables Missing

**Error:**
```
DATABASE_URL is not defined
```

**Solusi:**
1. **Setup di Vercel Dashboard:**
   - Buka project di Vercel
   - Settings → Environment Variables
   - Tambahkan semua variables dari `env.example`

2. **Required Variables:**
   ```env
   DATABASE_URL="mysql://..."
   JWT_SECRET="your-secret"
   EMAIL_USER="your-email"
   EMAIL_PASS="your-password"
   ```

### 4. Database Connection Error

**Error:**
```
Can't reach database server
```

**Solusi:**
1. **Check DATABASE_URL format:**
   ```
   mysql://username:password@host:port/database
   ```

2. **Test connection:**
   ```bash
   npx prisma db pull
   ```

3. **Setup PlanetScale:**
   - Buat database di PlanetScale
   - Copy connection string
   - Update di Vercel environment variables

### 5. Image Upload Error

**Error:**
```
Image domains not configured
```

**Solusi:**
1. **Update next.config.ts:**
   ```typescript
   images: {
     domains: ['your-domain.com'],
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',
       },
     ],
   }
   ```

2. **Setup Cloudinary:**
   - Daftar di Cloudinary
   - Update environment variables
   - Test upload functionality

## 🔧 Debug Commands

### Test Build Lokal
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# TypeScript check
npx tsc --noEmit

# Build test
npm run build
```

### Test Database Connection
```bash
# Test connection
npx prisma db pull

# Push schema
npx prisma db push

# Generate client
npx prisma generate
```

### Test Environment Variables
```bash
# Check if .env.local exists
ls -la .env.local

# Test with Node.js
node -e "console.log(process.env.DATABASE_URL)"
```

## 🚨 Common Issues & Solutions

### Issue 1: Build Timeout
**Solution:**
- Update `vercel.json`:
  ```json
  {
    "functions": {
      "src/app/api/**/*.ts": {
        "maxDuration": 30
      }
    }
  }
  ```

### Issue 2: Memory Limit
**Solution:**
- Optimize images
- Reduce bundle size
- Use dynamic imports

### Issue 3: Cold Start
**Solution:**
- Use connection pooling
- Optimize database queries
- Enable Vercel Edge Functions

### Issue 4: CORS Error
**Solution:**
- Add CORS headers in API routes
- Update allowed origins

## 📊 Monitoring & Debugging

### Vercel Logs
1. Buka Vercel Dashboard
2. Pilih project
3. Functions → View Function Logs
4. Check for errors

### Database Logs
1. PlanetScale Dashboard
2. Database → Queries
3. Check connection logs

### Performance Monitoring
1. Vercel Analytics
2. Core Web Vitals
3. Function execution time

## 🔄 Rollback Strategy

### Quick Rollback
1. **Vercel Dashboard:**
   - Deployments → Previous deployment
   - Click "Redeploy"

2. **Git Rollback:**
   ```bash
   git revert HEAD
   git push origin main
   ```

### Database Rollback
1. **PlanetScale:**
   - Database → Branches
   - Create new branch from previous state

## 📞 Getting Help

### 1. Check Logs
- Vercel Function Logs
- Database Query Logs
- Browser Console

### 2. Common Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### 3. Community Support
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Prisma GitHub](https://github.com/prisma/prisma)

## ✅ Pre-Deployment Checklist

- [ ] Local build successful (`npm run build`)
- [ ] TypeScript check passed (`npx tsc --noEmit`)
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Image upload working
- [ ] API routes tested
- [ ] Authentication working
- [ ] Payment flow tested (if applicable)

## 🎯 Post-Deployment Checklist

- [ ] Website accessible
- [ ] Database connected
- [ ] User registration working
- [ ] Login working
- [ ] Product display working
- [ ] Cart functionality working
- [ ] Image upload working
- [ ] Payment processing working
- [ ] Email sending working
- [ ] Mobile responsive
- [ ] Performance acceptable 