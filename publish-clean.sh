#!/bin/bash

echo "🚀 Création d'un nouveau package propre..."

# Nettoyage complet
echo "🧹 Nettoyage total..."
rm -rf dist node_modules package-lock.json

# Vérification qu'on a seulement les bons fichiers
echo "📋 Fichiers dans le projet:"
find . -name "*.ts" -o -name "*.js" -o -name "*.json" | grep -v node_modules | grep -v .git

# Vérification du contenu du node
echo "🔍 Contenu du node TypeScript:"
echo "=== Linkup.node.ts (premières lignes) ==="
head -15 nodes/Linkup/Linkup.node.ts

# Installation propre
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

# Vérification du contenu du dist
echo "📋 Contenu du répertoire dist après build:"
find dist -type f -name "*.js" -exec echo "=== {} ===" \; -exec head -5 {} \;

# Vérification qu'il n'y a pas de références problématiques
echo "🔍 Vérification des références..."
grep -r "linkup-sdk" dist/ && echo "❌ ERREUR: référence à linkup-sdk trouvée!" && exit 1
grep -r "GenericFunctions" dist/ && echo "❌ ERREUR: référence à GenericFunctions trouvée!" && exit 1
echo "✅ Pas de références problématiques"

# Test du package localement
echo "🧪 Test du package local..."
npm pack
tar -tzf n8n-nodes-linkup-api-*.tgz | head -10

# Commit et push
echo "📤 Commit et push..."
git add .
git commit -m "New clean package: n8n-nodes-linkup-api"
git push origin main

# Publication
echo "📦 Publication du nouveau package..."
npm publish

echo ""
echo "🎉 Nouveau package publié avec succès!"
echo "📦 Nouveau nom: n8n-nodes-linkup-api"
echo "📦 URL: https://www.npmjs.com/package/n8n-nodes-linkup-api"
echo ""
echo "🎯 Installation dans n8n:"
echo "Settings > Community Nodes > Install > n8n-nodes-linkup-api"
echo ""
echo "✅ Ce nouveau package est complètement propre et ne contient que notre code!"

# Nettoyage
rm -f n8n-nodes-linkup-api-*.tgz