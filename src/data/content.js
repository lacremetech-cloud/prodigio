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

  // Section 0 — écran d'accueil
  gate: {
    eyebrow: "Immobilier d'exception",
    question: "À qui s'adresse l'exception ?",
    subtitle:
      'Choisissez votre profil. Le récit de Prodigio se réécrit pour vous.',
  },

  // Section 3 — LA SOLUTION (3 temps)
  solution: {
    eyebrow: 'La méthode Prodigio',
    title: 'Trois temps. Une seule promesse : la vente.',
    steps: [
      {
        index: '01',
        name: 'Brand Development',
        text: "Chaque bien devient une marque : page dédiée, film, photographie d'art, prises de vue par drone, narration du lieu.",
      },
      {
        index: '02',
        name: 'Market Activation',
        text: 'Campagne d’acquisition payante ciblée — budget avancé par Prodigio. Tunnel avec brochure confidentielle, capture et qualification des acheteurs.',
      },
      {
        index: '03',
        name: 'Sales Performance',
        text: "Relance immédiate, qualification jusqu'à la visite, accompagnement jusqu'à la signature.",
      },
    ],
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
      'À comparer aux 3,9 contacts en moyenne que reçoit une annonce de prestige classique.',
  },

  // Section 6 — LA DIFFÉRENCE
  difference: {
    eyebrow: 'La différence',
    title: 'Ce que personne n’assemble.',
    body: "Les agences publient sur des portails. Les agents-créateurs font de l'organique — de la notoriété, des leads non maîtrisés. Les agences de lead-gen vendent du volume milieu de gamme.",
    pillars: [
      {
        name: 'Branding',
        text: 'Un bien = une marque. Film, photographie d’art, narration du lieu.',
      },
      {
        name: 'Acquisition',
        text: 'Campagne payante ciblée, tunnel confidentiel, capture et relance.',
      },
      {
        name: 'Performance',
        text: 'Accompagnement jusqu’à la vente — payé à la commission.',
      },
    ],
    closing:
      'Prodigio réunit les trois briques que personne n’assemble — et se rémunère au résultat.',
  },

  // Section 7 — CTA FINAL
  finalCta: {
    eyebrow: 'Échangeons',
    title: 'Parlons de votre bien.',
    subtitle:
      'Prodigio sélectionne les biens sur lesquels nous sommes certains de performer. Échangeons.',
    button: 'Prendre contact',
    signature: 'PRODIGIO — Immobilier d’exception',
  },
}

/* -------------------------------------------------------------------- */
/*  PROFILS — l'ordre définit l'affichage des cartes de l'écran d'accueil */
/* -------------------------------------------------------------------- */
export const profileOrder = ['marchand', 'agence', 'promoteur', 'proprietaire']

export const profiles = {
  marchand: {
    key: 'marchand',
    label: 'Marchand de biens',
    // libellé compact pour le sélecteur du header
    short: 'Marchand',
    // mot d'accroche affiché sur la carte de l'écran d'accueil
    gateTagline: 'Faites tourner votre stock.',

    hero: {
      eyebrow: 'Pour le marchand de biens',
      title: 'Votre stock dort.\nNous le faisons tourner.',
      subtitle:
        "Pour le marchand de biens d'exception : des acheteurs qualifiés, une vente plus rapide, une rémunération uniquement au résultat.",
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Chaque mois compte contre vous.',
      body: "Chaque mois où un bien rénové ne se revend pas vous coûte : capital immobilisé, frais financiers, marge qui fond. Les portails vous noient dans un catalogue — une annonce de prestige n'y reçoit en moyenne que 3,9 contacts.",
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'Payés à la vente. Pas avant.',
      body: 'Vous nous confiez le mandat et la matière — les médias du bien. Nous apportons la machine d’acquisition et nous avançons le budget publicitaire. Nous ne sommes payés qu’à la vente — commission directe (~5 %). Si nous ne vendons pas, vous ne nous devez rien.',
      points: [
        { label: 'Vous apportez', value: 'Le mandat et la matière du bien.' },
        {
          label: 'Nous apportons',
          value: 'La machine d’acquisition + le budget publicitaire avancé.',
        },
        { label: 'Rémunération', value: 'Commission directe (~5 %), à la vente uniquement.' },
      ],
    },

    differenceAccent:
      'On ne vous vend pas des leads à la pièce. On fait tourner votre stock, plus vite, et on se rémunère à la performance.',
  },

  agence: {
    key: 'agence',
    label: 'Agence immobilière',
    short: 'Agence',
    gateTagline: 'La machine que vous n’avez pas en interne.',

    hero: {
      eyebrow: 'Pour les agences de luxe',
      title: 'Vos mandats premium\nméritent mieux qu’une annonce.',
      subtitle:
        'Pour les agences de luxe : la machine d’acquisition que vous n’avez pas en interne, sur les biens qui stagnent — en co-mandat, sans risque pour vous.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Le réseau ne suffit plus.',
      body: 'Vous avez les mandats et le réseau. Mais la production digitale et l’acquisition payante ciblée ne sont pas votre métier. Résultat : vos plus beaux biens attendent, jugés sur une vignette et un prix.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'En co-mandat, sans risque.',
      body: 'Co-mandat / apport sur vos biens premium, avec partage de commission selon notre contribution. Vous nous confiez les biens que vous voulez ; nous sélectionnons ceux où nous sommes confiants de performer ; clause d’attribution systématique pour sécuriser chacun.',
      points: [
        { label: 'Format', value: 'Co-mandat / apport sur vos biens premium.' },
        { label: 'Rémunération', value: 'Partage de commission selon notre contribution.' },
        { label: 'Sécurité', value: 'Clause d’attribution systématique sur chaque bien.' },
      ],
    },

    differenceAccent:
      'Gardez votre marque et votre relation client. Nous apportons le pipeline d’acheteurs qualifiés et traçables, bien par bien.',
  },

  promoteur: {
    key: 'promoteur',
    label: 'Promoteur',
    short: 'Promoteur',
    gateTagline: 'Vendez avant la livraison.',

    hero: {
      eyebrow: 'Pour les promoteurs haut de gamme',
      title: 'Vendez vos lots\navant la livraison.',
      subtitle:
        'Pour les promoteurs haut de gamme : une mise en marché de programme pensée comme une marque, et un flux d’acheteurs qualifiés dès le lancement.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Un programme d’exception ne se vend pas comme un produit standard.',
      body: 'Un programme d’exception lancé comme un produit standard se vend lentement. La pré-commercialisation traîne, la trésorerie attend, la marge se dilue dans le temps.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'De la marque du programme à l’écoulement des lots.',
      body: 'Nous construisons la marque du programme et activons une campagne d’acquisition ciblée sur les acheteurs et investisseurs qualifiés. Accompagnement jusqu’à la vente des lots, modèle de rémunération à définir selon l’ampleur du programme.',
      points: [
        { label: 'Marque', value: 'Identité et récit du programme, pensés comme une marque.' },
        { label: 'Activation', value: 'Acquisition ciblée sur acheteurs et investisseurs qualifiés.' },
        { label: 'Rémunération', value: 'À définir selon l’ampleur du programme.' },
      ],
    },

    differenceAccent:
      'De la marque du programme jusqu’à l’écoulement des lots — une logique de performance, pas une simple prestation marketing.',
  },

  proprietaire: {
    key: 'proprietaire',
    label: 'Propriétaire',
    short: 'Propriétaire',
    gateTagline: 'Une vente à la hauteur du lieu.',

    hero: {
      eyebrow: 'Pour les propriétaires de biens d’exception',
      title: 'Votre bien n’est pas une annonce.\nC’est une exception.',
      subtitle:
        'Pour les propriétaires de biens d’exception : une mise en marché confidentielle et sur-mesure, qui attire les bons acheteurs — pas la curiosité.',
      cta: 'Découvrir',
    },

    problem: {
      eyebrow: 'Le problème',
      title: 'Un bien rare mérite mieux qu’un portail.',
      body: 'Confier un bien rare à un portail, c’est le diluer parmi des centaines d’annonces et l’exposer à tous. Vous méritez une mise en scène à la hauteur du lieu, et une sélection d’acheteurs réellement qualifiés.',
    },

    model: {
      eyebrow: 'Le modèle',
      title: 'La discrétion d’une vente privée.',
      body: 'Une approche au cas par cas, discrète et exclusive : votre bien devient une marque, diffusé auprès d’une audience ciblée et solvable, avec un accompagnement personnalisé jusqu’à la signature.',
      points: [
        { label: 'Approche', value: 'Au cas par cas, discrète et exclusive.' },
        { label: 'Diffusion', value: 'Audience ciblée et solvable — pas la curiosité.' },
        { label: 'Accompagnement', value: 'Personnalisé, jusqu’à la signature.' },
      ],
    },

    differenceAccent:
      'La discrétion d’une vente privée, la puissance d’une vraie machine d’acquisition.',
  },
}
