# Mise à jour des nœuds de données Linkup

## Résumé des modifications

Les nœuds de données ont été mis à jour pour correspondre exactement aux spécifications de l'API Linkup.

### Nœuds mis à jour

1. **📊 DATA | Search companies (Data)** - `searchCompaniesData`
2. **📊 DATA | Search profiles (Data)** - `searchProfilesData`

### Endpoints API

- **Companies Data**: `POST /data/search/companies`
- **Profiles Data**: `POST /data/search/profiles`

### Paramètres mis à jour

#### Search Companies Data
- `keyword` - Mot-clé de recherche pour les entreprises
- `industry` - Secteur d'activité de l'entreprise
- `location` - Localisation géographique de l'entreprise
- `employee_range` - Plage d'employés (ex: 1-10, 11-50, 51-200, 201-500, 501-1000, 1001+)
- `founding_company` - Filtrer uniquement les entreprises fondatrices (boolean)
- `total_results` - Nombre maximum de résultats à retourner

#### Search Profiles Data
- `keyword` - Mot-clé de recherche pour les profils
- `job_title` - Titre du poste actuel ou recherché
- `industry` - Secteur d'activité du profil
- `school` - École ou université fréquentée
- `location` - Localisation géographique du profil
- `current_company` - Entreprise où travaille actuellement le profil
- `total_results` - Nombre maximum de résultats à retourner

### Améliorations apportées

1. **Sections de paramètres séparées** : Les nœuds de données ont maintenant leurs propres sections de paramètres pour une meilleure organisation
2. **Paramètres conformes à l'API** : Tous les paramètres correspondent exactement aux spécifications de l'API Linkup
3. **Interface utilisateur améliorée** : Les paramètres sont mieux organisés et plus clairs
4. **Validation des données** : Les paramètres sont correctement transmis à l'API

### Exemples d'utilisation

#### Recherche d'entreprises
```json
{
  "keyword": "tech",
  "industry": "Technology",
  "location": "San Francisco",
  "employee_range": "51-200",
  "founding_company": true,
  "total_results": 100
}
```

#### Recherche de profils
```json
{
  "keyword": "software engineer",
  "job_title": "Senior Developer",
  "industry": "Technology",
  "school": "Stanford University",
  "location": "California",
  "current_company": "Google",
  "total_results": 100
}
```

### Version

Cette mise à jour fait partie de la version **1.2.12** du package n8n-nodes-linkup.

### Statut

✅ **Terminé** - Les nœuds de données sont maintenant conformes aux spécifications de l'API Linkup et prêts à être utilisés. 