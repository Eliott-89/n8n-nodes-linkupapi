#!/bin/bash

# Correction du remote GitHub
echo "🔧 Correction du remote GitHub..."

# Supprimer l'ancien remote
git remote remove origin 2>/dev/null || true

# Ajouter le bon remote
git remote add origin https://github.com/Eliott-89/n8n-nodes-linkup.git

# Pousser vers le bon repository
git push -u origin master

echo "✅ Remote corrigé et code poussé vers GitHub!"
echo "🔗 URL: https://github.com/Eliott-89/n8n-nodes-linkup"