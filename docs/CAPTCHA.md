# Protection CAPTCHA (Cloudflare Turnstile)

Le site utilise **Cloudflare Turnstile** pour limiter le spam, les bots et les abus (ex. envoi massif de formulaires).

## Où c’est actif

- **Page Contact** (`/contact`) : le formulaire ne peut être envoyé qu’après validation du CAPTCHA (si une clé est configurée).
- **Formulaire de candidature** (`/jobs/:id/apply`) : le token Turnstile est envoyé avec la candidature ; le backend doit le vérifier.

## Configuration frontend

1. Créez un widget Turnstile dans le [tableau de bord Cloudflare](https://dash.cloudflare.com/) (Turnstile).
2. Récupérez la **site key** (publique).
3. Dans le projet, créez un fichier `.env` à la racine (ou `.env.local`) :

```env
VITE_TURNSTILE_SITE_KEY=votre_site_key_ici
```

4. Redémarrez le serveur de dev (`npm run dev`). Le widget s’affiche sur les formulaires Contact et Candidature.

**Sans clé** : les formulaires restent utilisables (message “CAPTCHA non configuré” en dev). En production, il est recommandé de définir la clé.

## Vérification côté backend (obligatoire pour la candidature)

Pour le formulaire de **candidature**, le front envoie un champ `turnstileToken` dans le body. Le backend **doit** vérifier ce token auprès de Cloudflare avant d’accepter la candidature.

### API Siteverify (Cloudflare)

- **URL** : `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`
- **Body** (formulaire ou JSON) :
  - `secret` : votre **secret key** (ne jamais l’exposer côté front).
  - `response` : la valeur de `turnstileToken` reçue du front.

Exemple avec cURL :

```bash
curl -X POST "https://challenges.cloudflare.com/turnstile/v0/siteverify" \
  -d "secret=VOTRE_SECRET_KEY" \
  -d "response=TOKEN_RECU_DU_FRONT"
```

Réponse succès (JSON) : `{ "success": true, ... }`. Si `success` est `false`, rejeter la requête (400 ou 403).

### Règles importantes

- Un token **n’est valable qu’une fois** : après vérification, il ne doit plus être accepté.
- Un token **expire** après 5 minutes (300 secondes).
- Consulter la [doc Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) pour les détails.

## Test sans Cloudflare

Cloudflare fournit des clés de **test** pour le développement :

- **Site key (test)** : `1x00000000000000000000AA`
- **Secret key (test)** : `1x0000000000000000000000000000000AA`

Avec ces clés, le widget s’affiche et le test passe toujours. En production, utilisez vos vraies clés.
