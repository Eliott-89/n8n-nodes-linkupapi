#!/bin/bash

echo "🔧 Correction complète du problème BLANK_VALUE pour API key et password..."

# Nettoyage et build
rm -rf dist node_modules package-lock.json
npm install
npm run build

# Commit et push
git add .
git commit -m "Complete fix for BLANK_VALUE issue - support custom API key and password"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.0.3 publiée avec correction complète!"
echo "📦 Package: n8n-nodes-linkup-clean@1.0.3"
echo ""
echo "✅ Nouvelles fonctionnalités:"
echo "- Champ API Key personnalisé"
echo "- Champ Password personnalisé"
echo "- Détection automatique des valeurs BLANK"
echo "- Messages d'erreur clairs"
echo ""
echo "🎯 Utilisation:"
echo "1. Dans le node LINKUP, activez 'Use Custom Credentials'"
echo "2. Entrez votre API key LINKUP"
echo "3. Entrez votre email et password LinkedIn"
echo "4. Testez - ça devrait fonctionner parfaitement!"