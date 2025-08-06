# Structure des Propriétés Linkup

Ce dossier contient la structure modulaire des propriétés du nœud Linkup, divisée en plusieurs fichiers pour une meilleure maintenabilité.

## Structure des fichiers

### `index.ts`
Fichier principal qui combine toutes les propriétés en un seul export.

### `common.ts`
Propriétés communes utilisées dans tout le nœud :
- Panneau d'information
- Sélecteur de ressource
- Options avancées
- Propriétés communes (Country, pagination)

### Fichiers par catégorie

#### `authentication.ts`
Propriétés pour l'authentification :
- Login
- Verify Code

#### `profile.ts`
Propriétés pour la gestion des profils :
- Get My Profile
- Extract Profile Information
- Search Profile

#### `company.ts`
Propriétés pour la gestion des entreprises :
- Search Companies
- Get Company Information

#### `network.ts`
Propriétés pour la gestion du réseau :
- Send Connection Request
- Get Connections
- Accept/Withdraw Invitations
- Get Invitations Status

#### `message.ts`
Propriétés pour la gestion des messages :
- Send Message
- Get Message Inbox
- Get Conversation Messages

#### `post.ts`
Propriétés pour la gestion des posts :
- Get/React to posts
- Create posts
- Search posts
- Comments management

#### `recruiter.ts`
Propriétés pour LinkedIn Recruiter :
- Get candidates
- Get job posts
- Create/Publish/Close jobs
- Get candidate CV

#### `signal.ts`
Propriétés pour l'extraction de données :
- Extract post reactions/comments
- Extract profile reactions/comments/posts
- Extract company posts

#### `companyApi.ts`
Propriétés pour l'API Company :
- Search companies
- Get company information
- Get company by domain

#### `personApi.ts`
Propriétés pour l'API Person :
- Search profiles
- Extract profile information
- Profile enrichment

## Utilisation

Le fichier `properties.ts` principal importe toutes les propriétés depuis cette structure modulaire :

```typescript
export { nodeProperties } from "./properties/index";
```

## Avantages de cette structure

1. **Maintenabilité** : Chaque catégorie est dans son propre fichier
2. **Lisibilité** : Plus facile de trouver et modifier des propriétés spécifiques
3. **Réutilisabilité** : Propriétés communes partagées
4. **Organisation** : Structure claire par fonctionnalité
5. **Évolutivité** : Facile d'ajouter de nouvelles catégories

## Ajout de nouvelles propriétés

Pour ajouter de nouvelles propriétés :

1. Identifier la catégorie appropriée
2. Ajouter les propriétés dans le fichier correspondant
3. Si c'est une nouvelle catégorie, créer un nouveau fichier
4. Mettre à jour `index.ts` si nécessaire 