/* ============================================================
   Carte littéraire de FRANCE — 30 lieux réels, 2 par jour
   « Romantisme » (+ le Grand Bilan final) :
     - kind "core"      → le lieu directement lié à l'auteur/concept du jour
     - kind "extension" → un lieu plus tardif qui prolonge ce thème
                          « en avançant dans le temps » (réalisme, naturalisme,
                          symbolisme, XXe siècle...), pour parcourir toute
                          l'histoire littéraire française à travers la France.
   wikiTitle = titre de la page Wikipédia en français utilisée pour
   récupérer une image + un court résumé via l'API publique.
   extra = une information bonus, utilisable comme anecdote / fait à retenir.
   ============================================================ */

const FRANCE_LOCATIONS = [

  /* ---------- JOUR 2 : Introduction au Romantisme ---------- */
  {
    day: 2, id: "vie-romantique", kind: "core", era: "Romantisme",
    name: "Musée de la Vie Romantique", region: "Paris (9e)",
    lat: 48.8802, lon: 2.3327, wikiTitle: "Musée de la Vie romantique",
    note: "Nichée dans le quartier de la Nouvelle-Athènes, cette maison-atelier plonge dans l'atmosphère des salons romantiques du XIXe siècle.",
    extra: "La maison a appartenu au peintre Ary Scheffer, qui y recevait Chopin, George Sand, Delacroix et bien d'autres figures du Paris romantique."
  },
  {
    day: 2, id: "charleville-rimbaud", kind: "extension", era: "Symbolisme",
    name: "Charleville-Mézières (maison natale de Rimbaud)", region: "Ardennes",
    lat: 49.7739, lon: 4.7167, wikiTitle: "Arthur Rimbaud",
    note: "Un demi-siècle après les débuts du romantisme, c'est ici que naît Arthur Rimbaud, qui poussera la révolte et la liberté poétique romantiques jusqu'à leurs limites extrêmes.",
    extra: "Rimbaud a écrit l'essentiel de son œuvre avant l'âge de 21 ans, avant d'abandonner totalement la littérature."
  },

  /* ---------- JOUR 4 : Le mal du siècle ---------- */
  {
    day: 4, id: "notre-dame", kind: "core", era: "Romantisme",
    name: "Notre-Dame de Paris", region: "Paris (4e)",
    lat: 48.8530, lon: 2.3499, wikiTitle: "Cathédrale Notre-Dame de Paris",
    note: "Silhouette gothique qui a nourri l'imaginaire mélancolique des romantiques ; Victor Hugo en fera le cœur battant de son roman, publié en 1831.",
    extra: "Le roman de Hugo a contribué à sauver la cathédrale, alors très abîmée, en relançant l'intérêt du public pour sa restauration."
  },
  {
    day: 4, id: "croisset-flaubert", kind: "extension", era: "Réalisme",
    name: "Croisset (pavillon de Flaubert, près de Rouen)", region: "Normandie",
    lat: 49.4064, lon: 0.9722, wikiTitle: "Gustave Flaubert",
    note: "Le mal du siècle romantique se prolonge, en plus froid et plus clinique, dans le « bovarysme » : ce désir d'ailleurs et cette insatisfaction que Flaubert dissèque chez son personnage Emma Bovary.",
    extra: "Flaubert a mis près de cinq ans à écrire Madame Bovary, retravaillant sans cesse chaque phrase à voix haute dans son « gueuloir »."
  },

  /* ---------- JOUR 6 : La nature, miroir de l'âme ---------- */
  {
    day: 6, id: "luxembourg", kind: "core", era: "Romantisme",
    name: "Jardin du Luxembourg", region: "Paris (6e)",
    lat: 48.8462, lon: 2.3372, wikiTitle: "Jardin du Luxembourg",
    note: "Promenade favorite des étudiants et poètes du Quartier latin : un vrai « paysage-état d'âme » en plein cœur de Paris.",
    extra: "Le jardin abrite une réplique de la statue de la Liberté et une centaine de statues, dont plusieurs reines de France."
  },
  {
    day: 6, id: "aix-zola", kind: "extension", era: "Naturalisme",
    name: "Aix-en-Provence", region: "Provence",
    lat: 43.5297, lon: 5.4474, wikiTitle: "Émile Zola",
    note: "Émile Zola y a grandi aux côtés du peintre Paul Cézanne : la nature provençale, si présente dans ses souvenirs, nourrira sa vision quasi scientifique du milieu naturel dans le naturalisme.",
    extra: "Zola et Cézanne étaient amis d'enfance inséparables à Aix, avant que leur amitié ne se brise à l'âge adulte."
  },

  /* ---------- JOUR 8 : Le Sublime ---------- */
  {
    day: 8, id: "pantheon", kind: "core", era: "Romantisme",
    name: "Le Panthéon", region: "Paris (5e)",
    lat: 48.8462, lon: 2.3464, wikiTitle: "Panthéon (Paris)",
    note: "Monument néoclassique à la grandeur presque écrasante — une bonne façon de ressentir, à échelle parisienne, ce que Kant appelait le sublime.",
    extra: "Victor Hugo lui-même y repose depuis 1885, aux côtés de Voltaire, Rousseau, Zola et Alexandre Dumas."
  },
  {
    day: 8, id: "etretat", kind: "extension", era: "Réalisme",
    name: "Falaises d'Étretat", region: "Normandie",
    lat: 49.7085, lon: 0.2036, wikiTitle: "Étretat",
    note: "Ces falaises spectaculaires ont fasciné Maupassant, qui y situe plusieurs récits : le sublime romantique de la nature devient ici un décor bien réel, peint et décrit avec précision.",
    extra: "Les falaises d'Étretat ont aussi inspiré Claude Monet, qui en a peint plusieurs dizaines de tableaux, et Maurice Leblanc pour les aventures d'Arsène Lupin."
  },

  /* ---------- JOUR 10 : Chateaubriand — l'exil intérieur ---------- */
  {
    day: 10, id: "combourg", kind: "core", era: "Romantisme",
    name: "Château de Combourg", region: "Bretagne",
    lat: 48.4108, lon: -1.7508, wikiTitle: "Château de Combourg",
    note: "Chateaubriand a passé ici une enfance solitaire et mélancolique, qu'il racontera dans ses Mémoires d'outre-tombe — le vrai berceau de son « exil intérieur ».",
    extra: "Chateaubriand décrit dans ses mémoires les longues soirées passées seul dans la tour du château, livré à une imagination hantée par la mort et l'infini."
  },
  {
    day: 10, id: "lourmarin-camus", kind: "extension", era: "XXe siècle",
    name: "Lourmarin (tombe d'Albert Camus)", region: "Provence",
    lat: 43.7667, lon: 5.3667, wikiTitle: "Albert Camus",
    note: "L'exil intérieur romantique trouve un écho, un siècle plus tard, dans la philosophie de l'absurde de Camus : l'homme étranger à sa propre existence.",
    extra: "Camus avait acheté sa maison de Lourmarin peu avant sa mort accidentelle en 1960 ; il y est enterré, dans le petit cimetière du village."
  },

  /* ---------- JOUR 12 : Victor Hugo et le drame romantique ---------- */
  {
    day: 12, id: "maison-hugo", kind: "core", era: "Romantisme",
    name: "Maison de Victor Hugo", region: "Paris (4e)",
    lat: 48.8555, lon: 2.3663, wikiTitle: "Maison de Victor Hugo",
    note: "Hugo a vécu ici même, place des Vosges, de 1832 à 1848 : c'est dans ces pièces qu'il a théorisé le drame romantique.",
    extra: "L'appartement conserve un salon chinois entièrement décoré par Hugo lui-même durant son exil, pièce par pièce."
  },
  {
    day: 12, id: "amiens-verne", kind: "extension", era: "Roman d'aventures",
    name: "Maison de Jules Verne, Amiens", region: "Hauts-de-France",
    lat: 49.8941, lon: 2.3033, wikiTitle: "Maison à la tour",
    note: "Le goût romantique pour l'aventure et l'imaginaire démesuré se prolonge chez Jules Verne, qui invente à Amiens des mondes entiers dans ses Voyages extraordinaires.",
    extra: "Verne a vécu et écrit une grande partie de son œuvre dans cette maison à tour, aujourd'hui transformée en musée qui recrée son cabinet de travail."
  },

  /* ---------- JOUR 14 : Lamartine — le temps et la mémoire ---------- */
  {
    day: 14, id: "milly-lamartine", kind: "core", era: "Romantisme",
    name: "Milly-Lamartine", region: "Bourgogne (Mâconnais)",
    lat: 46.3667, lon: 4.7333, wikiTitle: "Alphonse de Lamartine",
    note: "Le village où Lamartine a passé son enfance et auquel il reviendra toute sa vie : le vrai décor de sa hantise de la fuite du temps et du pouvoir de la mémoire.",
    extra: "Le village s'appelait autrefois simplement « Milly » ; il a pris le nom de « Milly-Lamartine » en hommage au poète."
  },
  {
    day: 14, id: "illiers-combray", kind: "extension", era: "XXe siècle",
    name: "Illiers-Combray", region: "Centre-Val de Loire",
    lat: 48.3167, lon: 1.2333, wikiTitle: "Illiers-Combray",
    note: "Un siècle après Lamartine, c'est ici que Marcel Proust situe son enfance retrouvée : toute À la recherche du temps perdu peut se lire comme l'aboutissement ultime du thème du temps et de la mémoire.",
    extra: "Le village a officiellement changé de nom en 1971 pour ajouter « Combray », le nom que Proust lui donnait dans son roman."
  },

  /* ---------- JOUR 16 : Musset — passion et mélancolie ---------- */
  {
    day: 16, id: "pere-lachaise", kind: "core", era: "Romantisme",
    name: "Cimetière du Père-Lachaise", region: "Paris (20e)",
    lat: 48.8619, lon: 2.3936, wikiTitle: "Cimetière du Père-Lachaise",
    note: "Alfred de Musset y repose parmi de nombreuses figures littéraires — un lieu chargé pour le dandy romantique à la mélancolie légendaire.",
    extra: "Musset avait demandé qu'un saule pleureur soit planté sur sa tombe ; on peut toujours le voir aujourd'hui, replanté à plusieurs reprises."
  },
  {
    day: 16, id: "saint-sauveur-colette", kind: "extension", era: "XXe siècle",
    name: "Saint-Sauveur-en-Puisaye (maison natale de Colette)", region: "Bourgogne",
    lat: 47.6167, lon: 3.3333, wikiTitle: "Colette",
    note: "La passion sensuelle et la finesse psychologique du romantisme trouvent une héritière directe en Colette, née dans ce village bourguignon.",
    extra: "Colette fut la première femme de lettres à recevoir des funérailles nationales en France, en 1954."
  },

  /* ---------- JOUR 18 : Vigny — la solitude du génie ---------- */
  {
    day: 18, id: "invalides", kind: "core", era: "Romantisme",
    name: "Les Invalides", region: "Paris (7e)",
    lat: 48.8566, lon: 2.3126, wikiTitle: "Hôtel des Invalides",
    note: "Grandeur militaire et solitude monumentale : un écho architectural à la vision de Vigny, ancien officier devenu poète de la solitude du génie.",
    extra: "Vigny a servi comme officier pendant plus de treize ans sans jamais connaître de véritable combat, une frustration qui nourrit son œuvre."
  },
  {
    day: 18, id: "lyon-saint-exupery", kind: "extension", era: "XXe siècle",
    name: "Lyon (ville natale de Saint-Exupéry)", region: "Auvergne-Rhône-Alpes",
    lat: 45.7640, lon: 4.8357, wikiTitle: "Antoine de Saint-Exupéry",
    note: "La solitude du génie trouve un écho au XXe siècle chez l'aviateur-écrivain Saint-Exupéry, seul aux commandes, entre ciel et silence.",
    extra: "Avant d'écrire Le Petit Prince, Saint-Exupéry était pilote de ligne et pilote de guerre ; il a disparu en vol au-dessus de la Méditerranée en 1944."
  },

  /* ---------- JOUR 20 : Nerval — rêve et folie ---------- */
  {
    day: 20, id: "bnf-richelieu", kind: "core", era: "Romantisme",
    name: "Bibliothèque nationale de France — site Richelieu", region: "Paris (2e)",
    lat: 48.8675, lon: 2.3389, wikiTitle: "Bibliothèque nationale de France",
    note: "Nerval, grand lecteur d'ésotérisme et de textes rares, hantait ce genre de lieu où le savoir côtoie le rêve et l'imaginaire.",
    extra: "Nerval racontait promener dans Paris un homard tenu en laisse, préférant sa tranquillité, disait-il, à l'agitation des chiens."
  },
  {
    day: 20, id: "rodez-artaud", kind: "extension", era: "XXe siècle",
    name: "Rodez", region: "Occitanie (Aveyron)",
    lat: 44.3506, lon: 2.5730, wikiTitle: "Antonin Artaud",
    note: "Le rêve et la folie de Nerval trouvent un écho tourmenté chez Antonin Artaud, interné plusieurs années dans cette ville, où il continue pourtant à écrire.",
    extra: "C'est à l'hôpital de Rodez qu'Artaud a produit une partie de ses « Cahiers », des milliers de pages de dessins et de textes écrits durant son internement."
  },

  /* ---------- JOUR 22 : George Sand et le romantisme social ---------- */
  {
    day: 22, id: "nohant", kind: "core", era: "Romantisme",
    name: "Nohant (domaine de George Sand)", region: "Berry (Indre)",
    lat: 46.5786, lon: 1.8283, wikiTitle: "George Sand",
    note: "Sa maison de campagne, où elle a écrit l'essentiel de son œuvre et reçu Chopin, Flaubert et Delacroix : le vrai foyer du romantisme social et rural de Sand.",
    extra: "George Sand organisait à Nohant un petit théâtre de marionnettes, pour lequel elle fabriquait elle-même costumes et décors."
  },
  {
    day: 22, id: "medan-zola", kind: "extension", era: "Naturalisme",
    name: "Médan (maison d'Émile Zola)", region: "Île-de-France",
    lat: 48.9667, lon: 1.9167, wikiTitle: "Émile Zola",
    note: "L'engagement social de Sand se prolonge, plus radical encore, chez Zola : c'est dans cette maison qu'il reçoit le groupe des jeunes naturalistes, avant d'écrire J'accuse…!",
    extra: "C'est à Médan que Zola et un groupe de jeunes écrivains ont publié en 1880 le recueil Les Soirées de Médan, acte de naissance du naturalisme."
  },

  /* ---------- JOUR 24 : Théophile Gautier — l'art pour l'art ---------- */
  {
    day: 24, id: "montmartre-cimetiere", kind: "core", era: "Romantisme",
    name: "Cimetière de Montmartre", region: "Paris (18e)",
    lat: 48.8872, lon: 2.3317, wikiTitle: "Cimetière de Montmartre",
    note: "Théophile Gautier, défenseur de « l'art pour l'art », y repose — sur la butte qui deviendra plus tard le symbole de toute une vie artistique parisienne.",
    extra: "Le cimetière de Montmartre a été construit dans une ancienne carrière de gypse, ce qui explique son aspect en contrebas des rues environnantes."
  },
  {
    day: 24, id: "valvins-mallarme", kind: "extension", era: "Symbolisme",
    name: "Valvins (maison de Mallarmé), Vulaines-sur-Seine", region: "Île-de-France",
    lat: 48.4167, lon: 2.7167, wikiTitle: "Stéphane Mallarmé",
    note: "« L'art pour l'art » de Gautier trouve son aboutissement le plus radical chez Mallarmé, pour qui le poème devient une architecture presque pure, coupée du monde.",
    extra: "Mallarmé recevait dans cette maison de campagne les jeunes poètes symbolistes venus l'écouter parler de poésie le dimanche."
  },

  /* ---------- JOUR 26 : La transition vers le Réalisme ---------- */
  {
    day: 26, id: "maison-balzac", kind: "core", era: "Réalisme",
    name: "Maison de Balzac", region: "Paris (16e)",
    lat: 48.8548, lon: 2.2735, wikiTitle: "Maison de Balzac",
    note: "La demeure de Passy où Balzac écrivit une partie de La Comédie humaine — l'un des grands chantiers du basculement vers le réalisme.",
    extra: "Balzac se cachait ici sous un faux nom pour échapper à ses créanciers, et la maison possédait une seconde sortie discrète pour prendre la fuite si besoin."
  },
  {
    day: 26, id: "grenoble-stendhal", kind: "extension", era: "Réalisme",
    name: "Grenoble (ville natale de Stendhal)", region: "Auvergne-Rhône-Alpes",
    lat: 45.1885, lon: 5.7245, wikiTitle: "Stendhal",
    note: "Stendhal, natif de Grenoble, est souvent considéré comme le tout premier grand réaliste français, analysant froidement l'ambition de ses personnages, comme dans Le Rouge et le Noir.",
    extra: "Stendhal détestait sa ville natale, qu'il jugeait étriquée et provinciale — il choisit d'ailleurs ce pseudonyme pour signer ses œuvres plutôt que son vrai nom, Henri Beyle."
  },

  /* ---------- JOUR 28 : L'héritage du Romantisme ---------- */
  {
    day: 28, id: "montparnasse-cimetiere", kind: "core", era: "Romantisme",
    name: "Cimetière du Montparnasse", region: "Paris (14e)",
    lat: 48.8362, lon: 2.3265, wikiTitle: "Cimetière du Montparnasse",
    note: "Baudelaire y repose : l'héritage direct du romantisme, entre spleen moderne et artiste maudit, juste avant l'aube du XXe siècle.",
    extra: "La tombe officielle de Baudelaire porte le nom de son beau-père détesté, le général Aupick ; un cénotaphe séparé lui a été dédié plus loin dans le même cimetière."
  },
  {
    day: 28, id: "le-havre-sartre", kind: "extension", era: "Existentialisme",
    name: "Le Havre", region: "Normandie",
    lat: 49.4944, lon: 0.1079, wikiTitle: "Jean-Paul Sartre",
    note: "Sartre y a enseigné la philosophie et y a puisé l'atmosphère de son roman La Nausée : l'artiste maudit et le spleen romantiques se muent ici en absurde existentialiste.",
    extra: "Sartre transforme Le Havre en « Bouville » (la « ville boueuse ») dans La Nausée, une ville portuaire grise qui inspire le dégoût existentiel de son narrateur."
  },

  /* ---------- JOUR 30 : Grand bilan final ---------- */
  {
    day: 30, id: "institut-de-france", kind: "core", era: "Romantisme",
    name: "Institut de France (Académie française)", region: "Paris (6e)",
    lat: 48.8583, lon: 2.3371, wikiTitle: "Institut de France",
    note: "Hugo, Lamartine, Vigny et Chateaubriand y ont tous siégé un jour sous la Coupole : un point de passage entre toutes les gloires littéraires françaises.",
    extra: "Chaque académicien reçoit une épée personnalisée à son entrée sous la Coupole, dont les motifs évoquent son œuvre ou sa carrière."
  },
  {
    day: 30, id: "bnf-mitterrand", kind: "extension", era: "Aujourd'hui",
    name: "Bibliothèque nationale de France — site François-Mitterrand", region: "Paris (13e)",
    lat: 48.8296, lon: 2.3763, wikiTitle: "Bibliothèque nationale de France",
    note: "Du romantisme à aujourd'hui : cette immense bibliothèque moderne conserve et prolonge tout l'héritage que tu viens de parcourir, prête à accueillir les œuvres de demain.",
    extra: "Ses quatre tours en forme de livres ouverts abritent parmi les plus grandes collections d'imprimés au monde, plus de 40 millions de documents."
  }

];

/* Compatibilité : ancien nom utilisé ailleurs dans le code / lisibilité */
const PARIS_LOCATIONS = FRANCE_LOCATIONS;
