#!/bin/bash

# Script pour créer automatiquement le repository GitHub
# Usage: ./create-github-repo.sh

REPO_NAME="n8n-nodes-linkup"
GITHUB_USERNAME="linkup-api"  # Changez par votre username GitHub

echo "🚀 Création automatique du repository GitHub"
echo "============================================="

# Vérifier si gh CLI est installé
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) n'est pas installé."
    echo "Installation sur macOS: brew install gh"
    echo "Puis connectez-vous: gh auth login"
    exit 1
fi

# Vérifier si on est connecté à GitHub
if ! gh auth status &> /dev/null; then
    echo "🔑 Connexion à GitHub..."
    gh auth login
fi

# Créer le repository sur GitHub
echo "📝 Création du repository $REPO_NAME..."
gh repo create $REPO_NAME \
    --public \
    --description "n8n community node for LINKUP API - LinkedIn automation and data extraction" \
    --clone=false

# Initialiser git local
echo "🔧 Configuration git locale..."
git init
git add .
git commit -m "Initial release - LINKUP API authentication support"

# Ajouter remote et pousser
echo "📤 Push vers GitHub..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Repository créé avec succès!"
echo "🔗 URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Configurer NPM_TOKEN dans GitHub Secrets"
echo "2. npm publish"
echo "3. Tester dans n8n"
echo ""
echo "Le package sera disponible sur: https://www.npmjs.com/package/n8n-nodes-linkup"