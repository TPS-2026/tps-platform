# TPS Platform

Plateforme web pour TPS - Ingénierie & Expertise Terrain

## Description

TPS met à disposition de ses clients des ingénieurs et techniciens autour de deux axes majeurs :
- **Télécoms fibre (FTTH)** : ingénierie d'études, techniciens FTTH, conduite de travaux, déploiement
- **BTP / ingénierie terrain** : chefs d'équipe/chantier, secrétariat technique, fonctions de coordination terrain

Cette plateforme web permet de :
- Publier et consulter des offres d'emploi
- Gérer les candidatures
- Publier des actualités et la vie de l'entreprise
- Présenter les services et la proposition de valeur de TPS

## Technologies

- **Vue 3** - Framework JavaScript
- **Vite** - Build tool
- **PrimeVue** - UI Component Library
- **Pinia** - State Management
- **Vue Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le serveur de développement sera accessible sur `http://localhost:5173`

## Build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

## Structure du projet

```
tps-platform/
├── src/
│   ├── components/        # Composants réutilisables
│   ├── router/            # Configuration des routes
│   ├── stores/            # Stores Pinia (account, jobs, news)
│   ├── utils/             # Utilitaires
│   ├── views/             # Pages/Vues
│   │   ├── Connection/    # Pages de connexion/inscription
│   │   ├── Jobs/          # Pages liées aux offres d'emploi
│   │   └── News/          # Pages d'actualités
│   ├── App.vue            # Composant racine
│   └── main.js            # Point d'entrée
├── public/                # Fichiers statiques
└── package.json
```

## Fonctionnalités principales

### Pour les candidats
- Consultation des offres d'emploi avec filtres (secteur, localisation, type de contrat)
- Détails des offres
- Formulaire de candidature avec upload de CV
- Suivi des candidatures

### Pour les clients
- Présentation des services TPS
- Proposition de valeur
- Informations sur les secteurs d'activité
- Contact et demande de devis

### Actualités
- Publication d'articles et actualités
- Vie de l'entreprise
- Projets et réalisations

## Configuration API

Les URLs de l'API sont configurées dans les stores :
- `src/stores/account.js`
- `src/stores/jobs.js`
- `src/stores/news.js`

Par défaut, elles pointent vers :
- Production : `https://api.tps-platform.com`
- Développement : `http://localhost:3000/api`

## Variables d'environnement

Créer un fichier `.env` pour configurer les variables d'environnement :

```env
VITE_API_URL=http://localhost:3000/api
```

## Notes

- Le projet utilise PrimeVue avec le thème Aura en mode sombre
- La couleur primaire est configurée en bleu (#0066CC)
- Les stores sont prêts à être connectés à une API backend
- Les formulaires de candidature supportent l'upload de fichiers PDF

