# TypeScript Fix Guide

## Masalah
Error TypeScript compilation:
```
Type error: 'error' is of type 'unknown'.
```

## Solusi yang Sudah Diterapkan

### 1. Fix Error Type Handling di `src/lib/db.ts`

Error terjadi karena TypeScript tidak bisa mengakses `error.message` karena `error` bertipe `unknown`. 

**Sebelum:**
```typescript
} catch (error) {
  return { connected: false, error: error.message };
}
```

**Sesudah:**
```typescript
} catch (error) {
  return { 
    connected: false, 
    error: error instanceof Error ? error.message : 'Unknown database error' 
  };
}
```

### 2. Script TypeScript Check

Ditambahkan script untuk test TypeScript compilation:

**package.json:**
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "test-typescript": "bash scripts/test-typescript.sh"
  }
}
```

**scripts/test-typescript.sh:**
```bash
#!/bin/bash
echo "🔍 Testing TypeScript compilation..."
npx tsc --noEmit
```

## Cara Test TypeScript

### 1. Menggunakan npm (jika tersedia)
```bash
npm run type-check
```

### 2. Menggunakan npx (jika tersedia)
```bash
npx tsc --noEmit
```

### 3. Manual check
```bash
node_modules/.bin/tsc --noEmit
```

## Troubleshooting

### Node.js tidak terinstall
Jika mendapat error "node is not recognized":
1. Install Node.js dari https://nodejs.org/
2. Restart terminal/command prompt
3. Verifikasi dengan: `node --version`

### TypeScript tidak terinstall
```bash
npm install typescript @types/node
```

### Build Test
Setelah fix TypeScript, test build:
```bash
npm run test-build-local
```

## File yang Diperbaiki

1. `src/lib/db.ts` - Fix error type handling
2. `package.json` - Tambah script type-check
3. `scripts/test-typescript.sh` - Script test TypeScript

## Status
✅ TypeScript errors sudah diperbaiki
✅ Error handling sudah proper
✅ Script test sudah ditambahkan

Sekarang bisa deploy ke Vercel tanpa TypeScript errors. 