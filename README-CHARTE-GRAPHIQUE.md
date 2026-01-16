# Charte Graphique - TPS Platform

## Génération du PDF

### Méthode 1 : Via le navigateur (Recommandé)

1. Ouvrez le fichier `charte-graphique.html` dans votre navigateur (Chrome, Firefox, Safari, etc.)
2. Utilisez la fonction "Imprimer" de votre navigateur (Cmd+P sur Mac, Ctrl+P sur Windows/Linux)
3. Sélectionnez "Enregistrer en PDF" comme destination
4. Configurez les options :
   - Format : A4
   - Marges : Normales ou Personnalisées
   - Graphiques d'arrière-plan : Activé
5. Enregistrez le fichier

### Méthode 2 : Via Node.js avec Puppeteer

Si vous avez Puppeteer installé :

```bash
npm install --save-dev puppeteer
npm run generate-pdf
```

Le PDF sera généré dans `charte-graphique-tps-platform.pdf`

### Méthode 3 : Via des outils en ligne

Vous pouvez utiliser des services en ligne comme :
- HTML to PDF (https://www.html2pdf.com/)
- PDF24 (https://tools.pdf24.org/fr/html-vers-pdf)
- SmallPDF (https://smallpdf.com/html-to-pdf)

## Contenu de la Charte Graphique

Le document inclut :

1. **Couleurs Principales** - Palette complète avec codes hexadécimaux
2. **Dégradés** - Tous les gradients utilisés sur le site
3. **Typographie** - Famille de police, tailles, poids
4. **Composants UI** - Boutons, formulaires, cartes
5. **Effets Visuels** - Glassmorphism, ombres, bordures
6. **Espacements** - Système de spacing cohérent
7. **États Interactifs** - Hover, focus, active
8. **Responsive Design** - Breakpoints et principes
9. **Animations** - Transitions et animations CSS
10. **Règles d'Utilisation** - Guide de bonnes pratiques

## Notes

- Le document est optimisé pour l'impression en format A4
- Toutes les couleurs sont documentées avec leurs codes exacts
- Les exemples visuels sont inclus pour chaque élément
- Le document peut être utilisé comme référence pour les développeurs et designers






