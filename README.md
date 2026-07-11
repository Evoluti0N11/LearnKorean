# Français au Quotidien — 30 jours 🕯️🗺️

Application web (mobile-first) pour pratiquer **la prononciation et la conversation en français** au quotidien, en mélangeant vie de tous les jours (famille, sport, nourriture, voyages...) et **romantisme littéraire français** (Chateaubriand, Hugo, Lamartine, Musset, Vigny, Nerval, Sand, Gautier...), avec en fil rouge une **carte littéraire de toute la France** qui se dévoile au fil du parcours — du romantisme jusqu'à ses héritiers (réalisme, naturalisme, symbolisme, existentialisme...).

Aucun serveur, aucune base de données, aucune clé d'API à payer ou configurer : tout tourne dans le navigateur, avec deux services publics et gratuits (OpenStreetMap et Wikipédia). La progression est sauvegardée automatiquement dans le **stockage local du navigateur** (`localStorage`), sur l'appareil de l'utilisateur.

## ✨ Fonctionnalités

### Apprentissage actif
- **Parcours de 30 jours** qui se débloque automatiquement, un jour par jour, à partir de la première visite (les jours précédents restent toujours accessibles pour réviser).
- **Exercices actifs, pas juste cliquables** : chaque étape (échauffement, vocabulaire, écoute, conversation, défi) doit être réellement pratiquée au micro (ou au quiz) avant de pouvoir avancer — avec un lien discret « continuer quand même » en cas de souci technique avec le micro.
- **Écoute en français** : chaque mot, phrase et texte peut être lu à voix haute par le navigateur (synthèse vocale / `speechSynthesis`).

### Vérification de prononciation par IA vocale
- Bouton micro qui utilise la reconnaissance vocale du navigateur (`SpeechRecognition`, la même technologie de reconnaissance vocale par IA que celle intégrée à Chrome/Android) pour t'écouter et comparer ce que tu dis au mot ou à la phrase cible.
- **Diagnostic mot-par-mot** : les mots bien reconnus s'affichent en vert, ceux à retravailler sont soulignés.
- **Diagnostic lettre-par-lettre sur le mot posant problème** : l'app repère automatiquement quel mot n'a pas été reconnu, le compare précisément à ce qu'elle a entendu, et met en évidence exactement quelle partie du mot (quel son) diffère — pour savoir précisément quoi corriger.
- **Conseil ciblé** : quand la prononciation n'est pas encore parfaite, l'astuce phonétique du mot du jour (déjà présente dans le vocabulaire) est remise sous tes yeux pour t'aider à progresser, plutôt que de simplement dire « faux ».

### Conversation plus vivante
- Après chaque réponse orale, une petite réaction en français s'affiche, pour donner un vrai rythme d'échange plutôt qu'un simple quiz.
- **Jours de révision éclair** (tous les 5 jours) qui repiochent des mots des jours précédents.

### Carte littéraire de toute la France (OpenStreetMap + Wikipédia, gratuits)
- Une **carte de France entière façon « brouillard de guerre »** : au départ, tout le pays est voilé. Chaque jour « Romantisme » terminé dévoile **deux vrais lieux** d'un coup :
  - 📖 un lieu **du romantisme**, directement lié à l'auteur ou au concept du jour ;
  - 🔭 un lieu **« qui prolonge » ce thème plus tard dans l'histoire littéraire** (réalisme, naturalisme, symbolisme, XXe siècle...) — pour voir comment le romantisme irrigue toute la suite de la littérature française, partout dans le pays (Bretagne, Normandie, Provence, Bourgogne, Berry, Ardennes...).
- 30 lieux au total, chacun avec sa région et son courant littéraire affichés.
- Fond de carte **OpenStreetMap** via Leaflet (bibliothèque embarquée localement, pas de CDN, pas de clé), avec une vue qui s'ajuste automatiquement à la taille de l'écran (idéal sur téléphone).
- Chaque lieu débloqué affiche une **photo et un court résumé récupérés automatiquement via l'API publique de Wikipédia** (gratuite, sans clé), une anecdote bonus écrite à la main, et un lien vers l'article complet — avec repli silencieux et propre si l'appareil est hors-ligne.
- Les lieux verrouillés apparaissent en **gris avec un cadenas**, à leur emplacement réel sur la carte, pour donner envie de les découvrir.
- Les fiches de la **bibliothèque de concepts** sont reliées à leur lieu : un lien « Voir sur la carte » fait le pont entre la notion littéraire et l'endroit réel.

### Gamification
- XP, niveaux, série de jours consécutifs (streak), badges à débloquer.
- **Bibliothèque « ex-libris »** : chaque jour de littérature débloque une carte-concept collectible, avec photo dès qu'elle est disponible (Le Mal du siècle, Le Sublime, L'art pour l'art...).

### Pensée comme une app mobile
- Interface mobile-first, navigation par onglets en bas d'écran, transitions douces entre les étapes, carte tactile pensée pour l'écran tactile (zoom, glisser, popups adaptées à la largeur de l'écran).
- Peut être ajoutée à l'écran d'accueil (PWA) sur téléphone, fonctionne hors-ligne (coquille de l'app) une fois visitée une première fois.

## 📁 Structure du projet

```
index.html        → structure de la page (à ouvrir / déployer)
style.css          → tous les styles (palette « nuit romantique », mobile-first)
data.js            → les 30 jours de contenu (vocabulaire, textes, questions, badges)
locations.js       → les 30 lieux littéraires de France (coordonnées, notes, anecdotes, page Wikipédia)
map.js             → la carte (Leaflet + OpenStreetMap), le brouillard, l'appel à Wikipédia
app.js             → logique de l'application (état, voix, micro, diagnostic IA, navigation, progression active)
manifest.json      → configuration PWA (icône, nom, couleurs)
sw.js              → service worker (cache hors-ligne basique)
icon.svg           → icône de l'application
vendor/leaflet/    → bibliothèque Leaflet embarquée localement (JS + CSS + images)
```

Aucune étape de build n'est nécessaire : ce sont des fichiers statiques.

## 🚀 Déployer sur GitHub Pages

1. Crée un nouveau dépôt GitHub (ex. `francais-30-jours`).
2. Ajoute tous les fichiers **et le dossier `vendor/`** de ce projet à la racine du dépôt (pas dans un sous-dossier), puis commit + push.
3. Dans le dépôt : **Settings → Pages**.
4. Dans « Build and deployment », choisis **Source : Deploy from a branch**, puis branche `main` et dossier `/ (root)`.
5. Sauvegarde. Après une minute ou deux, le site est disponible à une adresse du type :
   `https://<ton-nom-utilisateur>.github.io/francais-30-jours/`
6. Ouvre cette adresse sur ton téléphone et utilise « Ajouter à l'écran d'accueil » (Chrome/Android) ou « Sur l'écran d'accueil » (Safari/iOS) pour l'utiliser comme une vraie application.

GitHub Pages sert le site en HTTPS automatiquement, ce qui est nécessaire pour que le micro (reconnaissance vocale) **et** les appels à l'API Wikipédia fonctionnent correctement (ils sont bloqués depuis un simple fichier ouvert en local avec `file://`).

### Utilisation en local (sans GitHub)

Le micro et l'appel à Wikipédia exigent un contexte sécurisé (HTTPS) ou `localhost`. Pour tester en local :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## 🌐 Compatibilité navigateur

| Fonctionnalité | Chrome / Edge (Android, Windows, Mac) | Safari (iOS/Mac) | Firefox |
|---|---|---|---|
| Écoute (voix française) | ✅ | ✅ | ✅ |
| Micro / vérification IA de prononciation | ✅ (recommandé) | ⚠️ Support partiel/variable | ❌ Non supporté |
| Carte (Leaflet/OpenStreetMap) | ✅ | ✅ | ✅ |
| Photos de lieux (API Wikipédia) | ✅ (si en ligne) | ✅ (si en ligne) | ✅ (si en ligne) |

Pour la meilleure expérience (surtout les exercices de prononciation avec micro), **utiliser Google Chrome ou Microsoft Edge**, sur ordinateur ou sur téléphone Android. L'application le signale automatiquement dans les Réglages si le navigateur ne supporte pas le micro. Si le micro ne fonctionne pas (navigateur non compatible, permission refusée), un lien « continuer quand même » permet de ne jamais rester bloqué.

## 🗺️ À propos de la carte, de l'IA vocale et des photos

- Le fond de carte est fourni par **OpenStreetMap**, un projet cartographique libre et gratuit. L'attribution « © OpenStreetMap contributors » est affichée sur la carte, comme l'exige leur licence. Pour un usage personnel/éducatif comme celui-ci, l'utilisation directe des tuiles `tile.openstreetmap.org` est acceptable ; pour un usage à très grande échelle, prévoir un fournisseur de tuiles dédié (voir la [politique d'utilisation d'OpenStreetMap](https://operations.osmfoundation.org/policies/tiles/)).
- Les photos et résumés proviennent de l'**API publique de Wikipédia** (`fr.wikipedia.org/api/rest_v1/page/summary/...`), gratuite et sans clé. Chaque fiche renvoie vers l'article complet pour aller plus loin. Les résultats sont mis en cache dans le navigateur pour éviter des appels répétés.
- La **vérification de prononciation** utilise `SpeechRecognition`, l'API de reconnaissance vocale par IA embarquée dans le navigateur (gratuite, sans clé, aucune donnée envoyée à un serveur propre à l'application). L'app y ajoute son propre diagnostic (comparaison mot-par-mot puis lettre-par-lettre) pour repérer précisément où se situe l'erreur.
- Les 30 lieux, leurs liens avec les auteurs et leurs anecdotes sont rédigés à la main dans `locations.js` — libre à toi de corriger, préciser ou étendre ces notes.

## 🔒 Confidentialité des données

- Toute la progression (jours terminés, XP, badges, préférences, cache des photos) est stockée uniquement dans le navigateur de l'utilisateur (`localStorage`), jamais envoyée à un serveur propre à l'application.
- La reconnaissance vocale et la synthèse vocale utilisent les API natives du navigateur ; selon le navigateur, l'audio peut être traité par un service en ligne (ex. serveurs vocaux de Google dans Chrome) pour produire le texte reconnu.
- L'appel à l'API Wikipédia envoie uniquement le titre de la page recherchée (aucune donnée personnelle).
- « Réinitialiser toute la progression » (dans Réglages) efface définitivement les données locales, y compris le cache des photos.

## 🎨 Personnalisation rapide

- **Contenu des 30 jours** : `data.js`.
- **Lieux de la carte** : `locations.js` (coordonnées `lat`/`lon`, titre Wikipédia, note personnelle, anecdote `extra`, `kind: "core"` ou `"extension"`).
- **Palette et typographie** : variables CSS en haut de `style.css` (`:root`).
- **Icône** : remplace `icon.svg` par ton propre logo (garde le même nom de fichier, ou mets à jour `manifest.json` et `index.html`).

Bon apprentissage — et bonne balade à travers la France littéraire ! 🕯️📖🗺️

