import {
  setAttribute,
  dispatchEvent,
  registerEvent,
  onClick,
  addEventListener,
  setUIStatus
} from "../../utilities/functions";

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
    this.controlAnimation();
  }

  state = {
    active: false
  };

  render() {
    const { game, state } = this;

    this.el.innerHTML = template({
      game,
      styles,
      state
    });
    onClick(this.el, this.openGameView);

    return this.el;
  }

  initEvents() {
    registerEvent("game:fav:toggle", this.setFavouriteAttribute);
    registerEvent("game:show", this.onGameShow);
  }

  setFavouriteAttribute = ({ game, isAdd }) => {
    const isThisGame = game.short === this.game.short;
    if (isThisGame) {
      this.isFavourite = isAdd;
      setAttribute(this.el, "data-favourite", this.isFavourite);
      this.isFavourite && setUIStatus(this.el, "adding");
    }
  };

  updateUIStatus = () =>
    setUIStatus(this.el, this.state.active ? "active" : "visible");

  onGameShow = ({ game }) => {
    this.state.active = game.short === this.game.short;
    this.updateUIStatus();
  };

  controlAnimation = () => {
    addEventListener(this.el, "animationend", this.updateUIStatus);
  };

  openGameView = () => {
    dispatchEvent("game:show", {
      game: this.game,
      isFavourite: this.isFavourite
    });
  };
}
