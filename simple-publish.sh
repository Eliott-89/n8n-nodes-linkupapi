#!/bin/bash

echo "🚀 Publication simple du package..."

# Nettoyage
rm -rf dist node_modules package-lock.json

# Installation et build
npm install
npm run build

# Vérification que le build a marché
if [ ! -f "dist/nodes/Linkup/Linkup.node.js" ]; then
    echo "❌ Erreur: fichier node.js non trouvé"
    exit 1
fi

echo "✅ Build réussi, fichiers générés:"
ls -la dist/nodes/Linkup/

# Publication
echo "📦 Publication sur npm..."
npm publish

echo "🎉 Terminé! Package publié sur npm"
echo "📦 Nom: n8n-nodes-linkup-clean"
echo "🔗 URL: https://www.npmjs.com/package/n8n-nodes-linkup-clean"