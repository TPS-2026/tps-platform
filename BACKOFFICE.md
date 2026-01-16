# Back Office - Guide d'utilisation

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer le serveur API (dans un terminal) :
```bash
npm run server
```

3. Démarrer le frontend (dans un autre terminal) :
```bash
npm run dev
```

## Accès au Back Office

Une fois les serveurs démarrés, accédez au back office via :
- **Dashboard** : http://localhost:5173/backoffice
- **Gestion des offres d'emploi** : http://localhost:5173/backoffice/jobs
- **Gestion des articles** : http://localhost:5173/backoffice/news

## Fonctionnalités

### Gestion des offres d'emploi

- **Créer une nouvelle offre** : Cliquez sur "Nouvelle offre" et remplissez le formulaire
- **Modifier une offre** : Cliquez sur l'icône crayon à côté de l'offre
- **Supprimer une offre** : Cliquez sur l'icône poubelle à côté de l'offre

**Champs disponibles :**
- Titre (obligatoire)
- Secteur : Télécoms Fibre ou BTP
- Localisation (obligatoire)
- Type de contrat : Régie, TJM ou Package
- TJM (optionnel)
- Description (obligatoire)
- Profil recherché (liste d'éléments, un par ligne)
- Missions (liste d'éléments, un par ligne)
- Avantages (liste d'éléments, un par ligne)

### Gestion des articles

- **Créer un nouvel article** : Cliquez sur "Nouvel article" et remplissez le formulaire
- **Modifier un article** : Cliquez sur l'icône crayon à côté de l'article
- **Supprimer un article** : Cliquez sur l'icône poubelle à côté de l'article

**Champs disponibles :**
- Titre (obligatoire)
- Catégorie (optionnel)
- Extrait (résumé court, optionnel)
- Contenu (obligatoire)
- Publier immédiatement (case à cocher)

## Stockage des données

Les données sont stockées dans des fichiers JSON locaux :
- `data/jobs.json` : Toutes les offres d'emploi
- `data/news.json` : Tous les articles

Ces fichiers sont créés automatiquement lors de la première utilisation.

## API Endpoints

Le serveur Express expose les endpoints suivants :

### Jobs
- `GET /api/jobs` - Liste toutes les offres (avec filtres optionnels)
- `GET /api/jobs/:id` - Récupère une offre spécifique
- `POST /api/jobs` - Crée une nouvelle offre
- `PUT /api/jobs/:id` - Met à jour une offre
- `DELETE /api/jobs/:id` - Supprime une offre

### News
- `GET /api/news` - Liste tous les articles (avec pagination)
- `GET /api/news/:id` - Récupère un article spécifique
- `POST /api/news` - Crée un nouvel article
- `PUT /api/news/:id` - Met à jour un article
- `DELETE /api/news/:id` - Supprime un article








