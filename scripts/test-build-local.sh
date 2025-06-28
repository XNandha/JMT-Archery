#!/bin/bash

echo "🧪 Testing local build without database connection..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Generate Prisma client (this should work without DATABASE_URL)
echo "🔧 Generating Prisma client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Run TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found"
    exit 1
fi

# Build the application (should work without DATABASE_URL now)
echo "🏗️ Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your application can be built without database connection!"
    echo ""
    echo "Next steps:"
    echo "1. Setup PlanetScale database"
    echo "2. Add DATABASE_URL to Vercel environment variables"
    echo "3. Deploy to Vercel"
    echo "4. Test runtime database connection"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 