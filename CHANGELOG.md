# Changelog

## [0.0.1] - 2025-01-10

### 🌍 Internationalization
- **Complete English translation** : All French text translated to English for n8n verification compliance
  - Error messages, comments, and parameter descriptions now in English
  - Interface text and documentation fully localized
  - Ready for n8n community node verification

### 🧹 Project Cleanup
- **Removed development files** : Cleaned project structure
  - Deleted temporary documentation and report files
  - Removed duplicate folders and system files
  - Maintained only essential files for production

### ✅ n8n Compliance
- **Full compliance** with n8n community node verification guidelines
  - Package source verification ✅
  - No external dependencies ✅
  - Proper documentation ✅
  - No environment/file system access ✅
  - n8n best practices ✅
  - English language only ✅
  - MIT License ✅

### 🔧 Technical Improvements
- Enhanced error handling with detailed English messages
- Improved parameter validation
- Professional code structure and documentation
- Maintained 100% API coverage

## [2.4.81] - 2025-01-10

### 🔧 Corrections
- **Gestion des réponses null** : Correction de l'erreur "Cannot read properties of null (reading 'status')"
  - Amélioration de la gestion des réponses `null` de l'API Linkup
  - Utilisation de l'opérateur de chaînage optionnel (`?.`) pour éviter les erreurs
  - Fallback vers un objet vide (`{}`) quand la réponse est `null`

### 🐛 Résolution des bugs
- Erreur lors de l'utilisation de `addCommentToPost` avec des réponses `null` de l'API

## [2.4.67] - 2025-01-10

### 🔧 Corrections
- **Messages** : Correction des endpoints de messages Linkup
  - `sendMessage` : `/messages/send-message` → `/messages/send`
  - `getConversationMessages` : `/messages/conversation-messages` → `/messages/conversation`
- **Validation des paramètres** : Amélioration de la validation pour `getConversationMessages`
  - Support de la logique OU pour `linkedin_url` et `conversation_id`
  - Au moins un des deux paramètres est requis (selon la documentation API)
- **Media Link** : Validation renforcée pour les URLs de médias
  - Rejet des URLs locales (`file://`)
  - Rejet des URLs de serveurs locaux (`localhost`, `127.0.0.1`, etc.)
  - Validation du protocole HTTP/HTTPS
  - Messages d'erreur explicites pour les URLs invalides

### 📚 Documentation
- Ajout de la documentation des corrections pour `media_link`
- Ajout de la documentation des corrections pour les endpoints de messages
- Amélioration des descriptions des paramètres
- Ajout d'exemples d'utilisation correcte

### 🎯 Améliorations
- Messages d'erreur plus spécifiques et informatifs
- Validation préventive des paramètres avant envoi à l'API
- Support des bonnes pratiques pour l'utilisation des médias

### 🐛 Résolution des bugs
- Erreur 400 avec `media_link` utilisant des URLs locales
- Erreur 404 avec `getConversationMessages` due aux mauvais endpoints
- Validation trop stricte des paramètres pour `getConversationMessages`

## [2.4.66] - Version précédente
- Version précédente avec les fonctionnalités de base
