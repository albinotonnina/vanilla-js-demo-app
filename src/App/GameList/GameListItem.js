import {
  setAttribute,
  dispatchEvent,
  registerEvent,
  onClick
} from "../utilities/functions";

import styles from "./GameListItem.scss";
import template from "./GameListItem.template";

export default class {
  constructor({ game, isFavourite }) {
    this.game = game;
    this.isFavourite = isFavourite;
    this.el = document.createElement("div");
    this.el.className = styles.game;
    this.el.tabIndex = 1;
    this.el.id = `game-${game.short}`;
    this.el.setAttribute("data-favourite", this.isFavourite);
    this.el.setAttribute("data-name", this.game.name);

    this.initEvents();
  }

  render() {
    this.el.innerHTML = template(this.game, styles);
    onClick(this.el, this.openGameView);

    return this.el;
  }

  initEvents() {
    registerEvent("game:fav:toggle", this.setFavouriteAttribute);
  }

  setFavouriteAttribute = ({ game, isAdd }) => {
    const isThisGame = game.short === this.game.short;
    if (isThisGame) {
      this.isFavourite = isAdd;
      setAttribute(this.el, "data-favourite", this.isFavourite);
    }
  };

  openGameView = () => {
    dispatchEvent("game:show", {
      game: this.game,
      isFavourite: this.isFavourite
    });
  };
}
