#!/bin/bash

echo "🧹 Nettoyage du dossier - suppression des fichiers inutiles..."

# Supprimer tous les scripts de build/publish inutiles
rm -f check-npm-version.sh
rm -f clean-republish.sh
rm -f create-github-repo.sh
rm -f final-deploy.sh
rm -f final-publish.sh
rm -f fix-and-deploy.sh
rm -f fix-complete-blank-issue.sh
rm -f fix-password-and-publish.sh
rm -f fix-remote.sh
rm -f fix-typescript-errors.sh
rm -f fix-url-and-publish.sh
rm -f fix-verify-endpoint.sh
rm -f publish-clean.sh
rm -f publish-correct.sh
rm -f publish-robust-credentials.sh
rm -f radical-fix.sh
rm -f setup.sh
rm -f simple-publish.sh

# Supprimer les fichiers temporaires
rm -f n8n-community-nodes-linkup-1.0.0.tgz
rm -f DEPLOYMENT.md

# Supprimer les fichiers de build
rm -rf dist
rm -rf node_modules
rm -f package-lock.json

echo "✅ Nettoyage terminé!"
echo ""
echo "📋 Fichiers conservés:"
find . -maxdepth 1 -type f -name "*.json" -o -name "*.md" -o -name "*.js" -o -name "*.ts" -o -name "LICENSE" -o -name ".gitignore" -o -name ".npmignore" -o -name ".eslintrc.js" | sort
echo ""
echo "📁 Dossiers conservés:"
find . -maxdepth 1 -type d ! -name "." ! -name ".git" ! -name ".github" ! -name "node_modules" ! -name "dist" | sort