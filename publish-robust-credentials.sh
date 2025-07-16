#!/bin/bash

echo "🎉 Version finale avec système de credentials robuste..."

# Nettoyage complet
rm -rf dist node_modules package-lock.json

# Installation et build
npm install
npm run build

# Vérification du build
echo "📋 Vérification du build:"
ls -la dist/credentials/
ls -la dist/nodes/Linkup/

# Commit et push
git add .
git commit -m "Major update v1.1.0: Robust credentials system with fallback and BLANK_VALUE detection"
git push origin main

# Publication
npm publish

echo ""
echo "🎉 Version 1.1.0 publiée avec système de credentials robuste!"
echo "📦 Package: n8n-nodes-linkup-clean@1.1.0"
echo ""
echo "✅ Nouvelles fonctionnalités:"
echo "- Système de credentials avec API Key, Email, Password, Login Token"
echo "- Détection automatique des valeurs BLANK_VALUE"
echo "- Fallback vers credentials personnalisées"
echo "- Test de connexion intégré"
echo "- Messages d'erreur améliorés"
echo ""
echo "🎯 Utilisation recommandée:"
echo "1. Créez des credentials LINKUP API dans n8n"
echo "2. Entrez: API Key, LinkedIn Email, Password, Country"
echo "3. Testez la connexion"
echo "4. Si problème, utilisez 'Use Custom Credentials' comme fallback"
echo ""
echo "🔧 Fonctionnalités incluses:"
echo "- API Key: Votre clé LINKUP"
echo "- LinkedIn Email: Votre email"
echo "- LinkedIn Password: Votre mot de passe"
echo "- Login Token: Token d'authentification (optionnel)"
echo "- Country: Sélection du pays"
echo "- Test de connexion automatique"