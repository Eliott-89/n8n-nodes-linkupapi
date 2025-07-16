# 🚀 Guide de déploiement n8n-nodes-linkup

Ce guide vous accompagne pour publier votre package LINKUP sur GitHub et npm.

## 📁 Structure créée

Le projet complet a été créé dans `/Users/eliottcerpaud/Desktop/n8n-nodes-linkup/` avec :

- ✅ **package.json** - Configuration npm avec dépendances
- ✅ **README.md** - Documentation complète
- ✅ **Credentials** - Authentification LINKUP API
- ✅ **Node TypeScript** - Logique d'authentification LinkedIn
- ✅ **Configuration** - TypeScript, ESLint, build
- ✅ **GitHub Actions** - Publication automatique
- ✅ **Icône SVG** - Branding LINKUP

## 🛠️ Setup initial

```bash
cd /Users/eliottcerpaud/Desktop/n8n-nodes-linkup
chmod +x setup.sh
./setup.sh
```

## 📤 Publication sur GitHub

### 1. Créer le repository GitHub
- Nom: `n8n-nodes-linkup`
- Description: `n8n community node for LINKUP API - LinkedIn automation and data extraction`
- Public
- Ne pas initialiser avec README (on a déjà les fichiers)

### 2. Connecter et pousser
```bash
git remote add origin https://github.com/VOTRE-USERNAME/n8n-nodes-linkup.git
git branch -M main
git push -u origin main
```

### 3. Configurer GitHub Actions
- Allez dans Settings > Secrets and variables > Actions
- Ajoutez `NPM_TOKEN` avec votre token npm

## 📦 Publication sur npm

### 1. Login npm
```bash
npm login
```

### 2. Publier
```bash
npm publish
```

### 3. Automatisation
Pour les versions futures :
```bash
git tag v1.0.1
git push origin v1.0.1
```
(GitHub Actions publiera automatiquement)

## 🎯 Résultat

Une fois publié, le package sera disponible :
- **npm**: `https://www.npmjs.com/package/n8n-nodes-linkup`
- **GitHub**: `https://github.com/VOTRE-USERNAME/n8n-nodes-linkup`

## 🔧 Test dans n8n

1. **Installer** : Settings > Community Nodes > `n8n-nodes-linkup`
2. **Configurer** : Credentials > LINKUP API
3. **Utiliser** : Node "LINKUP" dans la palette

## 🚀 Fonctionnalités actuelles

- ✅ Authentification LinkedIn via LINKUP API
- ✅ Gestion des codes de vérification
- ✅ Gestion d'erreurs robuste
- ✅ Configuration flexible des credentials

## 📈 Évolution future

Le package est prêt pour l'extension ! On peut ajouter :
- Profile search
- Company search
- Job search
- Message automation
- Connection management
- Et plus encore...

---

**Votre API LINKUP sera désormais accessible à tous les utilisateurs n8n ! 🎉**