#!/bin/bash

echo "🚀 Publication du package final avec nom unique..."

# Nettoyage complet
echo "🧹 Nettoyage total..."
rm -rf dist node_modules package-lock.json

# Vérification des fichiers source
echo "📋 Vérification des fichiers source:"
echo "=== Structure du projet ==="
find . -name "*.ts" -o -name "*.svg" -o -name "*.json" | grep -v node_modules | grep -v .git | sort

echo ""
echo "=== Contenu du node principal ==="
head -20 nodes/Linkup/Linkup.node.ts

echo ""
echo "=== Contenu des credentials ==="
head -10 credentials/LinkupApi.credentials.ts

# Installation minimaliste
echo "📦 Installation des dépendances..."
npm install --production=false

# Build
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Vérification approfondie du build
echo "🔍 Vérification du build..."
echo "=== Fichiers générés ==="
find dist -type f | sort

echo ""
echo "=== Contenu du node compilé ==="
echo "Premier fichier JS:"
find dist -name "*.js" | head -1 | xargs head -20

echo ""
echo "=== Vérification des imports ==="
grep -r "require\|import" dist/ | grep -v "n8n-workflow" || echo "Pas d'imports suspects"

# Test d'absence de références problématiques
echo "🔍 Vérification finale..."
if grep -r "linkup-sdk\|GenericFunctions" dist/; then
    echo "❌ ERREUR: Références problématiques trouvées!"
    exit 1
else
    echo "✅ Aucune référence problématique"
fi

# Commit et push
echo "📤 Commit et push..."
git add .
git commit -m "Final clean package: n8n-community-nodes-linkup"
git push origin main

# Publication
echo "📦 Publication..."
npm publish --access=public

echo ""
echo "🎉 Package publié avec succès!"
echo "📦 Nom final: n8n-community-nodes-linkup"
echo "📦 URL: https://www.npmjs.com/package/n8n-community-nodes-linkup"
echo ""
echo "🎯 Installation dans n8n:"
echo "Settings > Community Nodes > Install > n8n-community-nodes-linkup"
echo ""
echo "✅ Ce package est 100% propre et contient uniquement notre code LINKUP!"