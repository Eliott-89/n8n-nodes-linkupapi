# Changelog

## [4.0.15] - 2024-08-12

### Fixed
- **Credentials**: Ajout de la section `authenticate` manquante dans le fichier de credentials
- **Credentials**: Ajout de la section `test` pour la vérification des credentials
- **Credentials**: Ajout des imports manquants `IAuthenticateGeneric` et `ICredentialTestRequest`
- **Linting**: Correction de la configuration ESLint pour supporter TypeScript
- **Compliance**: Conformité aux guidelines de vérification n8n pour les credentials

### Technical
- Mise à jour de la configuration ESLint pour éviter les erreurs de parsing TypeScript
- Amélioration de la structure des credentials selon les standards n8n
- Correction de l'authentification générique avec l'API key dans les headers

## [4.0.14] - Version précédente
- Version initiale avec fonctionnalités de base
