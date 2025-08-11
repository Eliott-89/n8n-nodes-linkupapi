# Changelog

## [2.4.83] - 2025-01-10

### 🌍 Internationalization
- **Complete English Translation** : Full translation of all French text to English
  - All error messages now in English for n8n verification compliance
  - All comments translated to English
  - All property descriptions in English
  - All validation messages in English

### 🧹 Project Cleanup
- **Code Structure Optimization** : Removed unnecessary files and documentation
  - Deleted temporary correction files and reports
  - Removed duplicate directories
  - Cleaned up project structure
  - Maintained only essential files for functionality

### ✅ n8n Compliance
- **Verification Guidelines** : Full compliance with n8n community node requirements
  - English language only (interface and documentation)
  - No external dependencies
  - Proper error handling and validation
  - MIT license compliance
  - Linter passes all security checks

### 🔧 Technical Improvements
- **Enhanced Error Handling** : Improved user feedback with detailed English messages
- **Parameter Validation** : Better validation with clear English error messages
- **Documentation** : Professional English documentation structure

## [2.4.68] - 2025-01-10

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
