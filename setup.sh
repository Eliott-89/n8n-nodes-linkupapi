#!/bin/bash

# Script de setup automatique pour publier sur GitHub et npm

echo "🚀 Setup automatique du package n8n-nodes-linkup"
echo "================================================"

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Lancez ce script depuis le répertoire n8n-nodes-linkup"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Build du projet
echo "🔨 Build du projet..."
npm run build

# Vérifier si le build a réussi
if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Initialiser git si nécessaire
if [ ! -d ".git" ]; then
    echo "🎯 Initialisation du repository git..."
    git init
    git add .
    git commit -m "Initial commit - LINKUP API n8n integration"
fi

echo ""
echo "🎉 Projet prêt!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Créer un repository GitHub 'n8n-nodes-linkup'"
echo "2. Ajouter l'origin remote:"
echo "   git remote add origin https://github.com/VOTRE-USERNAME/n8n-nodes-linkup.git"
echo "3. Pousser sur GitHub:"
echo "   git push -u origin main"
echo "4. Publier sur npm:"
echo "   npm publish"
echo ""
echo "Une fois publié, les utilisateurs pourront installer via:"
echo "Settings > Community Nodes > n8n-nodes-linkup"