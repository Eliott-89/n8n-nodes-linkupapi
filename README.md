# n8n-nodes-linkupapi

## Description

Ce package n8n permet d'automatiser LinkedIn via l'API Linkup. Il offre des fonctionnalités complètes pour la gestion de profils, réseaux, messages, posts et recrutement.

## Installation

```bash
npm install n8n-nodes-linkupapi
```

## Configuration

1. Créez un compte sur [LinkupAPI.com](https://linkupapi.com)
2. Obtenez votre clé API
3. Configurez les credentials dans n8n

## Structure du projet

```
n8n-nodes-linkupapi/
├── credentials/             # Credentials pour l'API Linkup
│   └── LinkupApi.credentials.ts
├── nodes/                   # Code source des nodes
│   └── Linkup/
│       ├── Linkup.node.ts   # Node principal
│       └── linkup.svg       # Icône du node
├── package.json             # Configuration du projet
├── tsconfig.json           # Configuration TypeScript
├── gulpfile.js             # Configuration Gulp
├── .eslintrc.js            # Configuration ESLint
├── .gitignore              # Fichiers ignorés par Git
├── .npmignore              # Fichiers ignorés par npm
└── README.md               # Documentation
```

## Fonctionnalités

### Authentication
- Login LinkedIn
- Vérification de code

### Profile
- Récupération de profil
- Extraction d'informations
- Recherche de profils

### Network
- Envoi d'invitations
- Gestion des connexions
- Acceptation d'invitations
- Retrait d'invitations

### Messages
- Envoi de messages
- Récupération de conversations
- Gestion de la boîte de réception

### Posts
- Réactions aux posts
- Commentaires
- Création de posts
- Recherche de posts

### Recruiter
- Gestion des candidats
- Gestion des offres d'emploi
- Téléchargement de CV

### Signal API
- Extraction de réactions
- Extraction de commentaires
- Extraction de posts

### Company API
- Recherche d'entreprises
- Informations d'entreprises

### Person API
- Recherche de profils
- Enrichissement de profils

## Développement

```bash
# Installer les dépendances
pnpm install

# Construire le projet
pnpm build

# Mode développement
pnpm dev

# Linter le code
pnpm lint

# Formater le code
pnpm format
```

## Version

Version actuelle : 1.3.01

## Licence

MIT

## Auteur

Eliott Cerpaud