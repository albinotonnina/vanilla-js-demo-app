import {
  dom,
  setUIStatus,
  preloadImg,
  clearUIStatus
} from "../../utilities/functions";

const closeIcon = require("../../assets/images/close.svg");

const imgPath = "https://royal1.midasplayer.com/images/games/";

const template = (game, styles) => {
  const headImg = `${imgPath}${game.short}/tournamentPage/${
    game.short
  }_764x260.jpg`;
  const screenshotImg = `${imgPath}${game.short}/dumps/screen_${
    game.short
  }.gif`;
  clearUIStatus(dom("#game-view-container"));

  preloadImg(screenshotImg, () => {
    const screenshotEl = dom(`#game-screenshot-${game.short}`) || {};
    screenshotEl.src = screenshotImg;
    screenshotEl.alt = `Play ${game.name}!`;

    preloadImg(headImg, () => {
      const headImgEl = dom(`#game-view-image-${game.short}`) || {};
      headImgEl.alt = `Play ${game.name}!`;
      headImgEl.src = headImg;

      setUIStatus(dom("#game-view-container"), "visible");
    });
  });

  const playBtn = `<a href="#" id="play-game" class="${styles.heroBtn}">Play ${
    game.name
  }</a>`;

  const favBtn = `<button id="favourite-btn" class="${styles.heroBtn}" />`;

  return `
  <div class="${styles.imageWrapper}">
    <img id="game-view-image-${game.short}" class="${styles.image}"/>
    <img id="game-screenshot-${game.short}" class="${styles.screenshot}"/>
  </div>
    
  <div class="${styles.gameDataContainer}">
    ${playBtn}
    ${favBtn}
  </div>

 <div class="${styles.closeBtnWrapper}">
  <button id="close-view" class="${styles.closeViewBtn}">
   <img src="${closeIcon}"/>
  </button>
 </div>
`;
};

export default template;
