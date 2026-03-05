# Migration vers le nouveau backend Railway

## Configuration

Le frontend a été mis à jour pour utiliser le nouveau backend hébergé sur Railway :
- **URL de production** : `https://tps-backend-production-97ce.up.railway.app/api`

## Changements effectués

### 1. Configuration centralisée
- Création de `src/config/api.js` pour centraliser l'URL de l'API
- Utilisation de la variable d'environnement `VITE_API_BASE_URL` pour la configuration

### 2. Stores mis à jour
- `src/stores/jobs.js` - Utilise la nouvelle URL
- `src/stores/news.js` - Utilise la nouvelle URL
- `src/stores/account.js` - Mis à jour pour correspondre aux nouveaux endpoints

### 3. Composants BackOffice mis à jour
- `src/views/BackOffice/JobsManagement.vue`
- `src/views/BackOffice/ApplicationsManagement.vue`
- `src/views/BackOffice/NewsManagement.vue`
- `src/views/BackOffice/Dashboard.vue`

### 4. Endpoints d'authentification

#### Changements dans les réponses API

**Login** (`POST /api/auth/login`)
- Ancien format : `{access_token, user_id, access_token_expires_in, ...}`
- Nouveau format : `{token, user: {id, email, fullName, role, ...}}`

**Get Current User** (`GET /api/users/me`)
- Ancien endpoint : `/api/user/me`
- Nouveau endpoint : `/api/users/me`
- Retourne : `{id, email, fullName, role, createdAt, updatedAt}`

**User Registration**
- Ancien endpoint : `POST /api/auth/register` (public)
- Nouveau endpoint : `POST /api/users` (admin only, nécessite authentification)
- ⚠️ **Important** : L'inscription publique n'est plus disponible. Les utilisateurs doivent être créés par un administrateur.

**Password Reset**
- ⚠️ **Non implémenté** dans le nouveau backend
- Les fonctions `askResetPassword` et `submitResetPassword` retournent maintenant une erreur

## Utilisation

### Développement local

Pour utiliser un backend local pendant le développement :

1. Créer un fichier `.env` :
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

2. Redémarrer le serveur de développement :
```bash
npm run dev
```

### Production

Par défaut, le frontend utilise l'URL Railway. Aucune configuration supplémentaire n'est nécessaire.

## Structure des réponses API

### Jobs
- `GET /api/jobs` - Liste des jobs
- `GET /api/jobs/{id}` - Détails d'un job
- `POST /api/jobs` - Créer un job (auth requise)
- `PUT /api/jobs/{id}` - Mettre à jour un job (auth requise)
- `DELETE /api/jobs/{id}` - Supprimer un job (auth requise)

### News
- `GET /api/news` - Liste des articles
- `GET /api/news/{id}` - Détails d'un article
- `POST /api/news` - Créer un article (auth requise)
- `PUT /api/news/{id}` - Mettre à jour un article (auth requise)
- `DELETE /api/news/{id}` - Supprimer un article (auth requise)

### Applications
- `GET /api/applications` - Liste des candidatures (auth requise)
- `GET /api/applications/{id}` - Détails d'une candidature (auth requise)
- `POST /api/applications` - Créer une candidature (public)
- `PUT /api/applications/{id}` - Mettre à jour une candidature (auth requise)
- `DELETE /api/applications/{id}` - Supprimer une candidature (auth requise)

### Auth & Users
- `POST /api/auth/login` - Connexion
- `GET /api/users/me` - Obtenir l'utilisateur actuel (auth requise)
- `POST /api/users` - Créer un utilisateur (admin only, auth requise)

## Authentification

Tous les endpoints protégés nécessitent un header `Authorization` :
```
Authorization: Bearer <JWT_TOKEN>
```

Le token JWT est obtenu via `POST /api/auth/login` et doit être stocké dans le localStorage.

## Notes importantes

1. **CORS** : Assurez-vous que le backend Railway autorise les requêtes depuis votre domaine frontend
2. **HTTPS** : Le backend Railway utilise HTTPS, donc toutes les requêtes doivent être en HTTPS en production
3. **Variables d'environnement** : Les variables d'environnement Vite doivent commencer par `VITE_` pour être accessibles dans le code client


