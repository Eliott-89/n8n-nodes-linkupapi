#!/bin/bash

echo "🔧 Correction finale et déploiement..."

# Build du projet
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Commit et push les corrections
echo "📤 Commit et push des corrections..."
git add .
git commit -m "Fix final TypeScript error - nodeVersion hardcoded"

# Pousser vers la bonne branche
echo "📡 Push vers GitHub..."
git push origin main

# Publier sur npm
echo "📦 Publication sur npm..."
npm publish

echo ""
echo "🎉 SUCCÈS! Package publié avec succès!"
echo "🔗 GitHub: https://github.com/Eliott-89/n8n-nodes-linkup"
echo "📦 NPM: https://www.npmjs.com/package/n8n-nodes-linkup"
echo ""
echo "🎯 Installation dans n8n:"
echo "Settings > Community Nodes > Install > n8n-nodes-linkup"
echo ""
echo "🔧 Prochaines étapes pour tester:"
echo "1. Ouvrez n8n"
echo "2. Allez dans Settings > Community Nodes"
echo "3. Cliquez sur 'Install'"
echo "4. Entrez: n8n-nodes-linkup"
echo "5. Le node LINKUP apparaîtra dans votre palette!"