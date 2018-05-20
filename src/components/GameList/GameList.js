import {
  dom,
  setAttribute,
  dispatchEvent,
  registerEvent
} from "../../utilities/functions";

import GameListItem from "./GameListItem";

import styles from "./GameList.scss";
import template from "./GameList.template";

export default class {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = styles.gamesListContainer;
    this.initEvents();
  }

  getEl = () => this.el;

  render(numGames) {
    this.el.innerHTML = template({ styles, numGames });
    numGames === 0 && this.initEmptyViewClickEvents();
  }

  showGames = ({ games = [], favouritesCollection = {} }) => {
    this.render(games.length);

    games.forEach(game => {
      const gameListItem = new GameListItem({
        game,
        isFavourite: favouritesCollection.find(game)
      });

      dom("#games-list").appendChild(gameListItem.render());
    });
  };

  initEmptyViewClickEvents() {
    const browseBtn = dom("#view-all-games-btn");
    browseBtn &&
      browseBtn.addEventListener("click", () => {
        dispatchEvent("games:show:all");
        dispatchEvent("games:list:reset");
      });
  }

  initEvents() {
    const onFav = ({ game, isAdd }) => {
      const gameListItemEl = dom(`#game-${game.short}`);
      gameListItemEl && setAttribute(gameListItemEl, "data-favourite", isAdd);
    };

    registerEvent("game:fav:toggle", onFav);
    registerEvent("games:render", this.showGames);
  }
}
