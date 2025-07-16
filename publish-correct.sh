#!/bin/bash

echo "🚀 Publication avec le bon format de nom..."

# Nettoyage complet
echo "🧹 Nettoyage total..."
rm -rf dist node_modules package-lock.json

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Build
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Vérification finale
echo "🔍 Vérification finale..."
if grep -r "linkup-sdk\|GenericFunctions" dist/; then
    echo "❌ ERREUR: Références problématiques trouvées!"
    exit 1
else
    echo "✅ Package propre"
fi

# Commit et push
echo "📤 Commit et push..."
git add .
git commit -m "Clean package with correct naming: n8n-nodes-linkup-clean"
git push origin main

# Publication
echo "📦 Publication..."
npm publish

echo ""
echo "🎉 Package publié avec succès!"
echo "📦 Nom: n8n-nodes-linkup-clean"
echo "📦 URL: https://www.npmjs.com/package/n8n-nodes-linkup-clean"
echo ""
echo "🎯 Dans n8n, installez: n8n-nodes-linkup-clean"