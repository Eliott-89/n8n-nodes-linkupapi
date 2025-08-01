#!/bin/bash

echo "🔧 Fixing displayOptions dependency issue..."
echo "📦 Building package..."

# Build the package
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Increment version
    echo "📈 Incrementing version..."
    npm version patch
    
    # Get new version
    NEW_VERSION=$(node -p "require('./package.json').version")
    echo "🚀 New version: $NEW_VERSION"
    
    # Publish to npm
    echo "📤 Publishing to npm..."
    npm publish
    
    if [ $? -eq 0 ]; then
        echo "✅ Package published successfully!"
        echo "🎉 Version $NEW_VERSION is now available on npm"
        echo "🔗 https://www.npmjs.com/package/n8n-nodes-linkup-v2"
    else
        echo "❌ Failed to publish package"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi 