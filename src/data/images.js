// ====================================================================
//  IMAGES — placeholders haut de gamme (Unsplash), faciles à remplacer.
//
//  Pour mettre vos vrais visuels : remplacez simplement l'URL.
//  Si une URL est vide ou échoue à charger, le composant <Photo />
//  retombe élégamment sur un dégradé sombre + étiquette « [PHOTO 4K] ».
//
//  Le traitement noir & blanc (grayscale) est appliqué automatiquement
//  par le composant <Photo /> — inutile de fournir des images N&B.
// ====================================================================

const U = (id, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // Hero — une ambiance par profil pour varier l'émotion.
  hero: {
    marchand: U('1600585154340-be6161a56a0c'), // intérieur architectural épuré
    agence: U('1512917774080-9991f1c4c750'), // villa contemporaine
    promoteur: U('1545324418-cc1a3fa10c00'), // ensemble résidentiel
    proprietaire: U('1613490493576-7fde63acd811'), // villa d'exception, piscine
  },

  // Sections immersives communes.
  problem: U('1518005020951-eccb494ad742'), // architecture, lignes fortes
  manifesto: U('1486406146926-c627a92ad1ab'), // architecture sombre, cinématographique
  proof: U('1551524559-8af4e6624178'), // chalet / montagne enneigée
  why: U('1600607687939-ce8a6c25118c'), // intérieur cinématographique
  finalCta: U('1505691938895-1758d7feb511'), // intérieur feutré, lumière douce
}
