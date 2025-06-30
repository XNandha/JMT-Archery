#!/bin/bash

echo "🔍 Testing TypeScript compilation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Check if TypeScript is installed
if ! npx tsc --version &> /dev/null; then
    echo "❌ TypeScript is not installed. Installing..."
    npm install typescript @types/node
fi

# Run TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful!"
    echo ""
    echo "🎉 No TypeScript errors found!"
    echo ""
    echo "Next steps:"
    echo "1. Test build: npm run test-build-local"
    echo "2. Deploy to Vercel"
else
    echo "❌ TypeScript compilation failed!"
    echo ""
    echo "Please fix the TypeScript errors above before proceeding."
    exit 1
fi 