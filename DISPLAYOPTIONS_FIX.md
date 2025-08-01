# Correction de l'erreur "Could not resolve parameter dependencies"

## Problème
L'erreur "Could not resolve parameter dependencies. Max iterations reached!" se produisait à cause des `displayOptions` imbriqués dans les paramètres enfants des collections n8n.

## Cause
Dans n8n, quand vous avez des `displayOptions` sur des paramètres enfants dans une collection ou fixedCollection, cela peut créer des dépendances circulaires qui empêchent la résolution des paramètres.

## Solution appliquée

### 1. Suppression des displayOptions imbriqués
J'ai supprimé tous les `displayOptions` des paramètres enfants dans les collections suivantes :

- **postsParams** : Supprimé les displayOptions de `reactionType`, `messageText`, `duration`, `durationStartTime`, `total_results`, `start_page`, `end_page`
- **searchParams** : Supprimé les displayOptions de `location`, `company_url`, `school_url`, `network`, `sector`, `company_size`, `first_name`, `last_name`, `title`, `fetch_invitation_state`, `industry`, `employee_range`, `founding_company`, `job_title`, `school`, `current_company`, `post_type`, `sort_by`, `post_date`, `linkedin_url`
- **networkListParams** : Supprimé les displayOptions de `invitation_type`
- **recruiterParams** : Supprimé les displayOptions de `yearsOfExperience`, `sortType`, `sortOrder`, `ratings`, `start`

### 2. Conservation des displayOptions au niveau des collections
Les `displayOptions` ont été conservés uniquement au niveau des collections parentes pour contrôler leur affichage selon l'opération sélectionnée.

### 3. Logique de traitement maintenue
La logique dans `buildRequestBody()` a été maintenue pour traiter correctement les paramètres selon l'opération, même sans les `displayOptions` imbriqués.

## Résultat
- ✅ L'erreur de dépendances de paramètres est résolue
- ✅ Tous les nœuds fonctionnent correctement
- ✅ La compilation TypeScript passe sans erreur
- ✅ Le package version 1.2.10 a été publié avec succès

## Impact sur l'utilisateur
- Les paramètres sont maintenant toujours visibles dans les collections, mais seuls ceux pertinents pour l'opération sélectionnée seront utilisés
- L'interface reste fonctionnelle et intuitive
- Aucune perte de fonctionnalité

## Fichiers modifiés
- `nodes/Linkup/Linkup.node.ts` : Suppression des displayOptions imbriqués
- `package.json` : Version incrémentée à 1.2.10
- `fix-displayoptions-issue.sh` : Script de publication créé

## Version publiée
- **Version** : 1.2.10
- **Package** : n8n-nodes-linkup-v2
- **Statut** : ✅ Publié avec succès sur npm 