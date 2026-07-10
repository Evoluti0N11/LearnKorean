/* ============================================================
   Français au Quotidien — 30 jours
   Données du parcours : vocabulaire, écoute, conversation, défis
   ============================================================ */

const CURRICULUM = [

// ---------- JOUR 1 : vie quotidienne ----------
{
  day: 1, category: "vie", icon: "👋",
  title: "Se présenter et faire connaissance",
  tongueTwister: { fr: "Didier dit directement son nom, dix fois, sans hésiter.", tip: "Répétition du son « d » et « t » : gardez la langue bien contre les dents." },
  vocab: [
    { fr: "se présenter", ipa: "sə pʁe.zɑ̃.te", note: "Presentarsi : nasale « en », ne pas prononcer le « t » final." },
    { fr: "s'appeler", ipa: "sa.ple", note: "Chiamarsi : les deux « p » se prononcent comme un seul, bref." },
    { fr: "la nationalité", ipa: "na.sjɔ.na.li.te", note: "« -tion- » se prononce toujours « sjɔ »." },
    { fr: "habiter", ipa: "a.bi.te", note: "Le « h » est muet : on fait la liaison, « j'habite »." },
    { fr: "le métier", ipa: "me.tje", note: "« -ier » final se prononce « -je », jamais comme en italien." },
    { fr: "ravi(e) de vous rencontrer", ipa: "ʁa.vi", note: "Formule de politesse très utilisée en France à la rencontre." }
  ],
  listening: {
    text: "Bonjour, je m'appelle Camille. J'ai vingt-trois ans et j'habite à Lyon, dans le sud-est de la France. Je suis étudiante en architecture, mais le week-end, je travaille aussi dans un café près de chez moi. J'aime beaucoup rencontrer de nouvelles personnes, surtout quand elles viennent d'un autre pays.",
    question: "Où habite Camille ?",
    options: ["À Lyon", "À Paris", "À Marseille"],
    answer: 0
  },
  conversation: [
    "Comment vous appelez-vous et quel âge avez-vous ?",
    "Où habitez-vous, et depuis combien de temps ?",
    "Quel est votre métier, ou que faites-vous dans la vie ?",
    "Qu'est-ce que vous aimez faire pour rencontrer de nouvelles personnes ?"
  ],
  challenge: "Enregistre-toi pendant 30 secondes : présente-toi comme si tu rencontrais quelqu'un pour la première fois (nom, âge, ville, métier ou études, une passion)."
},

// ---------- JOUR 2 : littérature ----------
{
  day: 2, category: "litt", icon: "📖",
  title: "Introduction au Romantisme : une révolution de la sensibilité",
  tongueTwister: { fr: "Rousseau rêvait, seul, sous un ciel rouge et rond.", tip: "Le « r » français se fait au fond de la gorge, jamais roulé." },
  vocab: [
    { fr: "une révolution", ipa: "ʁe.vɔ.ly.sjɔ̃", note: "Rivoluzione : nasale finale « -tion »." },
    { fr: "la sensibilité", ipa: "sɑ̃.si.bi.li.te", note: "Sensibilità : nasale « en » au début." },
    { fr: "l'introspection", ipa: "ɛ̃.tʁɔs.pɛk.sjɔ̃", note: "Introspezione : deux nasales différentes dans le même mot." },
    { fr: "le sentiment", ipa: "sɑ̃.ti.mɑ̃", note: "Sentimento : deux nasales « en » de suite." },
    { fr: "la subjectivité", ipa: "syb.ʒɛk.ti.vi.te", note: "Soggettività : le « u » français /y/ au début." },
    { fr: "s'opposer à", ipa: "sɔ.po.ze a", note: "Opporsi a : liaison possible « opposer_à »." }
  ],
  listening: {
    text: "Au début du dix-neuvième siècle, de jeunes écrivains français se lassent des règles strictes du classicisme. Ils veulent exprimer librement leurs émotions, leurs rêves et leurs doutes, sans imiter les auteurs de l'Antiquité. Inspirés par Jean-Jacques Rousseau, ils placent le « moi », c'est-à-dire la sensibilité individuelle, au centre de leur écriture.",
    question: "Qui a inspiré les premiers écrivains romantiques, selon le texte ?",
    options: ["Jean-Jacques Rousseau", "Boileau", "Napoléon"],
    answer: 0
  },
  conversation: [
    "Selon vous, qu'est-ce qu'un mouvement littéraire ? Pouvez-vous en citer un dans votre langue ?",
    "Pensez-vous qu'il soit plus important d'exprimer ses émotions ou de respecter des règles, en art ?",
    "Le mot « romantique » a aujourd'hui un sens surtout amoureux. Est-ce très différent du sens littéraire du romantisme ?"
  ],
  challenge: "Enregistre-toi : explique en 30-40 secondes la différence entre « suivre des règles » et « exprimer ses émotions librement », avec un exemple.",
  concept: { title: "Le Romantisme", def: "Mouvement littéraire du début du XIXe siècle qui privilégie l'émotion, la sensibilité individuelle et la liberté formelle, en réaction contre la raison classique." }
},

// ---------- JOUR 3 : vie quotidienne ----------
{
  day: 3, category: "vie", icon: "👪",
  title: "La famille",
  tongueTwister: { fr: "Ma mère et mon frère mangent ensemble en même temps.", tip: "Trois nasales « en/em » d'affilée : gardez le rythme régulier." },
  vocab: [
    { fr: "les parents", ipa: "le pa.ʁɑ̃", note: "Attention, faux ami : « parents » = i genitori, pas i parenti !" },
    { fr: "le frère / la sœur", ipa: "fʁɛʁ / sœʁ", note: "« œu » dans « sœur » est un son unique, pas deux voyelles séparées." },
    { fr: "les grands-parents", ipa: "gʁɑ̃ pa.ʁɑ̃", note: "Pas de liaison ici : « grands » perd son « s » devant consonne." },
    { fr: "le mari / la femme", ipa: "ma.ʁi / fam", note: "« femme » se prononce [fam], pas comme elle s'écrit." },
    { fr: "élever un enfant", ipa: "el.ve œ̃n‿ɑ̃.fɑ̃", note: "Liaison obligatoire : « un_enfant »." }
  ],
  listening: {
    text: "Dans ma famille, nous sommes quatre : mes parents, ma sœur et moi. Mon père travaille dans un hôpital et ma mère est professeure de musique. Ma sœur a dix-huit ans et elle veut devenir vétérinaire. Le dimanche, toute la famille se retrouve chez mes grands-parents pour déjeuner ensemble.",
    question: "Que veut faire la sœur de la personne qui parle ?",
    options: ["Devenir vétérinaire", "Devenir professeure", "Devenir médecin"],
    answer: 0
  },
  conversation: [
    "Décrivez votre famille : combien êtes-vous, et quel est votre rang parmi vos frères et sœurs ?",
    "Que font vos parents dans la vie ?",
    "Avez-vous une tradition familiale, comme un repas ou une réunion régulière ?"
  ],
  challenge: "Enregistre-toi : décris ta famille en 30-40 secondes (nombre de personnes, métiers, une anecdote ou une tradition)."
},

// ---------- JOUR 4 : littérature ----------
{
  day: 4, category: "litt", icon: "🌧️",
  title: "Le « mal du siècle » et le héros romantique",
  tongueTwister: { fr: "René rêve, seul, d'un ciel serein et sans fin.", tip: "Nasale « en » répétée : gardez la bouche détendue." },
  vocab: [
    { fr: "le mal du siècle", ipa: "mal dy sjɛkl", note: "« siècle » n'a qu'une seule syllabe finale." },
    { fr: "l'ennui", ipa: "ɑ̃.nɥi", note: "Nasale « en » puis semi-voyelle « ui »." },
    { fr: "incompris(e)", ipa: "ɛ̃.kɔ̃.pʁi", note: "Deux nasales différentes de suite : « in » puis « on »." },
    { fr: "l'exil intérieur", ipa: "ɛg.zil ɛ̃.te.ʁjœʁ", note: "Le « x » se prononce « gz » devant une voyelle." },
    { fr: "désenchanté(e)", ipa: "de.zɑ̃.ʃɑ̃.te", note: "Liaison douce : le « s » devient « z »." }
  ],
  listening: {
    text: "Beaucoup de jeunes gens, au début du dix-neuvième siècle, se sentent incompris par la société qui les entoure. Ils ont grandi après la Révolution et les guerres, dans un monde en pleine transformation, sans repères stables. Cette tristesse diffuse, ce vague à l'âme sans raison précise, porte un nom : le mal du siècle.",
    question: "Quand cette génération a-t-elle grandi, selon le texte ?",
    options: ["Après la Révolution et les guerres", "Avant la Révolution", "Pendant le Moyen Âge"],
    answer: 0
  },
  conversation: [
    "Avez-vous déjà ressenti une tristesse sans raison précise, un peu comme un « vague à l'âme » ?",
    "Pensez-vous que chaque génération a sa propre version du « mal du siècle » ?",
    "Comment réagissez-vous quand vous vous sentez incompris(e) ?"
  ],
  challenge: "Enregistre-toi : raconte un moment où tu t'es senti(e) un peu « déphasé(e) » par rapport au monde autour de toi (30-40 secondes).",
  concept: { title: "Le Mal du siècle", def: "Sentiment de malaise existentiel et de mélancolie diffuse qui touche la génération romantique, née après la Révolution et les guerres napoléoniennes." }
},

// ---------- JOUR 5 : vie quotidienne (milestone) ----------
{
  day: 5, category: "vie", icon: "🎨", milestone: true,
  title: "Les goûts et les loisirs",
  tongueTwister: { fr: "Je joue, tu joues, il joue au jeu joyeux du jeudi.", tip: "Répétition du son « j » [ʒ], comme dans l'italien « giorno » mais plus doux." },
  vocab: [
    { fr: "un passe-temps", ipa: "pas tɑ̃", note: "« temps » : la « s » finale est toujours muette." },
    { fr: "le bricolage", ipa: "bʁi.kɔ.laʒ", note: "Le « g » final se prononce « j » doux." },
    { fr: "la peinture", ipa: "pɛ̃.tyʁ", note: "Nasale « ein » → [ɛ̃]." },
    { fr: "jouer d'un instrument", ipa: "ʒwe dœ̃n‿ɛ̃s.tʁy.mɑ̃", note: "Liaison obligatoire : « un_instrument »." },
    { fr: "ça me plaît", ipa: "sa m plɛ", note: "Expression très fréquente ; l'accent circonflexe ne change pas la prononciation." }
  ],
  listening: {
    text: "Le week-end, j'aime beaucoup lire, surtout des romans policiers. Mon frère préfère le sport : il joue au foot tous les samedis avec ses amis. Ma colocataire, elle, adore la peinture et passe des heures à peindre des paysages. Et vous, qu'est-ce qui vous plaît vraiment de faire pendant votre temps libre ?",
    question: "Que fait le frère de la personne qui parle le week-end ?",
    options: ["Il joue au foot", "Il peint", "Il lit"],
    answer: 0
  },
  conversation: [
    "Quel est votre passe-temps préféré, et pourquoi ?",
    "Préférez-vous les activités seul(e) ou en groupe ?",
    "Avez-vous déjà essayé un loisir qui vous a surpris(e) ?"
  ],
  challenge: "Défi de révision : rappelle-toi 3 mots des jours précédents, puis décris ton loisir préféré en une phrase complète.",
  reviewRange: [1, 4]
},

// ---------- JOUR 6 : littérature ----------
{
  day: 6, category: "litt", icon: "🏞️",
  title: "La nature, miroir de l'âme",
  tongueTwister: { fr: "Le lac calme cache le chagrin qui le comble.", tip: "Le son « k » (lac, calme) doit rester net et bref." },
  vocab: [
    { fr: "le paysage", ipa: "pei.zaʒ", note: "« ay » se prononce comme un « è » fermé." },
    { fr: "un état d'âme", ipa: "e.ta dam", note: "Liaison : « état_d'âme »." },
    { fr: "refléter", ipa: "ʁə.fle.te", note: "Le « e » initial est souvent presque muet." },
    { fr: "la contemplation", ipa: "kɔ̃.tɑ̃.pla.sjɔ̃", note: "Trois nasales de suite : bon exercice de souffle." },
    { fr: "s'apaiser", ipa: "sa.pɛ.ze", note: "Se calmer : attention à la liaison du « s » réfléchi." }
  ],
  listening: {
    text: "Pour les poètes romantiques, un paysage n'est jamais neutre. Un lac calme peut refléter la paix intérieure du poète, tandis qu'un orage violent exprime sa colère ou son désespoir. La nature devient un miroir : elle ne décore plus seulement le poème, elle raconte, en silence, ce que ressent celui qui la regarde.",
    question: "Que représente la nature pour les poètes romantiques, selon le texte ?",
    options: ["Un miroir de leurs émotions", "Un simple décor", "Un sujet scientifique"],
    answer: 0
  },
  conversation: [
    "Un paysage a-t-il déjà reflété votre humeur du moment ? Lequel ?",
    "Préférez-vous la mer, la montagne ou la forêt pour vous « retrouver » ?",
    "Pensez-vous que la nature influence vraiment nos émotions, ou est-ce nous qui projetons nos émotions sur elle ?"
  ],
  challenge: "Enregistre-toi : décris un paysage réel ou imaginaire qui correspondrait exactement à ton humeur d'aujourd'hui (30-40 secondes).",
  concept: { title: "Le paysage-état d'âme", def: "Procédé romantique par lequel la nature devient le reflet des émotions du poète : elle n'est plus un simple décor, mais un miroir intérieur." }
},

// ---------- JOUR 7 : vie quotidienne ----------
{
  day: 7, category: "vie", icon: "🍽️",
  title: "La nourriture et les repas",
  tongueTwister: { fr: "Ce cher chef choisit chaque jour un chou frais et sec.", tip: "Le son « ch » [ʃ] doit rester doux, sans le durcir." },
  vocab: [
    { fr: "le petit-déjeuner", ipa: "pə.ti de.ʒœ.ne", note: "Expression figée pour la colazione, pas de traduction littérale." },
    { fr: "déjeuner / dîner", ipa: "de.ʒœ.ne / di.ne", note: "Faux ami : « dîner » = cenare, pas « digiunare » !" },
    { fr: "avoir faim / soif", ipa: "a.vwaʁ fɛ̃ / swaf", note: "En français on « a » faim, on n'« est » pas affamé." },
    { fr: "un plat", ipa: "pla", note: "Le « t » final est toujours muet." },
    { fr: "se régaler", ipa: "sə ʁe.ga.le", note: "Expression très utilisée à table pour dire qu'on se fait plaisir." }
  ],
  listening: {
    text: "En France, le déjeuner est souvent le repas principal de la journée, surtout en dehors des grandes villes. On commence parfois par une entrée, puis le plat principal, et on termine avec du fromage ou un dessert. Le dîner, lui, est en général plus léger.",
    question: "Quel repas est souvent le plus important en France, selon le texte ?",
    options: ["Le déjeuner", "Le petit-déjeuner", "Le dîner"],
    answer: 0
  },
  conversation: [
    "Quel est votre plat préféré, et savez-vous le préparer ?",
    "Le repas principal, chez vous, est-il plutôt le midi ou le soir ?",
    "Y a-t-il un plat de votre pays que vous aimeriez faire découvrir à un(e) Français(e) ?"
  ],
  challenge: "Enregistre-toi : décris ton plat préféré comme si tu l'expliquais à quelqu'un qui ne l'a jamais goûté."
},

// ---------- JOUR 8 : littérature ----------
{
  day: 8, category: "litt", icon: "⛰️",
  title: "Le Sublime",
  tongueTwister: { fr: "Sous un ciel immense, six cimes s'illuminent, silencieuses.", tip: "Répétition du son « s » : gardez un souffle continu, sans le durcir." },
  vocab: [
    { fr: "le sublime", ipa: "sy.blim", note: "Le « u » français /y/ : lèvres arrondies, langue avancée." },
    { fr: "l'immensité", ipa: "im.mɑ̃.si.te", note: "Nasale centrale bien marquée." },
    { fr: "l'effroi", ipa: "e.fʁwa", note: "Semi-voyelle « oi » → [wa]." },
    { fr: "écrasant(e)", ipa: "e.kʁa.zɑ̃", note: "Nasale finale, comme dans « grand »." },
    { fr: "la fascination", ipa: "fa.si.na.sjɔ̃", note: "Mot proche de l'italien, mais « -tion » reste [sjɔ̃]." }
  ],
  listening: {
    text: "Face à une tempête en montagne ou à des ruines antiques, on peut ressentir un mélange étrange de peur et d'admiration : c'est ce que le philosophe Emmanuel Kant appelle le sublime. On se sent minuscule devant l'immensité de la nature, mais cette sensation d'écrasement devient, paradoxalement, une source de plaisir esthétique.",
    question: "Selon le texte, le sublime mélange quelles deux sensations ?",
    options: ["La peur et l'admiration", "La joie et la tristesse", "La colère et le calme"],
    answer: 0
  },
  conversation: [
    "Avez-vous déjà ressenti ce mélange de peur et d'admiration devant un paysage impressionnant ?",
    "Le sublime existe-t-il aussi dans l'art moderne (cinéma, jeux vidéo, musique) ?",
    "Quel endroit du monde vous semble le plus « sublime » ?"
  ],
  challenge: "Enregistre-toi : décris le paysage ou le lieu le plus impressionnant que tu aies jamais vu, en expliquant ce que tu as ressenti.",
  concept: { title: "Le Sublime", def: "Concept emprunté à Kant : sentiment de fascination mêlée d'effroi ressenti face à l'immensité ou à la puissance de la nature, qui dépasse notre entendement." }
},

// ---------- JOUR 9 : vie quotidienne ----------
{
  day: 9, category: "vie", icon: "🏃",
  title: "Le sport et la forme physique",
  tongueTwister: { fr: "Sacha sait skier, sauter et sprinter sans cesse.", tip: "Alternance « s »/« ch » : ralentis d'abord, puis accélère." },
  vocab: [
    { fr: "faire du sport", ipa: "fɛʁ dy spɔʁ", note: "On « fait » du sport, on ne le « joue » pas." },
    { fr: "s'entraîner", ipa: "sɑ̃.tʁɛ.ne", note: "Nasale « en » au début." },
    { fr: "courir", ipa: "ku.ʁiʁ", note: "Le « r » final se prononce, verbe en -ir." },
    { fr: "être en forme", ipa: "ɛtʁ ɑ̃ fɔʁm", note: "Liaison légère possible « en_forme »." },
    { fr: "se muscler", ipa: "sə mys.kle", note: "Se muscler, se mettre en forme physiquement." }
  ],
  listening: {
    text: "Pour rester en forme, je cours trois fois par semaine dans le parc près de chez moi. Le week-end, je fais aussi du vélo avec des amis. Ma sœur, elle, préfère la natation : elle s'entraîne dans une piscine olympique depuis qu'elle a dix ans.",
    question: "Quel sport pratique la sœur de la personne qui parle ?",
    options: ["La natation", "La course", "Le vélo"],
    answer: 0
  },
  conversation: [
    "Faites-vous du sport régulièrement ? Lequel ?",
    "Préférez-vous les sports d'équipe ou individuels ?",
    "Y a-t-il un sport que vous rêvez d'essayer un jour ?"
  ],
  challenge: "Enregistre-toi : explique ta routine sportive (ou celle que tu aimerais avoir) en 30-40 secondes."
},

// ---------- JOUR 10 : littérature (milestone) ----------
{
  day: 10, category: "litt", icon: "🕯️", milestone: true,
  title: "Chateaubriand et René : l'exil intérieur",
  tongueTwister: { fr: "René rentre, seul, rêvant d'un ailleurs radieux.", tip: "Le « r » uvulaire répété : gardez la gorge détendue." },
  vocab: [
    { fr: "l'exil", ipa: "ɛg.zil", note: "L'esilio." },
    { fr: "tourmenté(e)", ipa: "tuʁ.mɑ̃.te", note: "Nasale « en » interne." },
    { fr: "l'aliénation", ipa: "a.lje.na.sjɔ̃", note: "L'alienazione." },
    { fr: "s'intégrer", ipa: "sɛ̃.te.gʁe", note: "Nasale « in » au début." },
    { fr: "errer", ipa: "ɛ.ʁe", note: "Vagare : deux « r » à l'écrit, un seul son à l'oral." }
  ],
  listening: {
    text: "Dans son roman René, Chateaubriand raconte l'histoire d'un jeune homme incapable de trouver sa place dans la société. Il erre, tourmenté, entre plusieurs pays, sans jamais se sentir chez lui nulle part. Ce sentiment d'exil intérieur deviendra une figure centrale de toute la littérature romantique.",
    question: "Que ressent René, le personnage de Chateaubriand ?",
    options: ["Un sentiment d'exil intérieur", "Une grande joie de vivre", "Une confiance totale en la société"],
    answer: 0
  },
  conversation: [
    "Vous êtes-vous déjà senti(e) « étranger(ère) » quelque part, même chez vous ?",
    "Pensez-vous qu'on puisse se sentir exilé sans jamais avoir quitté son pays ?",
    "Qu'est-ce qui aide, selon vous, à se sentir « chez soi » quelque part ?"
  ],
  challenge: "Révision éclair : rappelle-toi 3 mots des jours précédents, puis raconte un moment où tu t'es senti(e) un peu « étranger(ère) » quelque part.",
  concept: { title: "L'exil intérieur", def: "Sentiment de ne trouver sa place nulle part, illustré par René de Chateaubriand : une rupture profonde entre l'individu et la société qui l'entoure." },
  reviewRange: [6, 9]
},

// ---------- JOUR 11 : vie quotidienne ----------
{
  day: 11, category: "vie", icon: "🛍️",
  title: "Les vêtements et les achats",
  tongueTwister: { fr: "Ce sac chic se choisit chez ce chic chausseur.", tip: "Alternance « s »/« ch » à travailler lentement d'abord." },
  vocab: [
    { fr: "essayer", ipa: "ɛ.sɛ.je", note: "Provare (un vêtement) : le « y » devient semi-voyelle." },
    { fr: "ça vous va bien", ipa: "sa vu va bjɛ̃", note: "Expression classique en boutique." },
    { fr: "une taille", ipa: "tɑj", note: "« -ill- » se prononce « j », pas « l »." },
    { fr: "en solde", ipa: "ɑ̃ sɔld", note: "In saldo, in sconto." },
    { fr: "rembourser", ipa: "ʁɑ̃.buʁ.se", note: "Nasale « em » au début." }
  ],
  listening: {
    text: "Je suis allée dans une boutique cet après-midi pour acheter une nouvelle veste. La vendeuse m'a proposé d'essayer plusieurs tailles, et finalement, j'ai trouvé la bonne. En plus, la veste était en solde : moins trente pour cent !",
    question: "Pourquoi la personne est-elle particulièrement contente ?",
    options: ["La veste était en solde", "Elle a été mal conseillée", "Elle n'a rien acheté"],
    answer: 0
  },
  conversation: [
    "Aimez-vous faire du shopping, ou est-ce plutôt une corvée pour vous ?",
    "Préférez-vous acheter en ligne ou essayer les vêtements en magasin ?",
    "Quel a été votre meilleur ou pire achat récent ?"
  ],
  challenge: "Joue une petite scène : enregistre-toi comme si tu demandais à un(e) vendeur(euse) d'essayer un vêtement et son prix."
},

// ---------- JOUR 12 : littérature ----------
{
  day: 12, category: "litt", icon: "🎭",
  title: "Victor Hugo et le drame romantique",
  tongueTwister: { fr: "Hugo joue, sans jouer, un grotesque et sublime jeu.", tip: "Le son « j » [ʒ] répété : gardez-le doux, pas dur comme un « dj »." },
  vocab: [
    { fr: "le drame", ipa: "dʁam", note: "Il dramma, genere teatrale." },
    { fr: "mélanger les genres", ipa: "me.lɑ̃.ʒe le ʒɑ̃ʁ", note: "Mescolare i generi." },
    { fr: "le grotesque", ipa: "gʁɔ.tɛsk", note: "Il grottesco." },
    { fr: "rompre avec", ipa: "ʁɔ̃pʁ a.vɛk", note: "Rompere con : liaison possible." },
    { fr: "une préface", ipa: "pʁe.fas", note: "Una prefazione." }
  ],
  listening: {
    text: "En mille huit cent vingt-sept, Victor Hugo publie la préface de sa pièce Cromwell. Il y explique que le théâtre doit refléter toute la complexité de la vie, en mélangeant le grotesque et le sublime, le rire et les larmes. Cette idée choque les défenseurs du classicisme, qui séparaient strictement la tragédie et la comédie.",
    question: "Que défend Victor Hugo dans la préface de Cromwell ?",
    options: ["Le mélange des genres", "Le respect strict des règles classiques", "La suppression du théâtre"],
    answer: 0
  },
  conversation: [
    "Aimez-vous les œuvres (films, séries) qui mélangent l'humour et la tragédie ?",
    "Pensez-vous que la vie réelle ressemble plus à une comédie, à une tragédie, ou aux deux ?",
    "Connaissez-vous une œuvre de votre culture qui « casse les règles » comme Hugo l'a fait ?"
  ],
  challenge: "Enregistre-toi : raconte une histoire, réelle ou inventée, qui mélange un moment drôle et un moment triste.",
  concept: { title: "Le drame romantique", def: "Genre théâtral théorisé par Victor Hugo, qui mélange le grotesque et le sublime, la comédie et la tragédie, en rupture avec les règles classiques." }
},

// ---------- JOUR 13 : vie quotidienne ----------
{
  day: 13, category: "vie", icon: "🌦️",
  title: "La météo et les saisons",
  tongueTwister: { fr: "Il pleut, il vente, le vent vient et repart vite.", tip: "Nasale « en » (vent) à ne pas confondre avec « in »." },
  vocab: [
    { fr: "il fait beau / mauvais", ipa: "il fɛ bo / mo.vɛ", note: "Fa bel/brutto tempo." },
    { fr: "il pleut / il neige", ipa: "il plø / il nɛʒ", note: "Piove/nevica." },
    { fr: "un orage", ipa: "ɔ.ʁaʒ", note: "Un temporale." },
    { fr: "le brouillard", ipa: "bʁu.jaʁ", note: "La nebbia : « -ill- » se prononce « j »." },
    { fr: "se réchauffer", ipa: "sə ʁe.ʃo.fe", note: "Riscaldarsi." }
  ],
  listening: {
    text: "Aujourd'hui, il fait un temps assez gris à Paris : il y a du brouillard le matin, puis quelques averses l'après-midi. En automne, la météo change très vite en France : un jour il fait beau et doux, le lendemain un orage éclate sans prévenir.",
    question: "Comment est la météo en automne en France, selon le texte ?",
    options: ["Elle change très vite", "Elle est toujours stable", "Il ne pleut jamais"],
    answer: 0
  },
  conversation: [
    "Quel temps fait-il aujourd'hui chez vous ?",
    "Quelle est votre saison préférée, et pourquoi ?",
    "Le temps qu'il fait influence-t-il votre humeur ?"
  ],
  challenge: "Enregistre-toi : fais un petit bulletin météo imaginaire pour ta ville, comme à la télévision."
},

// ---------- JOUR 14 : littérature ----------
{
  day: 14, category: "litt", icon: "🌊",
  title: "Lamartine : le temps et la mémoire",
  tongueTwister: { fr: "Le temps fend le vent, lentement, sans jamais s'arrêter.", tip: "Nasale « en/an » répétée : gardez un débit régulier." },
  vocab: [
    { fr: "la fuite du temps", ipa: "fɥit dy tɑ̃", note: "La fuga del tempo." },
    { fr: "figer", ipa: "fi.ʒe", note: "Fissare, immobilizzare." },
    { fr: "un instant", ipa: "œ̃n‿ɛ̃s.tɑ̃", note: "Liaison : « un_instant »." },
    { fr: "éternel(le)", ipa: "e.tɛʁ.nɛl", note: "Eterno." },
    { fr: "s'écouler", ipa: "se.ku.le", note: "Scorrere (il tempo)." }
  ],
  listening: {
    text: "Le poète Alphonse de Lamartine est hanté par la fuite du temps. Il voudrait arrêter, figer pour toujours un instant de bonheur vécu près d'un lac, mais il sait que c'est impossible : le temps s'écoule, implacable, et seule la mémoire peut garder vivant ce moment disparu.",
    question: "Que voudrait faire le poète avec l'instant de bonheur, selon le texte ?",
    options: ["Le figer pour toujours", "L'oublier rapidement", "Le raconter à tout le monde"],
    answer: 0
  },
  conversation: [
    "Existe-t-il un instant de votre vie que vous aimeriez « figer » pour toujours ?",
    "Pensez-vous que la mémoire soit un bon refuge contre le temps qui passe ?",
    "Prenez-vous des photos, ou tenez-vous un journal, pour garder vos souvenirs ?"
  ],
  challenge: "Enregistre-toi : décris un souvenir précis que tu voudrais garder pour toujours, et pourquoi.",
  concept: { title: "Le temps et la mémoire", def: "Thème central chez Lamartine : la conscience douloureuse de la fuite du temps, face à laquelle la mémoire devient le seul refuge possible." }
},

// ---------- JOUR 15 : vie quotidienne (milestone) ----------
{
  day: 15, category: "vie", icon: "🗺️", milestone: true,
  title: "La ville et les directions",
  tongueTwister: { fr: "Tout droit, puis à droite, très vite, trouve la route.", tip: "Le « r » français répété : au fond de la gorge, sans le rouler." },
  vocab: [
    { fr: "tout droit", ipa: "tu dʁwa", note: "Sempre dritto." },
    { fr: "tourner à gauche/droite", ipa: "tuʁ.ne a goʃ / dʁwat", note: "Girare a sinistra/destra." },
    { fr: "au coin de la rue", ipa: "o kwɛ̃ də la ʁy", note: "All'angolo della strada." },
    { fr: "traverser", ipa: "tʁa.vɛʁ.se", note: "Attraversare." },
    { fr: "se perdre", ipa: "sə pɛʁdʁ", note: "Perdersi." }
  ],
  listening: {
    text: "Excusez-moi, pour aller à la gare, s'il vous plaît ? — Alors, vous continuez tout droit jusqu'au feu rouge, puis vous tournez à gauche. Vous traversez le pont, et la gare est juste là, au coin de la rue, à côté de la boulangerie.",
    question: "Où se trouve la gare, d'après les indications ?",
    options: ["Au coin de la rue, à côté de la boulangerie", "En face de la mairie", "Derrière l'église"],
    answer: 0
  },
  conversation: [
    "Vous perdez-vous facilement dans une ville inconnue ?",
    "Préférez-vous utiliser un GPS ou demander votre chemin à quelqu'un ?",
    "Décrivez le chemin de chez vous jusqu'à votre endroit préféré en ville."
  ],
  challenge: "Révision éclair : rappelle-toi 3 mots des jours précédents, puis explique le chemin de chez toi jusqu'au supermarché le plus proche.",
  reviewRange: [11, 14]
},

// ---------- JOUR 16 : littérature (milestone) ----------
{
  day: 16, category: "litt", icon: "🌙",
  title: "Musset : passion et mélancolie",
  tongueTwister: { fr: "Musset s'amuse, muet, sous la lune émue.", tip: "Le « u » français /y/ répété (Musset, muet, lune) : lèvres arrondies." },
  vocab: [
    { fr: "la passion", ipa: "pa.sjɔ̃", note: "La passione." },
    { fr: "idéalisé(e)", ipa: "i.de.a.li.ze", note: "Idealizzato." },
    { fr: "la déception", ipa: "de.sɛp.sjɔ̃", note: "La delusione." },
    { fr: "le tourment", ipa: "tuʁ.mɑ̃", note: "Il tormento." },
    { fr: "une grande finesse psychologique", ipa: "fi.nɛs psi.kɔ.lɔ.ʒik", note: "Finezza psicologica." }
  ],
  listening: {
    text: "Alfred de Musset incarne le dandy romantique : élégant, spirituel, mais profondément mélancolique. Dans son œuvre, il oppose sans cesse l'amour idéalisé, presque impossible à atteindre, à la réalité concrète des relations, souvent source de déceptions et de tourments.",
    question: "Quelle opposition est centrale dans l'œuvre de Musset, selon le texte ?",
    options: ["L'amour idéalisé et la réalité concrète", "La ville et la campagne", "La guerre et la paix"],
    answer: 0
  },
  conversation: [
    "Pensez-vous que l'amour « idéal » existe vraiment, ou est-ce toujours une part d'illusion ?",
    "Avez-vous déjà idéalisé une personne, une situation ou un souvenir ?",
    "Comment réagissez-vous face à une déception amoureuse ou amicale ?"
  ],
  challenge: "Enregistre-toi : parle d'une différence que tu as remarquée entre « ce qu'on imagine » et « ce qui se passe vraiment » dans une relation ou une situation.",
  concept: { title: "Le dandy romantique", def: "Figure incarnée par Musset : élégance et ironie en surface, mélancolie profonde en dessous, tiraillée entre l'amour idéalisé et la réalité décevante." }
},

// ---------- JOUR 17 : vie quotidienne ----------
{
  day: 17, category: "vie", icon: "✈️",
  title: "Les transports et les voyages",
  tongueTwister: { fr: "Le train traîne, tranquille, à travers trois vallées.", tip: "Nasale « ain/an » répétée : gardez le rythme du train, régulier." },
  vocab: [
    { fr: "prendre le train", ipa: "pʁɑ̃dʁ lə tʁɛ̃", note: "Prendere il treno." },
    { fr: "un billet aller-retour", ipa: "bi.jɛ a.le ʁə.tuʁ", note: "Un biglietto andata e ritorno." },
    { fr: "rater", ipa: "ʁa.te", note: "Perdere (un mezzo de transporto)." },
    { fr: "embarquer", ipa: "ɑ̃.baʁ.ke", note: "Imbarcarsi." },
    { fr: "le décalage horaire", ipa: "de.ka.laʒ ɔ.ʁɛʁ", note: "Il fuso orario." }
  ],
  listening: {
    text: "L'été dernier, j'ai pris l'avion pour la première fois depuis longtemps. J'ai failli rater mon vol parce que les contrôles de sécurité étaient très longs ! Une fois arrivée, j'ai eu un peu de mal avec le décalage horaire pendant deux jours. Mais le voyage en valait vraiment la peine.",
    question: "Qu'est-ce qui a failli arriver à la personne à l'aéroport ?",
    options: ["Elle a failli rater son vol", "Elle a perdu ses bagages", "Elle est arrivée en avance"],
    answer: 0
  },
  conversation: [
    "Quel est votre moyen de transport préféré pour voyager, et pourquoi ?",
    "Racontez un souvenir de voyage, positif ou compliqué.",
    "Préférez-vous organiser vos voyages à l'avance ou partir à l'improviste ?"
  ],
  challenge: "Enregistre-toi : raconte ton dernier voyage, ou celui dont tu rêves, en 40 secondes."
},

// ---------- JOUR 18 : littérature ----------
{
  day: 18, category: "litt", icon: "🗻",
  title: "Vigny : la solitude du génie",
  tongueTwister: { fr: "Le génie se tient seul, sans lien, sur la cime.", tip: "Le son « ɲ » de « génie » (comme « gn » italien) doit rester léger." },
  vocab: [
    { fr: "le génie", ipa: "ʒe.ni", note: "Il genio." },
    { fr: "la solitude", ipa: "sɔ.li.tyd", note: "La solitudine." },
    { fr: "indifférent(e)", ipa: "ɛ̃.di.fe.ʁɑ̃", note: "Indifferente." },
    { fr: "le stoïcisme", ipa: "stɔ.i.sism", note: "Lo stoicismo." },
    { fr: "endurer", ipa: "ɑ̃.dy.ʁe", note: "Sopportare, subire." }
  ],
  listening: {
    text: "Le poète Alfred de Vigny pense que l'homme de génie, l'artiste, est presque toujours condamné à la solitude, incompris par la société qui l'entoure. Pire encore : selon lui, la nature elle-même reste indifférente à la souffrance humaine. Face à ce silence du monde, seul le stoïcisme permet d'endurer la douleur.",
    question: "Que pense Vigny de la nature, selon le texte ?",
    options: ["Elle est indifférente à la souffrance humaine", "Elle console toujours l'homme", "Elle punit les hommes"],
    answer: 0
  },
  conversation: [
    "Pensez-vous que les personnes très créatives ou talentueuses sont souvent plus seules ?",
    "Comment réagissez-vous face à une situation que vous ne pouvez pas changer ?",
    "La nature vous semble-t-elle plutôt « indifférente » ou « bienveillante » ?"
  ],
  challenge: "Enregistre-toi : parle d'un moment où tu as dû simplement « accepter » une situation difficile sans pouvoir la changer.",
  concept: { title: "La solitude du génie", def: "Idée développée par Vigny : l'artiste est souvent condamné à la solitude et à l'incompréhension, face à une nature indifférente à la souffrance humaine." }
},

// ---------- JOUR 19 : vie quotidienne ----------
{
  day: 19, category: "vie", icon: "🩺",
  title: "La santé et le corps",
  tongueTwister: { fr: "J'ai mal au dos, au bras, au cou, ça me rend fou.", tip: "Voyelle « ou » [u] répétée : arrondis bien les lèvres." },
  vocab: [
    { fr: "avoir mal à", ipa: "a.vwaʁ mal a", note: "Avere male a (+ parte del corpo)." },
    { fr: "prendre rendez-vous", ipa: "pʁɑ̃dʁ ʁɑ̃.de.vu", note: "Prendere appuntamento." },
    { fr: "une ordonnance", ipa: "ɔʁ.dɔ.nɑ̃s", note: "Una ricetta medica." },
    { fr: "se sentir bien/mal", ipa: "sə sɑ̃.tiʁ bjɛ̃ / mal", note: "Sentirsi bene/male." },
    { fr: "guérir", ipa: "ge.ʁiʁ", note: "Guarire." }
  ],
  listening: {
    text: "Depuis deux jours, j'ai mal à la gorge et un peu de fièvre. J'ai pris rendez-vous chez le médecin cet après-midi. Il m'a donné une ordonnance pour des médicaments et m'a conseillé de me reposer pendant quelques jours.",
    question: "Pourquoi la personne a-t-elle pris rendez-vous chez le médecin ?",
    options: ["Elle a mal à la gorge et de la fièvre", "Elle veut un certificat de sport", "Elle accompagne un ami"],
    answer: 0
  },
  conversation: [
    "Que faites-vous en général quand vous êtes un peu malade ?",
    "Faites-vous confiance à la médecine traditionnelle, aux remèdes naturels, ou aux deux ?",
    "Quelle habitude de santé aimeriez-vous améliorer ?"
  ],
  challenge: "Joue une scène : enregistre-toi comme si tu expliquais tes symptômes à un médecin."
},

// ---------- JOUR 20 : littérature (milestone) ----------
{
  day: 20, category: "litt", icon: "💭", milestone: true,
  title: "Nerval : rêve et folie",
  tongueTwister: { fr: "Le rêve se rêve, réel, et se referme, rêvé.", tip: "Voyelle « ê » [ɛ] répétée avec le « r » : ralentis pour bien l'articuler." },
  vocab: [
    { fr: "le rêve", ipa: "ʁɛv", note: "Il sogno." },
    { fr: "la folie", ipa: "fɔ.li", note: "La follia." },
    { fr: "le mysticisme", ipa: "mis.ti.sism", note: "Il misticismo." },
    { fr: "se confondre", ipa: "sə kɔ̃.fɔ̃dʁ", note: "Confondersi." },
    { fr: "l'inconscient", ipa: "ɛ̃.kɔ̃.sjɑ̃", note: "L'inconscio : trois nasales différentes." }
  ],
  listening: {
    text: "Gérard de Nerval vit à la frontière entre le rêve et la réalité. Dans ses textes, les deux se confondent souvent, jusqu'à devenir presque indissociables. Marqué par des périodes de troubles mentaux, il explore, avant la psychanalyse, les zones mystérieuses de l'inconscient.",
    question: "Que fait Nerval dans ses textes, selon le texte ?",
    options: ["Il confond le rêve et la réalité", "Il rejette totalement l'idée du rêve", "Il n'écrit que sur la vie quotidienne"],
    answer: 0
  },
  conversation: [
    "Vous souvenez-vous souvent de vos rêves ?",
    "Pensez-vous que les rêves puissent révéler quelque chose de vrai sur nous-mêmes ?",
    "Avez-vous déjà eu du mal, un instant, à distinguer un rêve d'un souvenir réel ?"
  ],
  challenge: "Enregistre-toi : raconte un rêve marquant que tu as fait, ou invente-en un, en 40 secondes.",
  concept: { title: "Le rêve et la folie", def: "Chez Nerval, le rêve et la réalité se confondent : une exploration précoce de l'inconscient, avant même la naissance de la psychanalyse." },
  reviewRange: [16, 19]
},

// ---------- JOUR 21 : vie quotidienne ----------
{
  day: 21, category: "vie", icon: "💼",
  title: "Le travail et les études",
  tongueTwister: { fr: "Ce travail se fait vite si tu te concentres bien.", tip: "Le son « v » et « f » : bien distinguer les deux (lèvres/dents)." },
  vocab: [
    { fr: "un entretien d'embauche", ipa: "ɑ̃.tʁə.tjɛ̃ dɑ̃.boʃ", note: "Un colloquio di lavoro." },
    { fr: "postuler", ipa: "pɔs.ty.le", note: "Candidarsi." },
    { fr: "un stage", ipa: "staʒ", note: "Uno stage/tirocinio." },
    { fr: "un collègue", ipa: "kɔ.lɛg", note: "Un collega." },
    { fr: "gérer son temps", ipa: "ʒe.ʁe sɔ̃ tɑ̃", note: "Gestire il proprio tempo." }
  ],
  listening: {
    text: "J'ai postulé pour un stage dans une entreprise de communication, et j'ai passé mon entretien d'embauche hier. Le recruteur m'a posé beaucoup de questions sur mes études et mes expériences précédentes. Je pense que ça s'est plutôt bien passé.",
    question: "Qu'est-ce que la personne attend maintenant ?",
    options: ["La réponse de l'entreprise", "Le début de ses études", "Un remboursement"],
    answer: 0
  },
  conversation: [
    "Que faites-vous actuellement : vous étudiez, vous travaillez, ou les deux ?",
    "Quel a été votre meilleur (ou pire) souvenir d'entretien ou d'examen ?",
    "Comment gérez-vous votre temps entre travail/études et vie personnelle ?"
  ],
  challenge: "Joue une scène : enregistre-toi en répondant à la question « Parlez-moi de vous », comme dans un entretien d'embauche."
},

// ---------- JOUR 22 : littérature ----------
{
  day: 22, category: "litt", icon: "✍️",
  title: "George Sand et le romantisme social",
  tongueTwister: { fr: "George s'engage, sage, sans jamais se figer.", tip: "Le « g » de « George » se prononce « j » doux, comme en anglais." },
  vocab: [
    { fr: "s'engager", ipa: "sɑ̃.ga.ʒe", note: "Impegnarsi." },
    { fr: "l'émancipation", ipa: "e.mɑ̃.si.pa.sjɔ̃", note: "L'emancipazione." },
    { fr: "rural(e)", ipa: "ʁy.ʁal", note: "Rurale." },
    { fr: "un pseudonyme", ipa: "psø.dɔ.nim", note: "Uno pseudonimo." },
    { fr: "défendre une cause", ipa: "de.fɑ̃dʁ yn koz", note: "Difendere una causa." }
  ],
  listening: {
    text: "George Sand, de son vrai nom Amantine Aurore Dupin, choisit un pseudonyme masculin pour être publiée plus facilement à son époque. Ses romans défendent souvent la vie rurale et les droits des femmes, à une période où très peu d'écrivaines s'engageaient ouvertement pour ces causes.",
    question: "Pourquoi George Sand choisit-elle un pseudonyme masculin ?",
    options: ["Pour être publiée plus facilement à son époque", "Parce qu'elle détestait son vrai nom", "Pour cacher qu'elle était écrivaine"],
    answer: 0
  },
  conversation: [
    "Pensez-vous qu'il soit encore difficile, aujourd'hui, de s'exprimer librement à cause de préjugés ?",
    "Une cause vous tient-elle particulièrement à cœur ?",
    "Que pensez-vous de l'idée de changer de nom pour réussir dans un domaine ?"
  ],
  challenge: "Enregistre-toi : parle d'une cause (sociale, environnementale...) qui te tient à cœur, en 30-40 secondes.",
  concept: { title: "Le romantisme social", def: "Facette du romantisme incarnée par George Sand : un engagement pour la vie rurale et l'émancipation des femmes, au-delà du seul lyrisme individuel." }
},

// ---------- JOUR 23 : vie quotidienne ----------
{
  day: 23, category: "vie", icon: "📱",
  title: "La technologie et les réseaux sociaux",
  tongueTwister: { fr: "Ce texto se tape vite, tant que ta tête se tait.", tip: "Le « t » répété doit rester net, sans aspiration comme en anglais." },
  vocab: [
    { fr: "un écran", ipa: "e.kʁɑ̃", note: "Uno schermo." },
    { fr: "télécharger", ipa: "te.le.ʃaʁ.ʒe", note: "Scaricare." },
    { fr: "partager", ipa: "paʁ.ta.ʒe", note: "Condividere." },
    { fr: "être connecté(e)", ipa: "ɛtʁ kɔ.nɛk.te", note: "Essere connesso." },
    { fr: "se déconnecter", ipa: "sə de.kɔ.nɛk.te", note: "Disconnettersi." }
  ],
  listening: {
    text: "Je passe beaucoup trop de temps sur mon téléphone, surtout sur les réseaux sociaux, je dois l'admettre ! Le soir, j'essaie de me déconnecter au moins une heure avant de dormir, mais ce n'est pas toujours facile. Mon frère, lui, a complètement supprimé une application pour retrouver du temps libre.",
    question: "Qu'a fait le frère de la personne pour retrouver du temps libre ?",
    options: ["Il a supprimé une application", "Il a acheté un nouveau téléphone", "Il a changé de travail"],
    answer: 0
  },
  conversation: [
    "Combien de temps par jour passez-vous, selon vous, sur votre téléphone ?",
    "Les réseaux sociaux ont-ils, selon vous, plus d'avantages ou d'inconvénients ?",
    "Avez-vous déjà essayé une « pause numérique » ? Comment cela s'est-il passé ?"
  ],
  challenge: "Enregistre-toi : donne trois raisons pour lesquelles les réseaux sociaux peuvent être utiles, ou au contraire problématiques."
},

// ---------- JOUR 24 : littérature ----------
{
  day: 24, category: "litt", icon: "🖋️",
  title: "Théophile Gautier : l'art pour l'art",
  tongueTwister: { fr: "L'art, pour l'art, s'admire sans autre part.", tip: "Voyelle « a » [a] bien ouverte, sans la fermer comme en italien." },
  vocab: [
    { fr: "l'art pour l'art", ipa: "laʁ puʁ laʁ", note: "L'arte per l'arte." },
    { fr: "l'utilité", ipa: "y.ti.li.te", note: "L'utilità." },
    { fr: "la beauté pure", ipa: "bo.te pyʁ", note: "La bellezza pura." },
    { fr: "polémique", ipa: "pɔ.le.mik", note: "Polemico." },
    { fr: "annoncer", ipa: "a.nɔ̃.se", note: "Annunciare, preannunciare." }
  ],
  listening: {
    text: "Théophile Gautier défend une idée qui fait beaucoup débat : l'art n'a pas besoin d'être utile ou moral pour avoir de la valeur ; il peut exister uniquement pour sa beauté. Dans la préface polémique de son roman Mademoiselle de Maupin, il annonce déjà les idées du mouvement du Parnasse.",
    question: "Que défend Théophile Gautier, selon le texte ?",
    options: ["L'art n'a pas besoin d'être utile pour avoir de la valeur", "L'art doit toujours enseigner une leçon", "L'art doit être interdit s'il n'est pas moral"],
    answer: 0
  },
  conversation: [
    "Pensez-vous que l'art doive avoir un message ou une utilité sociale ?",
    "Connaissez-vous une œuvre que vous aimez uniquement pour sa beauté, sans message particulier ?",
    "Où tracez-vous la limite entre l'art et le divertissement pur ?"
  ],
  challenge: "Enregistre-toi : défends une opinion (art utile vs art pour l'art) en 30-40 secondes, comme dans un petit débat.",
  concept: { title: "L'art pour l'art", def: "Formule défendue par Théophile Gautier : l'art n'a pas besoin d'utilité morale ou sociale, sa seule justification est la beauté." }
},

// ---------- JOUR 25 : vie quotidienne (milestone) ----------
{
  day: 25, category: "vie", icon: "🚀", milestone: true,
  title: "Les projets et le futur",
  tongueTwister: { fr: "Demain, je ferai, sans faillir, ce que je n'ai pas fait.", tip: "Futur simple : bien marquer le « r » avant la terminaison." },
  vocab: [
    { fr: "avoir l'intention de", ipa: "a.vwaʁ lɛ̃.tɑ̃.sjɔ̃ də", note: "Avere intenzione di." },
    { fr: "un objectif", ipa: "ɔb.ʒɛk.tif", note: "Un obiettivo." },
    { fr: "à long terme", ipa: "a lɔ̃ tɛʁm", note: "A lungo termine." },
    { fr: "se lancer", ipa: "sə lɑ̃.se", note: "Lanciarsi, buttarsi in qualcosa." },
    { fr: "réaliser un rêve", ipa: "ʁe.a.li.ze œ̃ ʁɛv", note: "Realizzare un sogno." }
  ],
  listening: {
    text: "Dans cinq ans, j'aimerais avoir terminé mes études et me lancer dans mon propre projet professionnel. J'ai aussi l'intention de voyager davantage, surtout en Amérique du Sud. Mon objectif à long terme, c'est surtout de trouver un bon équilibre entre ma vie professionnelle et ma vie personnelle.",
    question: "Quel est l'objectif à long terme de la personne ?",
    options: ["Trouver un équilibre entre vie pro et vie perso", "Devenir très riche rapidement", "Ne plus jamais travailler"],
    answer: 0
  },
  conversation: [
    "Où vous voyez-vous dans cinq ans ?",
    "Avez-vous un rêve que vous aimeriez réaliser un jour, même s'il semble difficile ?",
    "Préférez-vous planifier votre avenir en détail, ou avancer plus spontanément ?"
  ],
  challenge: "Révision éclair : rappelle-toi 3 mots des jours précédents, puis décris un projet ou un rêve que tu as pour les 5 prochaines années.",
  reviewRange: [21, 24]
},

// ---------- JOUR 26 : littérature ----------
{
  day: 26, category: "litt", icon: "🔬",
  title: "La transition vers le Réalisme",
  tongueTwister: { fr: "L'observateur observe, sans rêver, ce qu'il voit.", tip: "Voyelle « o » [ɔ] répétée : garde-la ouverte et brève." },
  vocab: [
    { fr: "l'observation", ipa: "ɔp.sɛʁ.va.sjɔ̃", note: "L'osservazione." },
    { fr: "le déterminisme social", ipa: "de.tɛʁ.mi.nism sɔ.sjal", note: "Il determinismo sociale." },
    { fr: "disséquer", ipa: "di.se.ke", note: "Sezionare, analizzare a fondo." },
    { fr: "le positivisme", ipa: "pɔ.zi.ti.vism", note: "Il positivismo." },
    { fr: "anticiper", ipa: "ɑ̃.ti.si.pe", note: "Anticipare." }
  ],
  listening: {
    text: "Vers le milieu du dix-neuvième siècle, certains écrivains, comme Balzac ou Flaubert, changent complètement d'approche. Au lieu de projeter leurs émotions sur le monde, ils observent la société avec la précision froide d'un scientifique, cherchant à comprendre comment le milieu social façonne chaque individu.",
    question: "Comment les écrivains réalistes observent-ils le monde, selon le texte ?",
    options: ["Avec la précision froide d'un scientifique", "En exagérant leurs émotions", "En ignorant la société"],
    answer: 0
  },
  conversation: [
    "Préférez-vous les œuvres qui décrivent le monde « tel qu'il est », ou celles qui l'idéalisent ?",
    "Pensez-vous que notre milieu social nous détermine vraiment, ou peut-on toujours s'en libérer ?",
    "Le journalisme d'aujourd'hui vous semble-t-il plus « romantique » ou plus « réaliste » ?"
  ],
  challenge: "Enregistre-toi : décris une scène de ta vie quotidienne comme le ferait un romancier réaliste, avec des détails très précis.",
  concept: { title: "La rupture épistémologique", def: "Passage du romantisme au réalisme : les écrivains cessent de projeter leurs émotions sur le monde et adoptent une posture d'observation objective de la société." }
},

// ---------- JOUR 27 : vie quotidienne ----------
{
  day: 27, category: "vie", icon: "🌍",
  title: "L'environnement et l'écologie",
  tongueTwister: { fr: "Trier, jeter, recycler : trois gestes pour la Terre.", tip: "Le « r » français dans « trier », « Terre » : au fond de la gorge." },
  vocab: [
    { fr: "recycler", ipa: "ʁə.si.kle", note: "Riciclare." },
    { fr: "réduire les déchets", ipa: "ʁe.dɥiʁ le de.ʃɛ", note: "Ridurre i rifiuti." },
    { fr: "les énergies renouvelables", ipa: "e.nɛʁ.ʒi ʁə.nu.vlabl", note: "Le energie rinnovabili." },
    { fr: "le réchauffement climatique", ipa: "ʁe.ʃof.mɑ̃ kli.ma.tik", note: "Il riscaldamento climatico." },
    { fr: "consommer", ipa: "kɔ̃.sɔ.me", note: "Consumare." }
  ],
  listening: {
    text: "De plus en plus de personnes essaient de réduire leur impact sur l'environnement : elles trient leurs déchets, achètent moins de vêtements neufs, ou privilégient les transports en commun. Le réchauffement climatique inquiète beaucoup les jeunes générations.",
    question: "Que font certaines personnes pour réduire leur impact environnemental ?",
    options: ["Elles trient leurs déchets et achètent moins", "Elles ignorent totalement le problème", "Elles utilisent plus leur voiture"],
    answer: 0
  },
  conversation: [
    "Faites-vous des gestes au quotidien pour l'environnement ? Lesquels ?",
    "Pensez-vous que les gestes individuels suffisent, ou faut-il surtout des décisions politiques ?",
    "Le changement climatique vous inquiète-t-il beaucoup ?"
  ],
  challenge: "Enregistre-toi : propose trois gestes simples que tout le monde pourrait faire pour l'environnement."
},

// ---------- JOUR 28 : littérature ----------
{
  day: 28, category: "litt", icon: "🌌",
  title: "L'héritage du Romantisme",
  tongueTwister: { fr: "Le spleen s'étend, lentement, sans jamais finir.", tip: "« Spleen » est un mot anglais francisé : prononce « splin »." },
  vocab: [
    { fr: "l'héritage", ipa: "e.ʁi.taʒ", note: "L'eredità." },
    { fr: "le spleen", ipa: "splin", note: "Mélancolie moderne, mot anglais francisé." },
    { fr: "l'artiste maudit", ipa: "aʁ.tist mo.di", note: "L'artista maledetto." },
    { fr: "la transcendance", ipa: "tʁɑ̃s.sɑ̃.dɑ̃s", note: "La trascendenza : trois nasales identiques." },
    { fr: "l'existentialisme", ipa: "ɛg.zis.tɑ̃.sja.lism", note: "L'esistenzialismo." }
  ],
  listening: {
    text: "Le romantisme laisse un héritage immense à la modernité : la figure de l'artiste maudit, en marge de la société, se retrouve chez les poètes symbolistes puis dans la musique et le cinéma d'aujourd'hui. La grande question romantique traverse ensuite tout l'existentialisme du vingtième siècle.",
    question: "Quelle question romantique traverse l'existentialisme, selon le texte ?",
    options: ["Comment donner un sens à la vie sans certitudes religieuses", "Comment gagner de l'argent rapidement", "Comment respecter les règles classiques"],
    answer: 0
  },
  conversation: [
    "Connaissez-vous un artiste moderne qu'on pourrait qualifier d'« artiste maudit » ?",
    "Comment donnez-vous un sens à votre vie, personnellement ?",
    "Pensez-vous que les grandes questions posées il y a deux cents ans soient toujours d'actualité ?"
  ],
  challenge: "Enregistre-toi : partage ta propre réponse à la question « comment donner un sens à sa vie », en 40 secondes.",
  concept: { title: "L'héritage du romantisme", def: "La figure de l'artiste maudit et la question du sens de l'existence, léguées par le romantisme, traversent le symbolisme puis l'existentialisme du XXe siècle." }
},

// ---------- JOUR 29 : vie quotidienne ----------
{
  day: 29, category: "vie", icon: "🎉",
  title: "Les fêtes et les traditions",
  tongueTwister: { fr: "Cette fête se fête, fêtée, sans jamais s'arrêter.", tip: "Accent circonflexe « ê » [ɛ] : n'allonge pas trop la voyelle." },
  vocab: [
    { fr: "fêter", ipa: "fɛ.te", note: "Festeggiare." },
    { fr: "un cadeau", ipa: "ka.do", note: "Un regalo." },
    { fr: "une coutume", ipa: "ku.tym", note: "Un'usanza." },
    { fr: "se réunir", ipa: "sə ʁe.y.niʁ", note: "Riunirsi." },
    { fr: "un souvenir marquant", ipa: "su.vniʁ maʁ.kɑ̃", note: "Un ricordo indimenticabile." }
  ],
  listening: {
    text: "Chaque année, ma famille se réunit pour le réveillon de fin d'année : on prépare un grand repas ensemble, on échange des cadeaux et on reste souvent debout jusqu'à minuit pour fêter la nouvelle année. C'est un moment que j'attends toujours avec impatience.",
    question: "Qu'attend la personne avec impatience chaque année ?",
    options: ["Le réveillon de fin d'année en famille", "Un voyage à l'étranger", "Un jour de travail"],
    answer: 0
  },
  conversation: [
    "Quelle est votre fête préférée dans votre culture, et comment la célébrez-vous ?",
    "Avez-vous une tradition familiale à laquelle vous tenez particulièrement ?",
    "Y a-t-il une fête française que vous trouvez intéressante ou originale ?"
  ],
  challenge: "Enregistre-toi : décris ta fête préférée et comment tu la célèbres habituellement."
},

// ---------- JOUR 30 : grand final ----------
{
  day: 30, category: "final", icon: "🏆", milestone: true,
  title: "Grand oral final : romantisme, réalisme et bilan",
  tongueTwister: { fr: "Trente jours de mots, dits, redits, jamais oubliés.", tip: "Relis chaque virelangue du parcours si tu as le temps : c'est le grand jour !" },
  vocab: [
    { fr: "le bilan", ipa: "bi.lɑ̃", note: "Il bilancio." },
    { fr: "progresser", ipa: "pʁɔ.gʁɛ.se", note: "Progredire." },
    { fr: "défendre un point de vue", ipa: "de.fɑ̃dʁ œ̃ pwɛ̃ də vy", note: "Difendere un punto di vista." },
    { fr: "convaincre", ipa: "kɔ̃.vɛ̃kʁ", note: "Convincere." },
    { fr: "avec fierté", ipa: "a.vɛk fjɛʁ.te", note: "Con orgoglio." }
  ],
  listening: {
    text: "Voilà trente jours que tu t'entraînes à parler, écouter et comprendre le français, à travers la vie quotidienne et l'un des mouvements littéraires les plus riches de son histoire : le romantisme. Aujourd'hui, c'est à toi de jouer : défends ton propre point de vue, avec les mots que tu as appris, et surtout, avec fierté.",
    question: "Que doit faire l'apprenant aujourd'hui, selon le texte ?",
    options: ["Défendre son propre point de vue avec fierté", "Recommencer le programme depuis le début", "Arrêter d'apprendre le français"],
    answer: 0
  },
  conversation: [
    "Parmi tous les concepts du romantisme découverts (mal du siècle, sublime, art pour l'art...), lequel vous a le plus marqué(e) ?",
    "Si vous deviez défendre le romantisme OU le classicisme dans un débat, lequel choisiriez-vous, et pourquoi ?",
    "Quel a été votre exercice préféré durant ces trente jours ?"
  ],
  challenge: "Grand oral final : enregistre-toi pendant 60 secondes minimum, où tu défends le romantisme OU le classicisme, en utilisant au moins 3 mots de vocabulaire appris pendant ce parcours.",
  concept: { title: "Le Grand Bilan", def: "Trente jours de pratique orale : de la vie quotidienne au romantisme, jusqu'au réalisme et à son héritage moderne. Un parcours complet vers plus de confiance à l'oral." },
  reviewRange: [26, 29]
}

];

/* ---------------- Badges (débloqués selon la progression) ---------------- */
const BADGES = [
  { id: "day1", title: "Premier pas", desc: "Terminer le Jour 1", icon: "🌱", check: s => s.completedDays.includes(1) },
  { id: "day7", title: "Une semaine de folie", desc: "Terminer 7 jours au total", icon: "📚", check: s => s.completedDays.length >= 7 },
  { id: "streak7", title: "Assidu(e)", desc: "7 jours d'affilée", icon: "🔥", check: s => s.bestStreak >= 7 },
  { id: "day15", title: "Mi-parcours", desc: "Terminer le Jour 15", icon: "🗺️", check: s => s.completedDays.includes(15) },
  { id: "concepts7", title: "Collectionneur", desc: "Débloquer 7 fiches concept", icon: "🔖", check: s => s.unlockedConcepts.length >= 7 },
  { id: "day25", title: "Presque au bout", desc: "Terminer le Jour 25", icon: "⛰️", check: s => s.completedDays.includes(25) },
  { id: "concepts14", title: "Érudit(e) romantique", desc: "Débloquer toutes les fiches concept", icon: "🎓", check: s => s.unlockedConcepts.length >= TOTAL_CONCEPTS },
  { id: "day30", title: "Grand oral", desc: "Terminer le Jour 30", icon: "🏆", check: s => s.completedDays.includes(30) },
  { id: "allDone", title: "Discipline de fer", desc: "Terminer les 30 jours", icon: "💎", check: s => s.completedDays.length >= 30 }
];

const TOTAL_DAYS = CURRICULUM.length;
const TOTAL_CONCEPTS = CURRICULUM.filter(d => d.concept).length;
