// ====================================================================
//  CONTENU PRODIGIO : tout le texte du site vit ici.
//  Deux cibles : celui qui VEND un bien d’exception (/vendre)
//  et celui qui ACHÈTE un bien d’exception (/acheter).
//
//  Règles de rédaction (à garder en cas de modification) :
//  · résultats PRODIGIO au passé et rattachés au chalet de Font-Romeu ;
//  · Cassis : jamais de location saisonnière ni de revenu locatif,
//    vue mer de la maison Jean-Jaurès = mezzanine uniquement ;
//  · Les 2 Alpes : jamais de liaison Alpe d’Huez ni de JO 2030 ;
//  · le chalet Mitja est VENDU, jamais présenté comme à vendre ;
//  · pas de tiret long (—) dans les textes.
// ====================================================================

const m = (name) => ({
  src: `/media/i/${name}-1800.webp`,
  srcSmall: `/media/i/${name}-900.webp`,
})
const v = (name) => ({ src: `/media/v/${name}.mp4`, poster: `/media/v/${name}.jpg` })

export const brand = {
  name: 'PRODIGIO',
  baseline: 'Immobilier d’exception',
  whatsapp: 'https://wa.me/33631909998',
  phoneLabel: '06 31 90 99 98',
}

export const media = { m, v }

/* -------------------------------------------------------------------- */
/*  LES BIENS                                                           */
/* -------------------------------------------------------------------- */
export const properties = [
  {
    slug: 'jean-jaures',
    status: 'En vente',
    name: 'Maison Jean-Jaurès',
    place: 'Cassis',
    region: 'Bouches-du-Rhône',
    hook: 'Il y a la Côte d’Azur qu’on montre, et il y a Cassis, qu’on garde pour soi.',
    text: 'Une maison de ville entièrement rénovée, à quelques pas du centre, du marché et des restaurants. Une pièce de vie de près de 50 m² sous les poutres, quatre chambres qui ont chacune leur salle d’eau, et tout en haut, une mezzanine qui regarde la mer et le Cap Canaille. Dehors, le jardin, les terrasses en pierre, la cuisine d’été et la piscine.',
    facts: [
      ['Surface', 'Environ 170 m²'],
      ['Chambres', '4, chacune avec sa salle d’eau'],
      ['Extérieurs', 'Jardin, terrasses, cuisine d’été, piscine'],
      ['Prix', 'Sur demande'],
    ],
    cover: m('jj-vue-aerienne-piscine'),
    gallery: [m('jj-piscine-jardin'), m('jj-reception-charpente'), m('jj-mezzanine'), m('jj-cassis-cap-canaille')],
    video: v('jj-piscine'),
    site: 'https://villa-jeanjaures-cassis.vercel.app',
  },
  {
    slug: 'verdun',
    status: 'En vente',
    name: 'Villa Verdun',
    place: 'Cassis',
    region: 'Bouches-du-Rhône',
    hook: 'Imaginez une pièce de vie où la mer fait partie du décor.',
    text: 'Des baies qui s’effacent dans les murs, une piscine de plain-pied, et en face, la mer et le Cap Canaille. La villa a été entièrement restructurée : une pièce de vie de 52 m² qui s’ouvre en grand sur la terrasse, une suite parentale face à la mer, et sous les pins, un studio indépendant pour recevoir.',
    facts: [
      ['Surface', '135 m² restructurés'],
      ['Terrain', 'Plus de 600 m²'],
      ['Chambres', '4, avec 4 salles d’eau, et un studio de 16 m²'],
      ['Atouts', 'Vue mer et Cap Canaille, piscine, garage, DPE B'],
    ],
    cover: m('verdun-piece-de-vie'),
    gallery: [m('verdun-vertical'), m('verdun-terrasse'), m('verdun-facade'), m('verdun-vue-port')],
    video: null,
    site: 'https://villa-verdun-cassis.vercel.app',
  },
  {
    slug: 'airelles',
    status: 'En commercialisation',
    name: 'Les Airelles',
    place: 'Les 2 Alpes',
    region: 'Isère',
    hook: 'Sur la place de Venosc, un ancien hôtel devient onze appartements.',
    text: 'Au cœur de la station, au pied des pistes, pour profiter de la montagne l’hiver comme l’été : le glacier culmine à 3 600 mètres et l’on y skie jusqu’en juillet. Des appartements de 59 à 140 m², presque tous avec terrasse, achetés hors taxes et confiés à un gestionnaire quand vous n’y êtes pas.',
    facts: [
      ['Disponibles', '9 appartements, de 59 à 140 m²'],
      ['Prix', 'De 525 000 € à 1,2 M€ HT'],
      ['Livraison', '2e semestre 2028'],
      ['Atouts', 'Terrasses, pied des pistes, TVA récupérable'],
    ],
    cover: m('airelles-facade-hiver'),
    gallery: [m('airelles-terrasse'), m('airelles-sejour'), m('airelles-chambre'), m('airelles-station')],
    video: null,
    site: null,
    note: 'Visuels 3D non contractuels.',
  },
  {
    slug: 'mitja',
    status: 'Vendu',
    name: 'Chalet Mitja',
    place: 'Font-Romeu',
    region: 'Pyrénées-Orientales',
    hook: 'Six mois en agence sans offre. Vendu en moins d’un mois avec PRODIGIO.',
    text: '270 m² neufs, six chambres, une table pour seize et la vue du Canigou à la Sierra del Cadí. Ce chalet est le premier que nous avons vendu, et celui qui a donné naissance à notre méthode.',
    facts: [
      ['Surface', '270 m²'],
      ['Prix affiché', '1,6 M€'],
      ['Demandes', 'Plus de 900'],
      ['Délai', 'Vendu en moins d’un mois'],
    ],
    cover: m('mitja-exterior-dusk'),
    gallery: [m('mitja-golden-hour-dining'), m('mitja-living-room'), m('mitja-mountain-panorama')],
    video: v('chalet-soir'),
    site: null,
    sold: true,
  },
]

/* -------------------------------------------------------------------- */
/*  ÉLÉMENTS COMMUNS                                                    */
/* -------------------------------------------------------------------- */
export const proof = {
  eyebrow: 'Étude de cas · Font-Romeu',
  title: 'Nous n’avons pas changé le prix.\nNous avons changé la façon de vendre.',
  context: 'Chalet neuf de 270 m² à Font-Romeu, proposé à 1,6 M€ par un marchand de biens.',
  before: {
    label: 'Six mois en agence de luxe',
    items: [
      ['2', 'visites'],
      ['0', 'offre'],
    ],
  },
  after: {
    label: 'Avec PRODIGIO',
    items: [
      { value: 900, prefix: '', suffix: '+', label: 'demandes d’acheteurs' },
      { value: 10, prefix: '', suffix: '+', label: 'visites sur place' },
      { value: 1, prefix: '< ', suffix: ' mois', label: 'pour signer' },
    ],
  },
  cities: ['Paris', 'Toulouse', 'Montpellier', 'Barcelone'],
  citiesNote:
    'Les demandes sont venues de Paris, de Toulouse, de Montpellier et de Barcelone. Aucun de ces acheteurs ne serait passé devant une vitrine des Pyrénées-Orientales.',
  footnote: 'Résultats obtenus sur un bien précis, qui ne préjugent pas des résultats sur un autre bien.',
}

export const story = {
  eyebrow: 'Notre histoire',
  title: 'Tout a commencé par un chalet.',
  acts: [
    {
      label: 'L’origine',
      text: 'Rayyân vient du marketing de performance. Dans une agence parisienne, son métier était de trouver des clients pour des produits vendus 5 000, 10 000 ou 50 000 € : ciblage, tunnel, qualification, relance immédiate.',
    },
    {
      label: 'Le déclencheur',
      text: 'Thibaut, le frère de Victor, est marchand de biens. Son chalet de Font-Romeu, à 1,6 M€, était en agence depuis six mois. Deux visites, aucune offre.',
    },
    {
      label: 'La question',
      text: 'Et si on appliquait à ce chalet exactement ce qu’on applique pour vendre une formation à 5 000 € ou un logiciel à 50 000 € ? Une marque, un film, une brochure, des publicités ciblées, une relance à chaque demande.',
    },
    {
      label: 'Le résultat',
      text: 'Plus de 900 demandes, plus de dix visites, et le chalet vendu en moins d’un mois. Ce jour-là, on a compris que le marketing de performance n’est pas une catégorie de produit. C’est une méthode.',
    },
  ],
  pivot: 'Le marketing de performance n’est pas une catégorie de produit. C’est une méthode.',
}

export const founders = {
  eyebrow: 'Les fondateurs',
  title: 'Un seul interlocuteur.\nTout un système derrière lui.',
  people: [
    {
      name: 'Victor Razeyre',
      role: 'Co-fondateur · sur le terrain',
      text: 'Il visite les biens, rencontre les propriétaires et les acheteurs, et suit chaque vente jusqu’à la signature.',
      photo: '/media/i/victor-1000.webp',
    },
    {
      name: 'Rayyân Djeridi',
      role: 'Co-fondateur · marketing et acquisition',
      text: 'Il conçoit la marque de chaque bien et pilote les campagnes qui vont chercher ses acheteurs, en France et à l’étranger.',
      photo: null,
    },
  ],
}

export const zones = [
  'Cassis et les Calanques',
  'Pays d’Aix et Côte Bleue',
  'Golfe de Saint-Tropez',
  'Montpellier et l’Hérault',
  'Pyrénées',
  'Alpes',
]

/* -------------------------------------------------------------------- */
/*  ACCUEIL ( / )                                                       */
/* -------------------------------------------------------------------- */
export const home = {
  seo: {
    title: 'PRODIGIO · Immobilier d’exception',
    description:
      'PRODIGIO construit la marque de chaque bien d’exception, va chercher son acheteur en France et en Europe, et l’accompagne jusqu’à la signature. Nous ne sommes rémunérés qu’à la vente.',
  },
  hero: {
    eyebrow: 'Immobilier d’exception · France',
    lines: ['Un bien d’exception', 'mérite une marque.', 'Pas une annonce.'],
    sub: 'Nous construisons la marque de chaque bien, nous allons chercher son acheteur partout où il se trouve, et nous l’accompagnons jusqu’à la signature.',
    videos: [v('calanques'), v('chalet-drone'), v('jj-piscine')],
  },
  ticker: [
    'Font-Romeu · vendu en moins d’un mois',
    'Cassis · maison Jean-Jaurès',
    'Cassis · villa Verdun',
    'Les 2 Alpes · Les Airelles',
    'Rémunérés uniquement à la vente',
  ],
  doors: {
    eyebrow: 'Votre projet',
    title: 'Vous vendez, ou vous achetez ?',
    sell: {
      label: 'Je vends un bien',
      title: 'Nous ne changeons pas le prix.\nNous changeons d’acheteurs.',
      text: 'Une marque, un film, des publicités ciblées en France et à l’étranger. Nous avançons le budget, et nous ne sommes payés qu’à la vente.',
      cta: 'Découvrir la méthode',
      image: m('mitja-exterior-dusk'),
    },
    buy: {
      label: 'Je cherche un bien',
      title: 'Des maisons rares,\nmontrées en confidence.',
      text: 'Cassis, les Pyrénées, les Alpes : des biens que nous avons choisis, filmés et documentés, présentés d’abord aux acheteurs qui ont un vrai projet.',
      cta: 'Voir les biens',
      image: m('verdun-piece-de-vie'),
    },
  },
  manifesto: {
    a: 'Votre agence couvre 30 km.',
    b: 'Votre acheteur est à 3 000.',
    sub: 'Un acheteur sur deux, au-delà de 4 M€, est étranger*. Il n’est ni dans le fichier d’une agence locale, ni en train de chercher sur un portail. Alors nous allons le chercher là où il est.',
    source: '* Sotheby’s International Realty France-Monaco.',
  },
  properties: {
    eyebrow: 'Nos biens',
    title: 'Chaque bien a sa marque.',
    cta: 'Tous les biens',
  },
  final: {
    title: 'Un bien, une marque, un acheteur.',
    text: 'Que vous vendiez ou que vous cherchiez, la première étape prend moins d’une minute.',
  },
}

/* -------------------------------------------------------------------- */
/*  VENDRE ( /vendre )                                                  */
/* -------------------------------------------------------------------- */
export const sell = {
  seo: {
    title: 'Vendre un bien d’exception · PRODIGIO',
    description:
      'Nous ne changeons pas le prix, nous changeons d’acheteurs. PRODIGIO avance le budget publicitaire, va chercher l’acheteur de votre bien en France et à l’étranger, et n’est rémunéré qu’à la vente.',
  },
  hero: {
    eyebrow: 'Vous vendez un bien d’exception',
    lines: ['Vingt ans pour la construire.', 'Dix minutes pour l’annonce.'],
    sub: 'Aujourd’hui en France, une villa à deux millions est vendue exactement comme un studio à deux cent mille : même annonce, mêmes portails, même bouton « Contacter l’agence ». Et plus votre bien est rare, moins cette méthode fonctionne.',
    cta: 'Vérifier l’éligibilité de mon bien',
    secondary: 'Voir la méthode',
    video: v('chalet-neige'),
  },
  problem: {
    eyebrow: 'Le problème',
    title: 'Les portails sont faits\npour les bonnes affaires.',
    text: 'Une agence classique, même une grande enseigne de luxe, ne cherche pas votre acheteur. Elle l’attend. Elle publie une annonce, la fait circuler dans son fichier, et elle attend. Au bout de six mois, avec peu de visites et aucune offre sérieuse, la seule proposition qu’on vous fait, c’est de baisser le prix.',
    stats: [
      { big: '1 sur 2', text: 'Un Français sur deux consulte des annonces immobilières sans aucune intention d’acheter.', source: 'Notariat Services pour Immonot, juin 2025' },
      { big: '−30 à −60 %', text: 'L’écart au prix du marché des annonces les plus cliquées sur SeLoger en 2025.', source: 'Classement SeLoger 2025' },
      { big: '0 €', text: 'Ce que perd une agence classique si votre bien ne se vend pas. Le risque, c’est vous qui le portez.', source: null },
    ],
    social: 'Et puis il y a la question, à chaque dîner de famille : « Alors, c’est vendu ? »',
  },
  method: {
    eyebrow: 'La méthode',
    title: 'Trois temps.\nUn seul objectif : votre acheteur.',
    steps: [
      {
        n: 'I',
        name: 'La marque',
        title: 'Avant de chercher un acheteur, on lui donne envie.',
        text: 'Nous commençons par une question qu’aucune agence ne se pose vraiment : qui va acheter ce bien, et pourquoi ? Puis nous tournons le film de votre maison, nous créons un site qui ne parle que d’elle, et une brochure confidentielle de 25 pages, remise uniquement aux acheteurs qualifiés.',
        points: ['Film tourné chez vous', 'Site dédié au bien', 'Brochure confidentielle de 25 pages'],
        image: m('mitja-golden-hour-dining'),
      },
      {
        n: 'II',
        name: 'L’activation',
        title: 'Une publicité par raison d’acheter.',
        text: 'Une famille qui cherche une résidence secondaire n’achète pas pour les mêmes raisons qu’un investisseur, ni qu’un acheteur étranger qui découvre la région. Nous écrivons une publicité pour chacun, et nous la diffusons là où il vit : Paris, Genève, Bruxelles, Londres. Sur des plateformes qui touchent plus de 3,5 milliards de personnes chaque jour.',
        points: ['Ciblage profil par profil', 'France et étranger', 'Budget publicitaire avancé par PRODIGIO'],
        image: m('jj-cassis-cap-canaille'),
      },
      {
        n: 'III',
        name: 'La vente',
        title: 'Des acheteurs. Pas des curieux.',
        text: 'Chaque personne qui demande le dossier de votre bien répond d’abord à un questionnaire : a-t-elle un projet, dans quel délai, avec quel budget. Ces réponses apprennent aux plateformes à quoi ressemble un vrai acheteur pour votre bien. Chaque visite que nous organisons est celle d’un acheteur qualifié, et nous l’accompagnons jusqu’à l’acte.',
        points: ['Qualification projet, délai, budget', 'Relance immédiate à chaque demande', 'Accompagnement jusqu’à la signature'],
        image: m('verdun-terrasse'),
      },
    ],
  },
  benefits: {
    eyebrow: 'Ce que ça change pour vous',
    items: [
      { title: 'Vendre à sa valeur', text: 'Votre bien n’est plus en concurrence avec des rabais. Il est montré, seul, à ceux qui peuvent se l’offrir.' },
      { title: 'Reprendre la main', text: 'Fini l’attente et le compteur de vues qui stagne. Vous savez qui demande votre bien, d’où, et avec quel budget.' },
      { title: 'Vendre la tête haute', text: 'La fierté de voir votre maison montrée comme vous la voyez, et transmise à un acheteur à la hauteur du lieu.' },
    ],
  },
  model: {
    eyebrow: 'Le modèle',
    title: 'Ce risque, c’est nous qui le portons.\nPas vous.',
    items: [
      { k: '01', title: 'Nous investissons', text: 'Pour chaque bien que nous acceptons, nous engageons notre propre argent en publicité.' },
      { k: '02', title: 'Payés à la vente', text: 'Notre rémunération est une commission prélevée le jour de la vente. Pas de vente, pas de facture.' },
      { k: '03', title: 'Nous sélectionnons', text: 'Parce que nous engageons nos moyens, nous n’acceptons pas tous les mandats. Seulement ceux sur lesquels cet investissement a du sens.' },
    ],
  },
  comparison: {
    eyebrow: 'La différence',
    title: 'Attendre l’acheteur,\nou aller le chercher.',
    columns: ['Agence classique', 'PRODIGIO'],
    rows: [
      ['Mise en marché', 'Une annonce sur les portails', 'Une marque : film, site dédié, brochure'],
      ['Approche', 'Passive : on attend l’acheteur', 'Active : on va le chercher'],
      ['Portée', 'Le fichier et la vitrine locale', 'France, Europe et au-delà'],
      ['Visites', 'Ouvertes à tous', 'Réservées aux acheteurs qualifiés'],
      ['Budget publicitaire', 'Aucun, ou à votre charge', 'Avancé par PRODIGIO'],
      ['Si le bien ne se vend pas', 'L’agence n’a rien perdu', 'Nous avons perdu notre investissement'],
      ['Rémunération', 'Commission à la vente', 'Commission à la vente'],
    ],
  },
  agencies: {
    title: 'Vous êtes une agence ou un marchand de biens ?',
    text: 'Nous intervenons aussi en co-mandat sur vos biens premium. Vous gardez votre nom, votre client et votre relation. Nous apportons ce qui fait venir les acheteurs, et nous partageons la commission selon ce que nous avons réellement apporté.',
  },
  faq: [
    ['Qui paie la publicité ?', 'Nous. Le film, le site, la brochure et les campagnes sont financés par PRODIGIO. Vous ne payez qu’une commission, le jour de la vente.'],
    ['Et si mon bien ne se vend pas ?', 'Vous ne nous devez rien. C’est pour cela que nous étudions chaque bien avant de l’accepter : nous ne nous engageons que si nous pensons pouvoir le vendre.'],
    ['Mon bien est déjà en agence. Est-ce un problème ?', 'Non. Beaucoup de biens nous arrivent après plusieurs mois en vente sans résultat. Nous regardons ensemble la situation de votre mandat actuel.'],
    ['Quels biens acceptez-vous ?', 'Des propriétés d’exception, en général à partir d’un million d’euros : villas, maisons de caractère, chalets, domaines, programmes haut de gamme.'],
    ['Où intervenez-vous ?', 'Principalement en Provence, sur la Côte d’Azur, en Occitanie et dans les stations des Pyrénées et des Alpes. Nos acheteurs, eux, viennent de partout.'],
    ['Mon bien sera-t-il exposé publiquement ?', 'Votre bien n’est jamais bradé sur les portails. Les informations détaillées et la brochure ne sont remises qu’aux acheteurs qui ont confirmé leur projet et leur budget.'],
  ],
  form: {
    id: 'eligibilite',
    eyebrow: 'Éligibilité',
    title: 'Votre bien peut-il\nintégrer PRODIGIO ?',
    text: 'Répondez à quelques questions : cela prend moins d’une minute. Nous étudions votre bien, son emplacement et son potentiel, et nous vous disons très concrètement si nous sommes prêts à investir pour le vendre.',
    submit: 'Vérifier l’éligibilité',
    success: {
      title: 'Merci. Nous étudions votre bien.',
      text: 'Victor vous rappelle sous 24 heures ouvrées. Si vous préférez, écrivez-lui directement sur WhatsApp.',
    },
    steps: [
      { name: 'type', q: 'Quel type de bien vendez-vous ?', options: ['Villa ou maison', 'Chalet', 'Appartement d’exception', 'Domaine ou propriété', 'Programme ou plusieurs lots'] },
      { name: 'valeur', q: 'Quelle est sa valeur estimée ?', options: ['Moins de 800 000 €', '800 000 € à 1,5 M€', '1,5 M€ à 3 M€', 'Plus de 3 M€'] },
      { name: 'situation', q: 'Où en êtes-vous ?', options: ['Je réfléchis à vendre', 'En vente depuis moins de 6 mois', 'En vente depuis plus de 6 mois', 'Je suis agent ou marchand de biens'] },
      { name: 'ville', q: 'Où se trouve le bien ?', input: { type: 'text', placeholder: 'Ville ou commune', autoComplete: 'address-level2' } },
    ],
  },
}

/* -------------------------------------------------------------------- */
/*  ACHETER ( /acheter )                                                */
/* -------------------------------------------------------------------- */
export const buy = {
  seo: {
    title: 'Biens d’exception à vendre · Cassis, Alpes, Pyrénées · PRODIGIO',
    description:
      'Maisons et appartements d’exception à Cassis et aux 2 Alpes, filmés et documentés par PRODIGIO. Recevez la brochure confidentielle et organisez une visite privée.',
  },
  hero: {
    eyebrow: 'Vous cherchez un bien d’exception',
    lines: ['Certains biens', 'ne passent jamais', 'par les portails.'],
    sub: 'Une maison à Cassis qu’on garde pour soi. Un appartement au pied des pistes. Nous sélectionnons des biens rares, nous les filmons, et nous les présentons d’abord à ceux qui ont un vrai projet.',
    cta: 'Voir les biens',
    secondary: 'Recevoir une brochure',
    video: v('calanques'),
  },
  list: {
    eyebrow: 'Les biens',
    title: 'En ce moment chez PRODIGIO.',
    brochure: 'Recevoir la brochure',
    site: 'Visiter le site du bien',
  },
  steps: {
    eyebrow: 'Comment ça se passe',
    title: 'Une diffusion confidentielle,\nen trois étapes.',
    items: [
      { n: '01', title: 'Vous nous dites ce que vous cherchez', text: 'Le bien qui vous intéresse, votre projet, votre délai et votre budget. Moins d’une minute.' },
      { n: '02', title: 'Vous recevez la brochure confidentielle', text: 'Plans, prestations, prix, environnement : tout ce qu’une annonce ne dit jamais, réservé aux acheteurs qui ont un projet.' },
      { n: '03', title: 'Vous visitez en privé', text: 'Sur place ou en vidéo, avec Victor ou nos partenaires sur le terrain. Puis nous vous accompagnons jusqu’à l’acte.' },
    ],
  },
  regions: {
    eyebrow: 'Les régions',
    title: 'Vivre là où les autres\npassent en vacances.',
    items: [
      {
        name: 'Cassis et les Calanques',
        text: 'Le premier parc national périurbain d’Europe, les plus hautes falaises maritimes de France au Cap Canaille, et la première AOC de Provence. L’élégance discrète du Sud, loin de l’agitation de la Côte d’Azur.',
        image: m('verdun-vue-port'),
      },
      {
        name: 'Les 2 Alpes',
        text: 'Un glacier à 3 600 mètres, du ski jusqu’en juillet, et une station qui vit aussi l’été. La montagne deux saisons par an.',
        image: m('airelles-station'),
      },
      {
        name: 'Les Pyrénées catalanes',
        text: 'Font-Romeu, ses chalets et ses panoramas, du Canigou à la Sierra del Cadí, à deux pas de l’Espagne.',
        image: m('mitja-mountain-panorama'),
      },
    ],
  },
  search: {
    title: 'Vous ne trouvez pas votre bien ?',
    text: 'Décrivez-nous votre projet. Nous vous présentons les nouveaux biens avant leur diffusion.',
  },
  form: {
    id: 'brochure',
    eyebrow: 'Brochure confidentielle',
    title: 'Recevez la brochure\net organisez une visite.',
    text: 'Quelques questions pour vous envoyer le bon dossier et préparer une visite qui a du sens.',
    submit: 'Recevoir la brochure',
    success: {
      title: 'Merci. Votre demande est bien arrivée.',
      text: 'Nous vous envoyons la brochure et vous rappelons pour organiser la visite. Pour aller plus vite, écrivez à Victor sur WhatsApp.',
    },
    steps: [
      { name: 'bien', q: 'Quel bien vous intéresse ?', options: ['Maison Jean-Jaurès · Cassis', 'Villa Verdun · Cassis', 'Les Airelles · Les 2 Alpes', 'Une autre recherche'] },
      { name: 'projet', q: 'Quel est votre projet ?', options: ['Résidence principale', 'Résidence secondaire', 'Investissement'] },
      { name: 'delai', q: 'Dans quel délai ?', options: ['Moins de 3 mois', '3 à 6 mois', '6 à 12 mois', 'Je me renseigne'] },
      { name: 'budget', q: 'Quel est votre budget ?', options: ['Moins de 800 000 €', '800 000 € à 1,5 M€', '1,5 M€ à 3 M€', 'Plus de 3 M€'] },
    ],
  },
}

export const contactStep = {
  q: 'Où pouvons-nous vous répondre ?',
  fields: [
    { name: 'prenom', label: 'Prénom', type: 'text', autoComplete: 'given-name', required: true },
    { name: 'nom', label: 'Nom', type: 'text', autoComplete: 'family-name', required: true },
    { name: 'telephone', label: 'Téléphone', type: 'tel', autoComplete: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  ],
  consent: 'J’accepte que PRODIGIO me recontacte au sujet de ma demande. Mes données ne sont jamais revendues.',
}
