#!/bin/bash

echo "🔧 Correction du problème d'URL et republication..."

# Nettoyage
rm -rf dist node_modules package-lock.json

# Build
npm install
npm run build

# Vérification
echo "✅ URLs corrigées dans le code:"
grep -n "https://api.linkupapi.com" nodes/Linkup/Linkup.node.ts

# Commit et push
git add .
git commit -m "Fix Invalid URL error - use full URLs instead of relative paths"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.0.1 publiée avec les URLs corrigées!"
echo "📦 Package: n8n-nodes-linkup-clean@1.0.1"
echo ""
echo "🔄 Dans n8n:"
echo "1. Désinstallez l'ancienne version"
echo "2. Réinstallez: n8n-nodes-linkup-clean"
echo "3. Ou redémarrez n8n pour forcer la mise à jour"