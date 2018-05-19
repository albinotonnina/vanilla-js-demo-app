import {
  dom,
  setUIStatus,
  preloadImg,
  clearUIStatus
} from '../utilities/functions'

const imgPath = 'http://royal1.midasplayer.com/images/games/'

const template = (game, styles, favouriteBtnText) => {
  const headImg = `${imgPath}${game.short}/tournamentPage/${
    game.short
  }_764x260.jpg`
  const screenshotImg = `${imgPath}${game.short}/dumps/screen_${game.short}.gif`
  clearUIStatus(dom('#game-view-container'))

  preloadImg(screenshotImg, () => {
    const screenshotEl = dom(`#game-screenshot-${game.short}`) || {}
    screenshotEl.src = screenshotImg
    screenshotEl.alt = `Play ${game.name}!`

    preloadImg(headImg, () => {
      const headImgEl = dom(`#game-view-image-${game.short}`) || {}
      headImgEl.alt = `Play ${game.name}!`
      headImgEl.src = headImg

      setUIStatus(dom('#game-view-container'), 'visible')
    })
  })

  const playBtn = `<a href="#" id="play-game" class="${styles.heroBtn}">Play ${
    game.name
  }</a>`

  const favBtn = `<button id="favourite-btn" class="${styles.heroBtn}" />`

  return `
  <img id="game-view-image-${game.short}" class="${styles.image}"/>
  <img id="game-screenshot-${game.short}" class="${styles.screenshot}"/>
    
  <div class="${styles.gameDataContainer}">
    ${playBtn}
    ${favBtn}
  </div>

  <button id="close-view" class="${styles.closeViewBtn}"></button>
`
}

export default template
