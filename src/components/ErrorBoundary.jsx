import { Component } from 'react'

// ====================================================================
//  Filet de sécurité — capture toute erreur d'exécution dans l'app.
//
//  Sans ce garde-fou, la moindre erreur JavaScript démonte tout React
//  et laisse le <body> noir (bg-ink) : l'utilisateur voit un « écran noir ».
//  Ici, on affiche à la place un message lisible + un bouton « Réessayer »,
//  et on remonte l'erreur dans la console pour pouvoir diagnostiquer.
// ====================================================================
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Visible dans la console du navigateur (utile pour diagnostiquer à distance).
    console.error('[PRODIGIO] Erreur capturée :', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-ink px-6 text-center text-paper">
        <h1 className="font-serif text-3xl font-light tracking-luxe sm:text-4xl">
          PRODIGIO
        </h1>
        <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-smoke-200/90">
          Une erreur est survenue à l’affichage de la page.
          Vérifiez votre connexion, puis réessayez.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-glass mt-9"
        >
          Réessayer
        </button>
      </div>
    )
  }
}
