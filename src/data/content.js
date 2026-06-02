// ====================================================================
//  CONTENU PRODIGIO — tout le copy du site vit ici.
//  Pour ajuster un texte : modifiez simplement la valeur correspondante.
//  - `common`   : contenu identique pour tous les profils.
//  - `profiles` : contenu adapté à chaque cible (4 profils).
// ====================================================================

/* -------------------------------------------------------------------- */
/*  CONTENU COMMUN (preuve, solution, différence, CTA final)            */
/* -------------------------------------------------------------------- */
export const common = {
  brand: {
    name: 'PRODIGIO',
    baseline: "Immobilier d'exception",
  },

  // Lien des boutons « Prendre contact » (WhatsApp).
  contact: { url: 'https://wa.me/33631909998' },

  // Section « Votre contact » — présentation de Victor Razeyre.
  founder: {
    eyebrow: 'Votre contact',
    name: 'Victor Razeyre',
    role: 'Entrepreneur · Fondateur de Prodigio',
    bio: 'Dix ans d’entrepreneuriat, au service d’entreprises de tous secteurs. De cette expérience du marketing de performance, Victor a tiré une conviction : les meilleures stratégies d’acquisition n’avaient jamais été vraiment appliquées à l’immobilier d’exception. Il en a fait un système — celui de Prodigio — pensé pour aller chercher l’acheteur et raccourcir les délais de vente. C’est lui qui suit personnellement chaque bien que nous mettons en marché.',
    cta: 'Échanger avec Victor',
  },

  // Section 0 — écran d'accueil
  gate: {
    question: 'Vous êtes…',
    subtitle: 'Choisissez votre profil. Tout le reste s’écrit pour vous.',
    hint: 'Sélectionnez votre profil pour commencer',
  },

  // Bande manifeste (après le problème) — déclaration de positionnement.
  manifesto: {
    line1: 'Prodigio ne met pas votre bien en vente.',
    line2: 'Prodigio le vend.',
    sub: 'Une méthode active, née du marketing, appliquée à l’immobilier d’exception.',
  },

  // Section 3 — LA MÉTHODE PRODIGIO™ (remplace « nos services »)
  method: {
    eyebrow: 'La Méthode Prodigio™',
    lead: 'On ne vend pas une prestation. On applique un système.',
    title: 'Vendre l’exception, activement.',
    intro:
      'La plupart des acteurs de l’immobilier sont passifs : ils publient une annonce, et ils attendent. Nous venons du marketing digital, et on fait l’inverse : on conçoit et on déploie pour vos biens des systèmes d’acquisition haute-performance — les stratégies les plus éprouvées du digital, taillées sur mesure pour l’exception — et on va chercher l’acheteur.',
    steps: [
      {
        index: '01',
        name: 'On transforme votre bien en marque.',
        text: 'Film, photographie d’art, drone, narration du lieu. Votre bien ne ressemble plus à une annonce — il devient désirable.',
      },
      {
        index: '02',
        name: 'On va chercher l’acheteur. Activement.',
        text: 'On ne propose pas votre bien à tout le monde. On le présente, en privé, uniquement à ceux qui peuvent et veulent l’acheter — ciblés, qualifiés, solvables. Le budget de cette mise en marché, c’est nous qui l’avançons.',
      },
      {
        index: '03',
        name: 'On le conduit jusqu’à la signature.',
        text: 'Relance immédiate, qualification, visites privées avec budget validé, accompagnement jusqu’à l’acte. Vous ne recevez pas des « contacts ». Vous recevez des acheteurs.',
      },
    ],
    result: 'Pendant que les autres attendent une visite, vous signez.',
  },

  // Section 4 — LA PREUVE (cas Chalet Mitja)
  proof: {
    eyebrow: 'La preuve',
    title: 'Chalet Mitja, Font-Romeu',
    subtitle: 'Bien d’exception — environ 1,6 M€. Mis en marché par Prodigio.',
    period: 'En une semaine',
    stats: [
      { value: '100', label: 'prospects générés' },
      { value: '10', label: 'visites qualifiées · budget validé à +1 M€' },
      { value: '1', label: 'vente conclue' },
    ],
    footnote:
      'En une semaine, ce que la plupart des annonces de prestige n’obtiennent pas en six mois.',
  },

  // Section 6 — POURQUOI NOUS (les 4 « Parce que… »)
  why: {
    eyebrow: 'Pourquoi nous',
    title: 'Attendre l’acheteur, ou aller le chercher ?',
    reasons: [
      {
        title: 'Parce qu’on est la parfaite alchimie de l’immobilier et du marketing.',
        text: 'Les agences classiques savent gérer un mandat. Nous, on sait créer la demande. Notre passé mêle immobilier et marketing de performance : on applique au luxe immobilier les meilleures stratégies d’acquisition du marché — celles qui font vendre vite dans les secteurs les plus concurrentiels. C’est ça, la différence entre attendre un acheteur et aller le chercher.',
      },
      {
        title: 'Parce que vous n’avez rien à perdre, et tout à gagner.',
        text: 'Rien à débourser, rien à risquer : on avance le budget de mise en marché, et on ne se paie qu’à la vente. Si on ne vend pas, vous ne nous devez rien. Le risque, c’est nous qui le portons — pas vous.',
      },
      {
        title: 'Parce qu’on ne propose pas votre bien à tout le monde.',
        text: 'Tout le monde peut poster votre bien sur un portail et le diluer parmi des centaines d’annonces. Nous, on le présente uniquement à ceux qui vont l’acheter — discrètement, à une audience triée. La puissance d’une vraie machine d’acquisition, avec la discrétion d’une vente privée.',
      },
      {
        title: 'Parce qu’on est actifs.',
        text: 'On ne publie pas. On chasse. C’est toute la différence.',
      },
    ],
  },

  // Section 7 — CTA FINAL
  finalCta: {
    eyebrow: 'Échangeons',
    title: 'Votre bien mérite mieux qu’une annonce.',
    subtitle:
      'On sélectionne les biens sur lesquels on est certains de performer. Parlons du vôtre.',
    button: 'Prendre contact',
    signature: 'PRODIGIO — On vend l’exception.',
  },
}

/* -------------------------------------------------------------------- */
/*  TABLEAUX COMPARATIFS — un par audience.                              */
/*  • Agence     : on se compare à une AGENCE MARKETING classique.        */
/*  • Propriétaire : on se compare à une AGENCE IMMOBILIÈRE classique.    */
/*  classic / prodigio : une chaîne, ou un booléen (✓ / ✗).              */
/* -------------------------------------------------------------------- */

// Pour les AGENCES — face à une agence marketing généraliste.
const comparisonMarketing = {
  eyebrow: 'La comparaison',
  title: 'Une agence marketing. Mais pas n’importe laquelle.',
  lead: 'La plupart génèrent des leads, tous secteurs confondus, et vous facturent la publicité. Nous sommes spécialisés dans l’immobilier d’exception — et on va jusqu’à la vente.',
  columns: { classic: 'Agence marketing classique', prodigio: 'Prodigio' },
  rows: [
    {
      label: 'Spécialité',
      classic: 'Marketing généraliste, tous secteurs',
      prodigio: '100 % immobilier d’exception',
    },
    {
      label: 'Ce qu’elle vous livre',
      classic: 'Des leads, au volume',
      prodigio: 'Des acheteurs, jusqu’à la vente',
    },
    {
      label: 'Qualité des contacts',
      classic: 'Non qualifiés, sans garantie',
      prodigio: 'Visites avec budget validé',
    },
    {
      label: 'Budget publicitaire',
      classic: 'À votre charge',
      prodigio: 'Avancé par Prodigio',
    },
    {
      label: 'Le bien',
      classic: 'Une campagne standard',
      prodigio: 'Transformé en marque (film, photo, narration)',
    },
    {
      label: 'Jusqu’où on va',
      classic: 'On s’arrête au lead',
      prodigio: 'Jusqu’à la signature',
    },
    { label: 'Accompagnement à la vente', classic: false, prodigio: true },
    {
      label: 'Rémunération',
      classic: 'Au forfait, résultat ou pas',
      prodigio: 'Uniquement à la vente',
    },
  ],
}

// Pour les PROPRIÉTAIRES — face à une agence immobilière classique.
const comparisonImmobilier = {
  eyebrow: 'La comparaison',
  title: 'Une agence immobilière classique. Et nous.',
  lead: 'Une agence classique publie votre bien sur les portails, et attend. Nous, on le met en marché comme une marque et on va chercher l’acheteur.',
  columns: { classic: 'Agence immobilière classique', prodigio: 'Prodigio' },
  rows: [
    {
      label: 'Mise en marché du bien',
      classic: 'Annonce sur portails',
      prodigio: 'Bien transformé en marque (film, photo, narration)',
    },
    {
      label: 'Approche',
      classic: 'Passive — on attend l’acheteur',
      prodigio: 'Active — on va chercher l’acheteur',
    },
    {
      label: 'Diffusion',
      classic: 'À tout le monde, en public',
      prodigio: 'Ciblée, en privé, aux acheteurs solvables',
    },
    { label: 'Acquisition payante ciblée', classic: false, prodigio: true },
    {
      label: 'Budget de mise en marché',
      classic: 'À votre charge',
      prodigio: 'Avancé par Prodigio',
    },
    { label: 'Relance des acheteurs', classic: 'Lente, manuelle', prodigio: 'Immédiate' },
    {
      label: 'Rémunération',
      classic: 'Commission à la vente',
      prodigio: 'Commission à la vente',
    },
    { label: 'Délai', classic: 'Des mois', prodigio: 'Des semaines' },
    {
      label: 'Origine du savoir-faire',
      classic: 'Immobilier',
      prodigio: 'Marketing de performance + immobilier',
    },
  ],
}

// Quel tableau pour quel profil. (Défaut = comparaison immobilière.)
export const comparisons = {
  agence: comparisonMarketing,
  proprietaire: comparisonImmobilier,
  marchand: comparisonImmobilier,
  promoteur: comparisonImmobilier,
}

/* -------------------------------------------------------------------- */
/*  PROFILS — l'ordre définit l'affichage des cartes de l'écran d'accueil */
/*  (Marchand et Promoteur restent définis plus bas mais ne sont pas      */
/*   affichés ; pour les réactiver, ajoutez leur clé à profileOrder.)     */
/* -------------------------------------------------------------------- */
export const profileOrder = ['agence', 'proprietaire']

export const profiles = {
  marchand: {
    key: 'marchand',
    label: 'Marchand de biens',
    short: 'Marchand',
    gateTagline: 'Vendez plus vite. Payés au résultat.',

    hero: {
      eyebrow: 'Pour le marchand de biens',
      title: 'Tant que votre bien\nne se vend pas, il vous coûte.',
      subtitle:
        'Nous trouvons l’acheteur de votre bien d’exception, plus vite. Et nous ne sommes payés que le jour de la vente.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Un bien rénové qui ne part pas, c’est une marge qui fond.',
      body: 'Vous le savez mieux que personne : un bien qui traîne, ce sont des intérêts qui courent, du capital bloqué, une marge qui s’érode mois après mois. Et sur les portails, votre bien à 1,5 M€ se retrouve noyé au milieu de centaines d’annonces — jugé sur une photo et un prix. Il y récolte en moyenne 3,9 appels. Pas 3,9 acheteurs. 3,9 appels.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'On ne se paie que quand vous vendez.',
      body: 'Vous nous confiez le bien et ses visuels. On s’occupe de tout le reste : on le met en scène, on va chercher les acheteurs, on avance même le budget de publicité. Notre commission — environ 5 % — n’est prélevée que le jour de la vente. Pas de vente, pas de facture.',
      points: [
        { label: 'Vous apportez', value: 'Le bien et ses visuels.' },
        {
          label: 'On apporte',
          value: 'La mise en scène, la recherche d’acheteurs, et le budget pub avancé.',
        },
        { label: 'Rémunération', value: 'Environ 5 %, le jour de la vente. Pas avant.' },
      ],
    },

    differenceAccent:
      'On ne vous vend pas des contacts à la pièce. On vend votre bien — et on ne touche notre part qu’une fois que c’est fait.',
  },

  agence: {
    key: 'agence',
    label: 'Agence immobilière',
    short: 'Agence',
    gateTagline: 'La machine d’acquisition que vous n’avez pas.',

    hero: {
      eyebrow: 'Pour les agences de luxe',
      title: 'Vos plus beaux biens\nattendent.',
      subtitle:
        'Vous avez le mandat et le réseau. Nous allons chercher les acheteurs que votre vitrine ne touche pas — sur vos biens premium, sans le moindre risque pour vous.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Publier une annonce n’a jamais fait venir le bon acheteur.',
      body: 'Vous êtes excellent dans votre métier : les mandats, la relation, la négociation. Mais aller chercher activement des acheteurs en ligne, avec de la vraie publicité ciblée, ce n’est pas votre métier — et vous le savez. Résultat : vos plus belles propriétés patientent sur un portail, réduites à une vignette et un prix, pendant que le bon acheteur, lui, ne les voit jamais.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'On travaille pour vous, en coulisses.',
      body: 'On intervient en co-mandat sur les biens premium que vous choisissez. Vous gardez votre nom, votre client, votre relation. Nous, on apporte ce qui fait venir les acheteurs — et on partage la commission, à hauteur de ce qu’on a réellement apporté.',
      points: [
        {
          label: 'Co-mandat',
          value: 'Sur les biens que vous choisissez. Vous gardez votre nom et vos clients.',
        },
        {
          label: 'Rémunération',
          value: 'Partage de commission, selon ce qu’on a réellement apporté.',
        },
        {
          label: 'Sécurité',
          value: 'Une clause garantit que chaque vente née de notre travail vous est reconnue.',
        },
      ],
    },

    differenceAccent:
      'Gardez votre marque et vos clients. Nous, on vous amène les acheteurs — bien par bien, sans vous coûter un centime tant qu’il n’y a pas de vente.',
  },

  promoteur: {
    key: 'promoteur',
    label: 'Promoteur',
    short: 'Promoteur',
    gateTagline: 'Vendez vos lots avant la livraison.',

    hero: {
      eyebrow: 'Pour les promoteurs haut de gamme',
      title: 'Vendez vos lots\navant même la livraison.',
      subtitle:
        'On lance votre programme comme une marque et on remplit votre carnet de réservations dès le premier jour — avec de vrais acheteurs, pas des curieux.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Un programme qui se vend au ralenti, c’est votre marge qui s’évapore.',
      body: 'Un programme d’exception lancé comme un produit banal se commercialise lentement. Les lots partent un à un, la pré-commercialisation s’éternise, votre trésorerie attend — et chaque mois qui passe grignote votre marge. Le problème n’est presque jamais le programme. C’est la façon dont il est mis en marché.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'Une vraie marque pour votre programme. Des acheteurs dès le lancement.',
      body: 'On construit l’identité de votre programme comme une marque à part entière, puis on va chercher — par une publicité ciblée — les acheteurs et investisseurs qui ont le budget. On vous accompagne jusqu’à la vente des lots. La rémunération s’ajuste à l’ampleur du programme.',
      points: [
        {
          label: 'La marque',
          value: 'L’identité de votre programme, pensée comme une marque.',
        },
        {
          label: 'Les acheteurs',
          value: 'Publicité ciblée sur les acheteurs et investisseurs qui ont le budget.',
        },
        { label: 'Rémunération', value: 'Ajustée à l’ampleur du programme.' },
      ],
    },

    differenceAccent:
      'De l’image du programme jusqu’au dernier lot vendu — on raisonne en résultats, pas en prestation.',
  },

  proprietaire: {
    key: 'proprietaire',
    label: 'Propriétaire',
    short: 'Propriétaire',
    gateTagline: 'Une vente discrète, à la hauteur du lieu.',

    hero: {
      eyebrow: 'Pour les propriétaires de biens d’exception',
      title: 'Votre bien n’est pas une\nannonce parmi d’autres.',
      subtitle:
        'Nous le présentons avec discrétion, à des acheteurs vraiment sérieux — pas aux curieux. Et nous restons à vos côtés jusqu’à la signature.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Sur un portail, votre bien rare devient une annonce ordinaire.',
      body: 'Mettre un bien d’exception sur un portail, c’est le noyer parmi des centaines d’autres — et l’exposer à tout le monde : les voisins curieux, les visiteurs du dimanche, ceux qui n’achèteront jamais. Votre lieu mérite une mise en scène à sa hauteur, et des visites réservées aux seuls acheteurs qui en ont vraiment les moyens.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'Une vente sur-mesure, discrète, jusqu’au bout.',
      body: 'On traite votre bien au cas par cas, en toute confidentialité. On le met en scène comme une pièce unique, on le présente à une sélection d’acheteurs ciblés et solvables, et on reste à vos côtés jusqu’à la signature. Du premier jour au dernier, un seul interlocuteur.',
      points: [
        { label: 'Approche', value: 'Au cas par cas, en toute confidentialité.' },
        {
          label: 'Les acheteurs',
          value: 'Une sélection ciblée et solvable — pas les curieux.',
        },
        {
          label: 'Accompagnement',
          value: 'Un seul interlocuteur, du premier jour à la signature.',
        },
      ],
    },

    differenceAccent:
      'La discrétion d’une vente privée. La force d’une vraie machine pour trouver l’acheteur.',
  },
}
