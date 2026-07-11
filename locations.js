/* ============================================================
   Carte littéraire de Paris — 15 lieux réels, un par jour
   « Romantisme » (+ le Grand Bilan final)
   Chaque lieu est relié au jour qui le débloque sur la carte.
   wikiTitle = titre de la page Wikipédia en français utilisée
   pour récupérer une image + un court résumé via l'API publique.
   ============================================================ */

const PARIS_LOCATIONS = [
  {
    day: 2, id: "vie-romantique",
    name: "Musée de la Vie Romantique",
    arrondissement: "9e",
    lat: 48.8802, lon: 2.3327,
    wikiTitle: "Musée de la Vie romantique",
    note: "Nichée dans le quartier de la Nouvelle-Athènes, cette maison-atelier plonge dans l'atmosphère des salons romantiques du XIXe siècle, entre peinture, musique et littérature."
  },
  {
    day: 4, id: "notre-dame",
    name: "Notre-Dame de Paris",
    arrondissement: "4e",
    lat: 48.8530, lon: 2.3499,
    wikiTitle: "Cathédrale Notre-Dame de Paris",
    note: "Silhouette gothique qui a nourri l'imaginaire mélancolique des romantiques ; Victor Hugo en fera le cœur battant de son roman, publié en 1831."
  },
  {
    day: 6, id: "luxembourg",
    name: "Jardin du Luxembourg",
    arrondissement: "6e",
    lat: 48.8462, lon: 2.3372,
    wikiTitle: "Jardin du Luxembourg",
    note: "Promenade favorite des étudiants et poètes du Quartier latin : un vrai « paysage-état d'âme » en plein cœur de Paris."
  },
  {
    day: 8, id: "pantheon",
    name: "Le Panthéon",
    arrondissement: "5e",
    lat: 48.8462, lon: 2.3464,
    wikiTitle: "Panthéon (Paris)",
    note: "Monument néoclassique à la grandeur presque écrasante — une bonne façon de ressentir, à échelle parisienne, ce que Kant appelait le sublime."
  },
  {
    day: 10, id: "rue-du-bac",
    name: "Rue du Bac (quartier de Chateaubriand)",
    arrondissement: "7e",
    lat: 48.8534, lon: 2.3255,
    wikiTitle: "Rue du Bac",
    note: "Chateaubriand y vécut et y reçut, non loin du salon de Madame Récamier où il lisait ses Mémoires d'outre-tombe — l'exil intérieur mis en mots."
  },
  {
    day: 12, id: "maison-hugo",
    name: "Maison de Victor Hugo",
    arrondissement: "4e",
    lat: 48.8555, lon: 2.3663,
    wikiTitle: "Maison de Victor Hugo",
    note: "Hugo a vécu ici même, place des Vosges, de 1832 à 1848 : c'est dans ces pièces qu'il a théorisé le drame romantique."
  },
  {
    day: 14, id: "square-lamartine",
    name: "Square Lamartine",
    arrondissement: "16e",
    lat: 48.8656, lon: 2.2789,
    wikiTitle: "Alphonse de Lamartine",
    note: "Un petit square parisien dédié au poète du Lac, hanté par la fuite du temps et le pouvoir de la mémoire."
  },
  {
    day: 16, id: "pere-lachaise",
    name: "Cimetière du Père-Lachaise",
    arrondissement: "20e",
    lat: 48.8619, lon: 2.3936,
    wikiTitle: "Cimetière du Père-Lachaise",
    note: "Alfred de Musset y repose parmi de nombreuses figures littéraires — un lieu chargé pour le dandy romantique à la mélancolie légendaire."
  },
  {
    day: 18, id: "invalides",
    name: "Les Invalides",
    arrondissement: "7e",
    lat: 48.8566, lon: 2.3126,
    wikiTitle: "Hôtel des Invalides",
    note: "Grandeur militaire et solitude monumentale : un écho architectural à la vision de Vigny, ancien officier devenu poète de la solitude du génie."
  },
  {
    day: 20, id: "bnf-richelieu",
    name: "Bibliothèque nationale de France — site Richelieu",
    arrondissement: "2e",
    lat: 48.8675, lon: 2.3389,
    wikiTitle: "Bibliothèque nationale de France",
    note: "Nerval, grand lecteur d'ésotérisme et de textes rares, hantait ce genre de lieu où le savoir côtoie le rêve et l'imaginaire."
  },
  {
    day: 22, id: "quai-malaquais",
    name: "Quai Malaquais",
    arrondissement: "6e",
    lat: 48.8577, lon: 2.3345,
    wikiTitle: "Quai Malaquais",
    note: "George Sand a vécu sur ce quai de Seine au début des années 1830, en pleine effervescence de ses premiers grands romans engagés."
  },
  {
    day: 24, id: "montmartre-cimetiere",
    name: "Cimetière de Montmartre",
    arrondissement: "18e",
    lat: 48.8872, lon: 2.3317,
    wikiTitle: "Cimetière de Montmartre",
    note: "Théophile Gautier, défenseur de « l'art pour l'art », y repose — sur la butte qui deviendra plus tard le symbole de toute une vie artistique parisienne."
  },
  {
    day: 26, id: "maison-balzac",
    name: "Maison de Balzac",
    arrondissement: "16e",
    lat: 48.8548, lon: 2.2735,
    wikiTitle: "Maison de Balzac",
    note: "La demeure de Passy où Balzac écrivit une partie de La Comédie humaine — l'un des grands chantiers du basculement vers le réalisme."
  },
  {
    day: 28, id: "montparnasse-cimetiere",
    name: "Cimetière du Montparnasse",
    arrondissement: "14e",
    lat: 48.8362, lon: 2.3265,
    wikiTitle: "Cimetière du Montparnasse",
    note: "Baudelaire y repose : l'héritage direct du romantisme, entre spleen moderne et artiste maudit, juste avant l'aube du XXe siècle."
  },
  {
    day: 30, id: "institut-de-france",
    name: "Institut de France (Académie française)",
    arrondissement: "6e",
    lat: 48.8583, lon: 2.3371,
    wikiTitle: "Institut de France",
    note: "Hugo, Lamartine, Vigny et Chateaubriand y ont tous siégé un jour sous la Coupole : un point final logique pour ton propre grand bilan romantique."
  }
];
