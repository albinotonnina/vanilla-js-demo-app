import { dom, setUIStatus, preloadImg } from "../utilities/functions";

const imagePath = "http://royal1.midasplayer.com/images/games/";

const template = (game, styles) => {
  const gameImageUrl = `${imagePath}${game.short}/${game.short}_170x80.gif`;

  preloadImg(gameImageUrl, () => {
    const gameEl = dom(`#game-list-image-${game.short}`);

    if (gameEl) {
      gameEl.src = gameImageUrl;
      gameEl.alt = `Play ${game.name}!`;
      setUIStatus(dom(`#game-${game.short}`), "visible");
    }
  });

  return `
    <div class="${styles.wrap}">
        <div class="${styles.fav}">FAV</div>
    </div>

    <img class="${styles.gameImage}" id="game-list-image-${
    game.short
  }"  />       
`;
};

export default template;
