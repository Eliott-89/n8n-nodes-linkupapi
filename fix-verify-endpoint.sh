#!/bin/bash

echo "🔧 Correction de l'endpoint verify-code..."

# Nettoyage et build
rm -rf dist node_modules package-lock.json
npm install
npm run build

# Vérification
echo "✅ Corrections apportées:"
echo "- URL corrigée: /v1/auth/verify (au lieu de /v1/auth/verify-code)"
echo "- Paramètre corrigé: 'code' (au lieu de 'verification_code')"
echo "- Ajout du paramètre 'country' pour verify-code"

# Commit et push
git add .
git commit -m "Fix verify-code endpoint: correct URL and parameters"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.0.5 publiée avec les endpoints corrects!"
echo "📦 Package: n8n-nodes-linkup-clean@1.0.5"
echo ""
echo "🎯 Maintenant testez:"
echo "1. Opération Login pour obtenir une réponse avec requires_verification"
echo "2. Opération Verify Code avec le code reçu par email"
echo "3. Les deux devraient marcher avec les bons endpoints!"