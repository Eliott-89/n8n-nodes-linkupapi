#!/bin/bash

echo "🔍 Vérification de la version npm actuelle..."

# Télécharger et inspecter le package actuel
echo "📥 Téléchargement du package actuel..."
npm pack n8n-nodes-linkup

# Extraire et examiner
echo "🔍 Extraction et examen..."
tar -xzf n8n-nodes-linkup-*.tgz

echo "📋 Contenu du package npm actuel:"
find package -name "*.js" -exec echo "=== {} ===" \; -exec head -5 {} \;

echo ""
echo "🔍 Recherche de références problématiques:"
grep -r "linkup-sdk" package/ || echo "✅ Pas de linkup-sdk trouvé"
grep -r "GenericFunctions" package/ || echo "✅ Pas de GenericFunctions trouvé"

# Nettoyage
rm -rf package n8n-nodes-linkup-*.tgz

echo ""
echo "🚀 Maintenant, lancez le script de republication:"
echo "chmod +x clean-republish.sh && ./clean-republish.sh"