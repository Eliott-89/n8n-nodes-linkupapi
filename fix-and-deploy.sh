#!/bin/bash

echo "🔧 Correction des erreurs et déploiement..."

# Corriger le remote GitHub
echo "📡 Correction du remote GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Eliott-89/n8n-nodes-linkup.git

# Nettoyer et réinstaller les dépendances
echo "🧹 Nettoyage et réinstallation..."
rm -rf node_modules package-lock.json dist
npm install

# Build du projet
echo "🔨 Build du projet..."
npm run build

# Commit et push les corrections
echo "📤 Commit et push des corrections..."
git add .
git commit -m "Fix TypeScript errors and update dependencies"
git push -u origin master

# Publier sur npm
echo "📦 Publication sur npm..."
npm publish

echo ""
echo "✅ Tout est corrigé et publié!"
echo "🔗 GitHub: https://github.com/Eliott-89/n8n-nodes-linkup"
echo "📦 NPM: https://www.npmjs.com/package/n8n-nodes-linkup"
echo ""
echo "🎯 Le package est maintenant disponible dans n8n:"
echo "Settings > Community Nodes > n8n-nodes-linkup"