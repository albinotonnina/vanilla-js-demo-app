import {
  dom,
  dispatchEvent,
  onClick,
  removeOnClick
} from '../utilities/functions'

import styles from './GameView.scss'
import template from './GameView.template'

export default class {
  constructor() {
    this.el = document.createElement('div')
    this.el.className = styles.container
    this.el.id = 'game-view-container'
  }

  state = {
    isFav: false
  }

  getEl = () => this.el

  render(game, isFavourite) {
    this.game = game
    this.state.isFav = isFavourite
    this.el.innerHTML = template(game, styles, this.isFavourite)
    this.initClickEvents()
    this.setFavouriteBtnText()
  }

  closeView = () => {
    dispatchEvent('game:hide')
  }

  setFavouriteBtnText() {
    dom('#favourite-btn').innerHTML = this.state.isFav
      ? '💔 Remove from my games'
      : '❤️ Add to my games'
  }

  initClickEvents() {
    onClick(dom('#close-view'), this.closeView)
    onClick(dom('#favourite-btn'), this.setFavourite)
    onClick(dom('#play-game'), this.onPlay)
  }

  onPlay = event => {
    event.preventDefault()
    dispatchEvent('game:play')
  }

  clearEvents = () => {
    removeOnClick(dom('#close-view'), this.closeView)
    removeOnClick(dom('#favourite-btn'), this.setFavourite)
  }

  setFavourite = () => {
    this.state.isFav = !this.state.isFav

    dispatchEvent('game:fav:toggle', {
      game: this.game,
      isAdd: this.state.isFav
    })

    this.setFavouriteBtnText()
  }
}
