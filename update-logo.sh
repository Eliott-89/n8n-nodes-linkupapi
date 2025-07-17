#!/bin/bash

echo "🎨 Mise à jour avec le nouveau logo LINKUP..."

# Incrémenter la version
npm version patch

# Nettoyage et build
rm -rf dist node_modules package-lock.json
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi avec le nouveau logo!"
    
    # Vérifier que l'icône est bien incluse
    echo "📋 Vérification de l'icône:"
    ls -la dist/nodes/Linkup/linkup.svg
    
    # Commit et push
    git add .
    git commit -m "Update with new LINKUP logo - v$(npm version --json | jq -r '.\"n8n-nodes-linkup-clean\"')"
    git push origin main
    
    # Publication
    npm publish
    
    echo ""
    echo "🎉 Nouvelle version publiée avec le logo LINKUP!"
    echo "📦 Package: n8n-nodes-linkup-clean@$(npm version --json | jq -r '.\"n8n-nodes-linkup-clean\"')"
    echo "🎨 Nouveau logo intégré dans n8n!"
    
else
    echo "❌ Erreur lors du build"
    exit 1
fi