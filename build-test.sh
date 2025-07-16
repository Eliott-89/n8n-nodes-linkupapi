#!/bin/bash

echo "🔧 Build et test du package propre..."

# Installation des dépendances
npm install

# Build
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    
    # Afficher la structure du build
    echo ""
    echo "📋 Structure du build:"
    find dist -type f | sort
    
    echo ""
    echo "🎯 Prêt pour publication!"
    echo "Pour publier: npm publish"
    
else
    echo "❌ Erreur lors du build - il faut corriger les erreurs"
    exit 1
fi