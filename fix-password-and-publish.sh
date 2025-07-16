#!/bin/bash

echo "🔧 Correction du problème de mot de passe BLANK..."

# Nettoyage et build
rm -rf dist node_modules package-lock.json
npm install
npm run build

# Commit et push
git add .
git commit -m "Fix password BLANK_VALUE issue - add workaround and better error handling"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.0.2 publiée avec la correction du mot de passe!"
echo "📦 Package: n8n-nodes-linkup-clean@1.0.2"
echo ""
echo "🔄 Solutions pour l'utilisateur:"
echo "1. Réinstaller le package dans n8n"
echo "2. Utiliser l'option 'Use Custom Credentials' si le problème persiste"
echo "3. Entrer le mot de passe directement dans le node"