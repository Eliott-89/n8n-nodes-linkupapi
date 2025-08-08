# Liste Complète des Nœuds et Paramètres Obligatoires - n8n Linkup

## 🔐 **AUTHENTICATION** (2 opérations)

### ✅ **login**
- **Paramètres obligatoires** : Aucun (utilise les credentials automatiquement)
- **Description** : Authentification de votre compte LinkedIn via Linkup

### ✅ **verifyCode** 
- **Paramètres obligatoires** : 
  - `verificationCode` * (Code de vérification reçu par email/SMS)
- **Description** : Validation du code de sécurité reçu par email

---

## 👤 **PROFILE** (3 opérations)

### ✅ **getMyProfile**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les informations de votre profil LinkedIn

### ✅ **extractProfileInfo**
- **Paramètres obligatoires** :
  - `profileUrl` * (URL du profil LinkedIn)
- **Description** : Extraire les informations d'un profil LinkedIn public

### ✅ **searchProfile**
- **Paramètres obligatoires** : Aucun
- **Description** : Rechercher des profils LinkedIn

---

## 🏢 **COMPANY** (2 opérations)

### ✅ **searchCompanies**
- **Paramètres obligatoires** : Aucun
- **Description** : Rechercher des entreprises sur LinkedIn

### ✅ **getCompanyInfo**
- **Paramètres obligatoires** : Aucun (mais `companyUrl` recommandé)
- **Description** : Obtenir des informations détaillées sur une entreprise

---

## 🤝 **NETWORK** (8 opérations)

### ✅ **sendConnectionRequest**
- **Paramètres obligatoires** :
  - `profileUrl` * (URL du profil LinkedIn à connecter)
- **Description** : Envoyer une demande de connexion à un profil

### ✅ **getConnections**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer vos connexions LinkedIn

### ✅ **acceptConnectionInvitation**
- **Paramètres obligatoires** :
  - `invitationId` * (ID de l'invitation reçue)
- **Description** : Accepter une invitation de connexion reçue

### ✅ **getReceivedInvitations**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les invitations de connexion reçues

### ✅ **getSentInvitations**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les invitations de connexion envoyées

### ✅ **withdrawInvitation**
- **Paramètres obligatoires** :
  - `invitationId` * (ID de l'invitation à retirer)
- **Description** : Retirer une invitation envoyée

### ✅ **getNetworkRecommendations**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les recommandations de réseau

### ✅ **getInvitationStatus**
- **Paramètres obligatoires** :
  - `profileUrl` * (URL du profil LinkedIn à vérifier)
- **Description** : Vérifier le statut d'invitation pour un profil

---

## 💬 **MESSAGE** (3 opérations)

### ✅ **sendMessage**
- **Paramètres obligatoires** :
  - `messageRecipientUrl` * (URL du profil destinataire)
  - `messageText` * (Texte du message)
- **Description** : Envoyer un message à une connexion

### ✅ **getMessageInbox**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer votre boîte de messages

### ✅ **getConversationMessages**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les messages d'une conversation

---

## 📝 **POST** (10 opérations)

### ✅ **getPostReactions**
- **Paramètres obligatoires** : Aucun (mais `postUrl` recommandé)
- **Description** : Récupérer les réactions sur un post

### ✅ **reactToPost**
- **Paramètres obligatoires** : Aucun (mais `postUrl` recommandé)
- **Description** : Réagir à un post

### ✅ **repostContent**
- **Paramètres obligatoires** : Aucun
- **Description** : Repartager du contenu

### ✅ **addCommentToPost**
- **Paramètres obligatoires** : Aucun (mais `postUrl` et `commentText` recommandés)
- **Description** : Ajouter un commentaire à un post

### ✅ **getComments**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les commentaires d'un post

### ✅ **answerComment**
- **Paramètres obligatoires** : Aucun (mais `commentId` et `answerText` recommandés)
- **Description** : Répondre à un commentaire

### ✅ **searchPosts**
- **Paramètres obligatoires** : Aucun
- **Description** : Rechercher des posts

### ✅ **createPost**
- **Paramètres obligatoires** : Aucun (mais `postText` recommandé)
- **Description** : Créer un nouveau post

### ✅ **getLinkedInFeed**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer votre fil LinkedIn

### ✅ **sendPostTimeSpent**
- **Paramètres obligatoires** : Aucun
- **Description** : Envoyer le signal de temps passé sur un post

---

## 👔 **RECRUITER** (6 opérations)

### ✅ **getCandidates**
- **Paramètres obligatoires** : Aucun (mais `jobId` recommandé)
- **Description** : Récupérer la liste des candidats

### ✅ **getCandidateCV**
- **Paramètres obligatoires** : Aucun (mais `applicationId` recommandé)
- **Description** : Récupérer le CV d'un candidat

### ✅ **getJobPosts**
- **Paramètres obligatoires** : Aucun
- **Description** : Récupérer les offres d'emploi

### ✅ **publishJob**
- **Paramètres obligatoires** : Aucun
- **Description** : Publier une offre d'emploi

### ✅ **closeJob**
- **Paramètres obligatoires** : Aucun
- **Description** : Fermer une offre d'emploi

### ✅ **createJob**
- **Paramètres obligatoires** : Aucun (mais `jobTitle`, `jobDescription`, `companyName`, `location` recommandés)
- **Description** : Créer une nouvelle offre d'emploi

---

## 📊 **SIGNAL** (6 opérations)

### ✅ **extractPostReactions**
- **Paramètres obligatoires** : Aucun (mais `post_url` recommandé)
- **Description** : Extraire les réactions d'un post

### ✅ **extractPostComments**
- **Paramètres obligatoires** : Aucun (mais `post_url` recommandé)
- **Description** : Extraire les commentaires d'un post

### ✅ **extractProfileReactions**
- **Paramètres obligatoires** : Aucun (mais `profile_url` recommandé)
- **Description** : Extraire les réactions d'un profil

### ✅ **extractProfileComments**
- **Paramètres obligatoires** : Aucun (mais `profile_url` recommandé)
- **Description** : Extraire les commentaires d'un profil

### ✅ **extractProfilePosts**
- **Paramètres obligatoires** : Aucun (mais `profile_url` recommandé)
- **Description** : Extraire les posts d'un profil

### ✅ **extractCompanyPosts**
- **Paramètres obligatoires** : Aucun (mais `company_url` recommandé)
- **Description** : Extraire les posts d'une entreprise

---

## 🏢 **COMPANY API** (3 opérations)

### ✅ **searchCompanies**
- **Paramètres obligatoires** : Aucun (mais `companyKeyword` recommandé)
- **Description** : Rechercher des entreprises

### ✅ **getCompanyInfo**
- **Paramètres obligatoires** : Aucun (mais `companyUrl` recommandé)
- **Description** : Récupérer les informations d'une entreprise

### ✅ **getCompanyInfoByDomain**
- **Paramètres obligatoires** : Aucun (mais `domain` recommandé)
- **Description** : Récupérer les informations d'une entreprise par domaine

---

## 👤 **PERSON API** (3 opérations)

### ✅ **searchProfiles**
- **Paramètres obligatoires** : Aucun (mais `personKeyword` recommandé)
- **Description** : Rechercher des profils

### ✅ **extractProfileInfo**
- **Paramètres obligatoires** : Aucun (mais `profileUrl` recommandé)
- **Description** : Extraire les informations d'un profil

### ✅ **profileEnrichment**
- **Paramètres obligatoires** : Aucun (mais `profileUrl` recommandé)
- **Description** : Enrichir les informations d'un profil

---

## 📋 **RÉSUMÉ**

### **Opérations avec paramètres STRICTEMENT obligatoires :**
1. **Authentication > verifyCode** : `verificationCode`
2. **Profile > extractProfileInfo** : `profileUrl`
3. **Network > sendConnectionRequest** : `profileUrl`
4. **Network > acceptConnectionInvitation** : `invitationId`
5. **Network > withdrawInvitation** : `invitationId`
6. **Network > getInvitationStatus** : `profileUrl`
7. **Message > sendMessage** : `messageRecipientUrl` + `messageText`

### **Total des opérations :** 46 opérations réparties sur 10 ressources

**Légende :**
- `*` = Paramètre strictement obligatoire (validation côté serveur)
- Sans `*` = Paramètre optionnel ou recommandé selon le contexte
