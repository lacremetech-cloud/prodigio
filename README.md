# PRODIGIO — Site-brochure

Brochure commerciale **one-page** pour **PRODIGIO**, agence d'immobilier de luxe nouvelle génération.

Le visiteur choisit d'abord son **profil** (Marchand de biens · Agence · Promoteur · Propriétaire) sur un écran d'accueil ; tout le contenu de la page s'adapte ensuite dynamiquement à cette cible. Il peut changer de profil à tout moment depuis le header.

> Ce n'est pas le site transactionnel : c'est un support de présentation premium à montrer à des prospects.

---

## Lancer le projet

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:5173.

Autres commandes :

```bash
npm run build     # build de production (dossier dist/)
npm run preview   # prévisualise le build de production
```

---

## Stack

- **React + Vite** — single page, aucun backend (tout est statique).
- **Tailwind CSS** — design system noir & blanc, glassmorphism.
- **Framer Motion** — transitions de profil, apparitions au scroll, parallax, micro-interactions.

---

## Direction artistique

Ultra-luxe, noir & blanc, **aucune couleur d'accent** — le contraste, l'espace
et la photographie font le prestige. Alternance de sections claires / sombres,
effets de **verre** (glassmorphism) sur les éléments flottants, grandes photos
plein écran, typographie éditoriale (Cormorant Garamond / Playfair Display +
Jost), rythme lent et cinématographique.

---

## Où modifier le contenu

### ✍️ Les textes (copy)

Tout le copy vit dans **un seul fichier**, facile à éditer :

```
src/data/content.js
```

- `common`   — contenu identique à tous les profils (écran d'accueil, la
  solution en 3 temps, la preuve « Chalet Mitja », la différence, le CTA final).
- `profiles` — contenu adapté à chaque cible (hero, problème, modèle, accent).

Pour ajuster un texte : modifiez simplement la valeur correspondante.
L'ordre d'affichage des cartes de profil est défini par `profileOrder`.

### 🖼️ Les photos

Les URLs des images sont centralisées dans :

```
src/data/images.js
```

Pour mettre vos vrais visuels de biens : **remplacez simplement l'URL**.
En attendant, des placeholders haut de gamme (Unsplash) sont utilisés.
Si une URL est vide ou ne charge pas, le composant `<Photo />` retombe
élégamment sur un dégradé sombre + une étiquette « [PHOTO 4K] ».

> Le traitement noir & blanc (grayscale + contraste) est appliqué
> automatiquement — inutile de fournir des images déjà en N&B.

---

## Structure du code

```
src/
├── App.jsx                 # Orchestration : écran d'accueil ↔ site, profil actif
├── index.css               # Base + utilitaires verre (glass, glass-dark…)
├── data/
│   ├── content.js          # 📝 TOUT le copy (common + profiles)
│   └── images.js           # 🖼️ URLs des photos (à remplacer)
├── components/
│   ├── ProfileGate.jsx     # Écran d'accueil — sélecteur de profil
│   ├── Header.jsx          # Header discret + sélecteur de profil compact
│   ├── Photo.jsx           # Photo plein écran (placeholder 4K, parallax, voile)
│   ├── Reveal.jsx          # Apparition douce au scroll
│   └── Morph.jsx           # Transition « fondu/glissé » au changement de profil
└── sections/
    ├── Hero.jsx            # 1. Accroche principale (adaptée au profil)
    ├── Problem.jsx         # 2. La douleur spécifique du profil
    ├── Manifesto.jsx       # 3. Bande manifeste « Prodigio le vend » (commun)
    ├── Method.jsx          # 4. La Méthode Prodigio™ — actif vs passif (commun)
    ├── Proof.jsx           # 5. Le cas Chalet Mitja + chiffres (commun)
    ├── Model.jsx           # 6. Le modèle de collaboration (adapté au profil)
    ├── WhyUs.jsx           # 7. Pourquoi nous — les 4 « Parce que… » (commun + accent profil)
    ├── Comparison.jsx      # 8. Tableau comparatif Agence classique / Prodigio (commun)
    └── FinalCTA.jsx        # 9. Invitation à la prise de contact (commun)
```
