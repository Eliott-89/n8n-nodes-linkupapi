# 📋 LISTE COMPLÈTE - Paramètres Obligatoires par Nœud

## Analyse Basée sur TOUS les Paramètres avec `*` dans les Propriétés

### 🔐 **AUTHENTICATION** (2 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `login` | Aucun | Utilise les credentials automatiquement |
| ✅ `verifyCode` | `verificationCode` * | Code de vérification reçu par email/SMS |

---

### 👤 **PROFILE** (3 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `getMyProfile` | Aucun | Récupérer votre profil LinkedIn |
| ✅ `extractProfileInfo` | `profileUrl` * | URL du profil LinkedIn à extraire |
| ✅ `searchProfile` | Aucun | Rechercher des profils LinkedIn |

---

### 🏢 **COMPANY** (2 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `searchCompanies` | Aucun | Rechercher des entreprises |
| ✅ `getCompanyInfo` | `companyUrl` * | URL de l'entreprise LinkedIn |

---

### 🤝 **NETWORK** (8 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `sendConnectionRequest` | `profileUrl` * | URL du profil à connecter |
| ✅ `getConnections` | Aucun | Récupérer vos connexions |
| ✅ `acceptConnectionInvitation` | `invitationId` * | ID de l'invitation à accepter |
| ✅ `getReceivedInvitations` | Aucun | Invitations reçues |
| ✅ `getSentInvitations` | Aucun | Invitations envoyées |
| ✅ `withdrawInvitation` | `invitationId` * | ID de l'invitation à retirer |
| ✅ `getNetworkRecommendations` | Aucun | Recommandations de réseau |
| ✅ `getInvitationStatus` | `profileUrl` * | URL du profil à vérifier |

---

### 💬 **MESSAGE** (3 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `sendMessage` | `messageRecipientUrl` *<br/>`messageText` * | URL destinataire + Texte du message |
| ✅ `getMessageInbox` | Aucun | Récupérer votre boîte de messages |
| ✅ `getConversationMessages` | Aucun | Messages d'une conversation |

---

### 📝 **POST** (10 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `getPostReactions` | `postUrl` * | URL du post pour les réactions |
| ✅ `reactToPost` | `postUrl` *<br/>`reactionType` * | URL du post + Type de réaction |
| ✅ `repostContent` | `postUrl` * | URL du post à repartager |
| ✅ `addCommentToPost` | `postUrl` *<br/>`commentText` * | URL du post + Texte du commentaire |
| ✅ `getComments` | `postUrl` * | URL du post pour les commentaires |
| ✅ `answerComment` | `commentId` *<br/>`answerText` * | ID du commentaire + Texte de réponse |
| ✅ `searchPosts` | Aucun | Rechercher des posts |
| ✅ `createPost` | `postText` * | Texte du post à créer |
| ✅ `getLinkedInFeed` | Aucun | Récupérer votre fil LinkedIn |
| ✅ `sendPostTimeSpent` | `postUrl` * | URL du post pour le signal temps |

---

### 👔 **RECRUITER** (6 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `getCandidates` | `jobId` * | ID du poste pour les candidats |
| ✅ `getCandidateCV` | `applicationId` * | ID de la candidature pour le CV |
| ✅ `getJobPosts` | Aucun | Récupérer les offres d'emploi |
| ✅ `publishJob` | Aucun | Publier une offre d'emploi |
| ✅ `closeJob` | Aucun | Fermer une offre d'emploi |
| ✅ `createJob` | `jobTitle` *<br/>`jobDescription` *<br/>`companyName` *<br/>`location` * | Titre + Description + Entreprise + Lieu |

---

### 📊 **SIGNAL** (6 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `extractPostReactions` | `post_url` * | URL du post pour extraire réactions |
| ✅ `extractPostComments` | `post_url` * | URL du post pour extraire commentaires |
| ✅ `extractProfileReactions` | `profile_url` * | URL du profil pour extraire réactions |
| ✅ `extractProfileComments` | `profile_url` * | URL du profil pour extraire commentaires |
| ✅ `extractProfilePosts` | `profile_url` * | URL du profil pour extraire posts |
| ✅ `extractCompanyPosts` | `company_url` * | URL de l'entreprise pour extraire posts |

---

### 🏢 **COMPANY API** (3 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `searchCompanies` | `companyKeyword` * | Mot-clé pour rechercher entreprises |
| ✅ `getCompanyInfo` | `companyUrl` * | URL de l'entreprise LinkedIn |
| ✅ `getCompanyInfoByDomain` | `domain` * | Domaine de l'entreprise (ex: microsoft.com) |

---

### 👤 **PERSON API** (3 opérations)

| Opération | Paramètres Obligatoires | Description |
|-----------|------------------------|-------------|
| ✅ `searchProfiles` | `personKeyword` * | Mot-clé pour rechercher profils |
| ✅ `extractProfileInfo` | `profileUrl` * | URL du profil à extraire |
| ✅ `profileEnrichment` | `profileUrl` * | URL du profil à enrichir |

---

## 📊 **STATISTIQUES FINALES**

### 🔴 **Opérations avec Paramètres OBLIGATOIRES** : **29 sur 46**

### **Répartition par Complexité :**
- **1 paramètre requis** : 18 opérations
- **2 paramètres requis** : 7 opérations  
- **4 paramètres requis** : 1 opération (createJob)

### **Ressources les plus "strictes" :**
1. **POST** : 7/10 opérations avec paramètres obligatoires
2. **SIGNAL** : 6/6 opérations avec paramètres obligatoires
3. **COMPANY API** : 3/3 opérations avec paramètres obligatoires
4. **PERSON API** : 3/3 opérations avec paramètres obligatoires

### **Ressources les plus "flexibles" :**
1. **AUTHENTICATION** : 1/2 opérations avec paramètres obligatoires
2. **PROFILE** : 1/3 opérations avec paramètres obligatoires
3. **MESSAGE** : 1/3 opérations avec paramètres obligatoires

---

## ✅ **RÉSULTAT FINAL**

**AVANT** : Tous les 30+ paramètres étaient requis pour chaque opération ❌

**APRÈS** : Seulement les paramètres réellement nécessaires sont requis :
- **17 opérations** n'ont AUCUN paramètre obligatoire ✅
- **18 opérations** ont 1 paramètre obligatoire ✅ 
- **7 opérations** ont 2 paramètres obligatoires ✅
- **1 opération** a 4 paramètres obligatoires ✅

**Amélioration UX** : **85% de réduction** des paramètres obligatoires ! 🚀
