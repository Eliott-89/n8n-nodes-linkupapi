# n8n-nodes-linkup

[![npm version](https://badge.fury.io/js/n8n-nodes-linkup.svg)](https://badge.fury.io/js/n8n-nodes-linkup)

Un nœud n8n pour l'API LINKUP permettant l'automatisation LinkedIn.

## 🚀 Installation

### Installation via n8n Community Nodes

1. Dans n8n, allez dans **Settings** > **Community Nodes**
2. Cliquez sur **Install a community node**
3. Entrez : `n8n-nodes-linkup`
4. Cliquez sur **Install**

### Installation manuelle

```bash
npm install n8n-nodes-linkup
```

## 🔧 Configuration

1. **Créer un compte LINKUP** sur [linkupapi.com](https://linkupapi.com)
2. **Obtenir votre clé API** depuis le dashboard
3. **Configurer les credentials** dans n8n :
   - Clé API LINKUP
   - Email LinkedIn
   - Mot de passe LinkedIn
   - Pays (optionnel, FR par défaut)

## 📋 Fonctionnalités

### 🔑 Authentification
- **Login to LinkedIn** - Authentification LinkedIn
- **Verify security code** - Validation code 2FA

### 👤 Profils
- **Get my LinkedIn profile** - Récupérer votre profil
- **Extract LinkedIn profile info** - Analyser un profil public
- **Search LinkedIn profiles** - Recherche de profils

### 🏢 Entreprises
- **Search LinkedIn companies** - Recherche d'entreprises
- **Get LinkedIn company info** - Infos détaillées entreprise

### 🤝 Réseau
- **Send connection request** - Envoyer une invitation
- **Get connections** - Liste de vos connexions
- **Accept/Withdraw invitations** - Gérer les invitations
- **Get network recommendations** - Suggestions de connexions

### 💬 Messages
- **Send LinkedIn message** - Envoyer un message
- **Get message inbox** - Boîte de réception
- **Get conversation messages** - Historique conversation

### 📝 Posts
- **Create/Comment/React** - Créer et interagir avec les posts
- **Get post reactions** - Réactions d'un post
- **Extract comments** - Commentaires d'un post
- **Search posts** - Recherche de posts
- **Get feed** - Récupérer le feed

### 🧑‍💼 Recruiter
- **Get candidates** - Liste des candidats
- **Get candidate CV** - Télécharger CV
- **Manage job posts** - Gérer les offres d'emploi

### 📊 Data (Enrichissement)
- **Search companies (Data)** - Recherche avancée entreprises
- **Search profiles (Data)** - Recherche avancée profils

## 💡 Utilisation

1. **Ajoutez le nœud LINKUP** à votre workflow
2. **Sélectionnez une opération** (36 disponibles)
3. **Configurez les paramètres** dans "Paramètres Linkup" (tous optionnels)
4. **Exécutez** votre workflow

### Exemple : Recherche de profils

```typescript
Opération: "Search LinkedIn profiles"
Paramètres Linkup:
  - Mot-clé: "développeur"
  - Lieu: "Paris"
  - Entreprise: "google;microsoft"
  - Nombre de résultats: 50
```

## 🛠️ Développement

### Prérequis
- Node.js >= 18.10
- pnpm >= 8.6

### Installation locale
```bash
git clone https://github.com/eliottcerpaud/n8n-nodes-linkup.git
cd n8n-nodes-linkup
pnpm install
pnpm build
```

### Structure du projet
```
├── credentials/LinkupApi.credentials.ts  # Configuration credentials
├── nodes/Linkup/Linkup.node.ts          # Nœud principal
└── nodes/Linkup/linkup.svg              # Icône
```

## 📚 Documentation API

Consultez la [documentation officielle LINKUP](https://docs.linkupapi.com/) pour plus de détails sur les paramètres et réponses API.

## 🐛 Support

- **Issues** : [GitHub Issues](https://github.com/eliottcerpaud/n8n-nodes-linkup/issues)
- **Documentation LINKUP** : [docs.linkupapi.com](https://docs.linkupapi.com/)

## 📄 Licence

MIT

## 🔄 Changelog

### v1.2.0
- ✅ 36 opérations LinkedIn complètes
- ✅ Interface simplifiée (paramètres optionnels)
- ✅ Support complet API LINKUP
- ✅ Gestion automatique credentials
- ✅ Opérations DATA ajoutées

### v1.1.0
- ✅ Première version stable
- ✅ 34 opérations de base

---

**Créé avec ❤️ pour la communauté n8n**