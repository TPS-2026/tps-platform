# Accessibilité – WCAG 2.1 niveau AA

## Déclaration de conformité

**État de conformité :** Ce site web est **partiellement conforme** aux règles d'accessibilité numérique (WCAG 2.1 – niveau AA).

La déclaration détaillée et le dispositif de signalement sont disponibles sur la page [Accessibilité](/accessibility) (lien en pied de page).

---

## Audit rapide – points conformes ou améliorés

| Critère WCAG 2.1 | Statut | Remarque |
|------------------|--------|----------|
| **1.1.1** Contenu non textuel (alternatives) | ✅ Partiel | Images avec `alt` (logo, carousel, actualités). Icônes décoratives avec `aria-hidden="true"`. |
| **1.3.1** Info et relations | ✅ Partiel | Structure de titres (h1, h2, h3), sections avec `aria-labelledby`. Formulaires avec labels. |
| **1.4.3** Contraste (niveau AA) | ✅ Partiel | Modes clair/sombre avec contrastes suffisants. À vérifier ponctuellement (textes en gradient). |
| **2.1.1** Clavier | ✅ Partiel | Toutes les actions accessibles au clavier. Carousel à renforcer (navigation clavier). |
| **2.1.2** Pas de piège au clavier | ✅ | Pas de piège identifié. |
| **2.4.1** Contourner des blocs | ✅ | Lien « Aller au contenu principal » (skip link) en début de page. |
| **2.4.3** Ordre du focus | ✅ | Ordre logique du focus. |
| **2.4.4** Fonction du lien | ✅ | Liens et boutons explicites. |
| **2.4.7** Focus visible | ✅ | Focus visible sur liens, boutons (ring bleu) et champs. |
| **3.1.1** Langue de la page | ✅ | `lang="fr-FR"` dans `index.html`. À adapter dynamiquement si langue change (i18n). |
| **4.1.2** Nom, rôle, valeur | ✅ Partiel | Boutons avec `aria-label` (thème, langue, réseaux sociaux). Champs de formulaire associés à des labels. |

---

## Limites connues (conformité partielle)

- **Carousel** : navigation au clavier et annonces pour lecteurs d'écran à renforcer.
- **Contenus tiers** : liens réseaux sociaux, cartes, etc. – accessibilité non maîtrisée.
- **Documents PDF** : s’il y en a, ils peuvent ne pas être balisés pour l’accessibilité.
- **Texte en gradient** : vérifier le contraste selon les couleurs (mode clair/sombre).

---

## Recommandations pour tendre vers la conformité totale

1. **Carousel** : ajouter `role="region"`, `aria-label`, contrôles accessibles au clavier (flèches, pause).
2. **Formulaire de candidature** : s’assurer que tous les champs ont un `<label>` ou `aria-label` et que les erreurs sont annoncées.
3. **Modales / dialogues** : piège au clavier géré (focus trap), fermeture à Échap, focus retour sur l’élément déclencheur.
4. **Langue** : mettre à jour l’attribut `lang` du document selon la langue sélectionnée (i18n).
5. **Tests** : utiliser un lecteur d’écran (NVDA, VoiceOver) et un outil automatisé (axe DevTools, WAVE) pour valider régulièrement.

---

*Dernière mise à jour : janvier 2026.*
