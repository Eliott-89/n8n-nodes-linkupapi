#!/bin/bash

echo "🧹 Nettoyage complet et republication..."

# Incrémenter la version pour forcer une nouvelle publication
echo "📈 Mise à jour de la version..."
npm version patch

# Nettoyage complet
echo "🧹 Nettoyage des fichiers compilés..."
rm -rf dist node_modules package-lock.json

# Réinstallation propre
echo "📦 Réinstallation des dépendances..."
npm install

# Vérification qu'il n'y a pas de références erronées
echo "🔍 Vérification du code source..."
grep -r "linkup-sdk" . --exclude-dir=node_modules --exclude-dir=.git || echo "✅ Pas de référence à linkup-sdk"
grep -r "GenericFunctions" . --exclude-dir=node_modules --exclude-dir=.git || echo "✅ Pas de référence à GenericFunctions"

# Build propre
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Vérification du contenu du dist
echo "📋 Contenu du répertoire dist:"
find dist -type f -name "*.js" -exec echo "Fichier: {}" \; -exec head -10 {} \;

# Commit et push
echo "📤 Commit et push..."
git add .
git commit -m "Clean rebuild - version $(npm version --json | jq -r '.\"n8n-nodes-linkup\"')"
git push origin main

# Publication sur npm
echo "📦 Publication sur npm..."
npm publish

echo ""
echo "🎉 Nouvelle version publiée!"
echo "📦 Vérifiez sur: https://www.npmjs.com/package/n8n-nodes-linkup"
echo ""
echo "🔄 Dans n8n, vous devrez peut-être:"
echo "1. Désinstaller l'ancienne version"
echo "2. Réinstaller la nouvelle version"
echo "3. Redémarrer n8n si nécessaire"