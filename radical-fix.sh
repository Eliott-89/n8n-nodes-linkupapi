#!/bin/bash

echo "🔧 Version radicale - suppression complète des credentials..."

# Suppression du dossier credentials du build
rm -rf dist/credentials

# Nettoyage et build
rm -rf dist node_modules package-lock.json
npm install
npm run build

# Vérification
echo "📋 Contenu du package après build:"
find dist -type f | sort

echo "📋 Vérification du node compilé:"
head -20 dist/nodes/Linkup/Linkup.node.js

# Commit et push
git add .
git commit -m "Radical fix: Remove credentials completely, use direct fields in node"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.0.4 - Solution radicale publiée!"
echo "📦 Package: n8n-nodes-linkup-clean@1.0.4"
echo ""
echo "✅ Changements:"
echo "- Suppression complète des credentials"
echo "- Tous les champs directement dans le node"
echo "- Pas de typeOptions password (évite le bug)"
echo "- Interface plus simple et plus fiable"
echo ""
echo "🎯 Utilisation:"
echo "1. Ajoutez le node LINKUP à votre workflow"
echo "2. Entrez directement votre API key"
echo "3. Entrez votre email et password LinkedIn"
echo "4. Ça devrait marcher sans problème de BLANK_VALUE!"