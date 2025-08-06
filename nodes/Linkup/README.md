# Linkup Node - Structure Modulaire

Ce dossier contient le nœud Linkup refactorisé avec une structure modulaire pour une meilleure organisation et maintenabilité.

## Structure des fichiers

```
nodes/Linkup/
├── Linkup.node.ts          # Fichier principal du nœud
├── types.ts                # Types et interfaces partagés
├── utils.ts                # Utilitaires et méthodes communes
├── properties.ts           # Propriétés du nœud
├── categories/             # Modules par catégorie
│   ├── authentication.ts   # Opérations d'authentification
│   ├── profile.ts         # Opérations de profil
│   ├── company.ts         # Opérations de company
│   ├── network.ts         # Opérations de réseau
│   ├── message.ts         # Opérations de messages
│   ├── post.ts           # Opérations de posts
│   ├── recruiter.ts      # Opérations de recrutement
│   ├── signal.ts         # Opérations de signal API
│   ├── companyApi.ts     # Opérations de Company API
│   └── personApi.ts      # Opérations de Person API
└── linkup.svg            # Icône du nœud
```

## Avantages de cette structure

1. **Modularité** : Chaque catégorie d'opérations est dans son propre fichier
2. **Maintenabilité** : Plus facile de modifier une catégorie spécifique
3. **Lisibilité** : Code plus organisé et facile à comprendre
4. **Réutilisabilité** : Les utilitaires sont partagés entre les modules
5. **Évolutivité** : Facile d'ajouter de nouvelles catégories

## Modules disponibles

### Authentication (`authentication.ts`)
- Login
- Verify Code

### Profile (`profile.ts`)
- Get My Profile
- Extract Profile Information
- Search Profile

### Company (`company.ts`)
- Search Companies
- Get Company Information

### Network (`network.ts`)
- Send Connection Request
- Get Connections
- Accept Connection Invitation
- Get Received/Sent Invitations
- Withdraw Invitation
- Get Network Recommendations
- Get Invitation Status

### Message (`message.ts`)
- Send Message
- Get Message Inbox
- Get Conversation Messages

### Post (`post.ts`)
- Get Post Reactions
- React to Post
- Repost
- Comment Post
- Extract Comments
- Answer Comment
- Search Posts
- Create Post
- Get Feed
- Time Spent

### Recruiter (`recruiter.ts`)
- Get Candidates
- Get Candidate CV
- Get Job Posts
- Publish Job
- Close Job
- Create Job

### Signal (`signal.ts`)
- Extract Post Reactions
- Extract Post Comments
- Extract Profile Reactions
- Extract Profile Comments
- Extract Profile Posts
- Extract Company Posts

### Company API (`companyApi.ts`)
- Search Companies API
- Get Company Information API
- Get Company Information by Domain

### Person API (`personApi.ts`)
- Search Profiles API
- Extract Profile Information API
- Profile Enrichment

## Utilisation

Le fichier principal `Linkup.node.ts` importe tous les modules et les utilise selon la catégorie sélectionnée. Cette approche permet de garder le code organisé tout en conservant la fonctionnalité complète du nœud. 