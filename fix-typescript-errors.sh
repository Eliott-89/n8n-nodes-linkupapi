#!/bin/bash

echo "🔧 Correction des erreurs TypeScript..."

# Nettoyage complet
rm -rf dist node_modules package-lock.json

# Installation et build
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    
    # Commit et push
    git add .
    git commit -m "Fix TypeScript errors v1.1.1 - simplified credentials and fixed node methods"
    git push origin main

    # Publication
    npm publish
    
    echo ""
    echo "🎉 Version 1.1.1 publiée avec corrections!"
    echo "📦 Package: n8n-nodes-linkup-clean@1.1.1"
    echo ""
    echo "✅ Corrections:"
    echo "- Suppression de l'icône dans les credentials"
    echo "- Simplification du test de connexion"
    echo "- Correction des méthodes du node"
    echo "- Système de credentials fonctionnel"
    echo ""
    echo "🎯 Fonctionnalités:"
    echo "- Credentials avec API Key, Email, Password, Token, Country"
    echo "- Détection des valeurs BLANK_VALUE"
    echo "- Fallback vers credentials personnalisées"
    echo "- Gestion robuste des erreurs"
    
else
    echo "❌ Erreur lors du build"
    exit 1
fi