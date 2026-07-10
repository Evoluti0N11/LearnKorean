# Français au Quotidien — 30 jours 🕯️

Application web (mobile-first) pour pratiquer **la prononciation et la conversation en français** au quotidien, en mélangeant vie de tous les jours (famille, sport, nourriture, voyages...) et **romantisme littéraire français** (Chateaubriand, Hugo, Lamartine, Musset, Vigny, Nerval, Sand, Gautier...) comme fil culturel.

Aucun serveur, aucune base de données : tout tourne dans le navigateur. La progression est sauvegardée automatiquement dans le **stockage local du navigateur** (`localStorage`), sur l'appareil de l'utilisateur.

## ✨ Fonctionnalités

- **Parcours de 30 jours** qui se débloque automatiquement, un jour par jour, à partir de la première visite (les jours précédents restent toujours accessibles pour réviser).
- **Écoute en français** : chaque mot, phrase et texte peut être lu à voix haute par le navigateur (synthèse vocale / `speechSynthesis`).
- **Reconnaissance vocale** : bouton micro qui écoute la prononciation de l'utilisateur et la compare au mot/à la phrase cible, avec un retour immédiat (`SpeechRecognition`, l'« IA » de reconnaissance vocale intégrée au navigateur).
- **Exercices variés chaque jour** : virelangue d'échauffement, vocabulaire avec API et astuces pour italophones, texte à écouter + question de compréhension, questions de conversation à répondre à voix haute, défi oral final.
- **Jours de révision éclair** (tous les 5 jours) qui repiochent des mots des jours précédents.
- **Gamification** : XP, niveaux, série de jours consécutifs, badges à débloquer, et une **bibliothèque de fiches « ex-libris »** : chaque jour de littérature débloque une carte-concept collectible (Le Mal du siècle, Le Sublime, L'art pour l'art...).
- **Pensé comme une app mobile** : peut être ajoutée à l'écran d'accueil (PWA) sur téléphone, fonctionne hors-ligne une fois visitée une première fois.

## 📁 Structure du projet

```
index.html      → structure de la page (à ouvrir / déployer)
style.css       → tous les styles (palette « nuit romantique », mobile-first)
data.js         → les 30 jours de contenu (vocabulaire, textes, questions, badges)
app.js          → logique de l'application (état, voix, micro, navigation)
manifest.json   → configuration PWA (icône, nom, couleurs)
sw.js           → service worker (cache hors-ligne basique)
icon.svg        → icône de l'application
```

Aucune étape de build n'est nécessaire : ce sont des fichiers statiques.

## 🚀 Déployer sur GitHub Pages

1. Crée un nouveau dépôt GitHub (ex. `francais-30-jours`).
2. Ajoute tous les fichiers de ce dossier à la racine du dépôt (pas dans un sous-dossier), puis commit + push.
3. Dans le dépôt : **Settings → Pages**.
4. Dans « Build and deployment », choisis **Source : Deploy from a branch**, puis branche `main` et dossier `/ (root)`.
5. Sauvegarde. Après une minute ou deux, le site est disponible à une adresse du type :
   `https://<ton-nom-utilisateur>.github.io/francais-30-jours/`
6. Ouvre cette adresse sur ton téléphone et utilise « Ajouter à l'écran d'accueil » (Chrome/Android) ou « Sur l'écran d'accueil » (Safari/iOS) pour l'utiliser comme une vraie application.

GitHub Pages sert le site en HTTPS automatiquement, ce qui est nécessaire pour que le micro (reconnaissance vocale) fonctionne.

### Utilisation en local (sans GitHub)

Le micro exige un contexte sécurisé (HTTPS) ou `localhost`. Ouvrir directement `index.html` avec un double-clic (`file://`) peut bloquer le micro selon les navigateurs. Pour tester en local, lance un petit serveur, par exemple :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## 🌐 Compatibilité navigateur

| Fonctionnalité | Chrome / Edge (Android, Windows, Mac) | Safari (iOS/Mac) | Firefox |
|---|---|---|---|
| Écoute (voix française) | ✅ | ✅ | ✅ |
| Micro / reconnaissance vocale | ✅ (recommandé) | ⚠️ Support partiel/variable | ❌ Non supporté |

Pour la meilleure expérience (surtout les exercices de prononciation avec micro), **utiliser Google Chrome ou Microsoft Edge**, sur ordinateur ou sur téléphone Android. L'application le signale automatiquement dans les Réglages si le navigateur ne supporte pas le micro.

## 🔒 Confidentialité des données

- Toute la progression (jours terminés, XP, badges, préférences) est stockée uniquement dans le navigateur de l'utilisateur (`localStorage`), jamais envoyée à un serveur.
- La reconnaissance vocale et la synthèse vocale utilisent les API natives du navigateur ; selon le navigateur, l'audio peut être traité par un service en ligne (ex. serveurs vocaux de Google dans Chrome) pour produire le texte reconnu — aucune donnée n'est stockée ou envoyée par cette application elle-même.
- « Réinitialiser toute la progression » (dans Réglages) efface définitivement les données locales.

## 🎨 Personnalisation rapide

- **Contenu** : tout le programme des 30 jours (vocabulaire, textes, questions, défis, badges) est dans `data.js`, en clair, facile à modifier ou étendre.
- **Palette et typographie** : variables CSS en haut de `style.css` (`:root`).
- **Icône** : remplace `icon.svg` par ton propre logo (garde le même nom de fichier, ou mets à jour `manifest.json` et `index.html`).

Bon apprentissage — et bon romantisme ! 🕯️📖
