import {
  dom,
  setAttribute,
  clearUIStatus,
  setUIStatus,
  dispatchEvent,
  registerEvent,
  addEventListener
} from "../../utilities/functions";

import GameList from "../GameList/GameList";
import GameView from "../GameView/GameView";
import GameSearch from "../GameSearch/GameSearch";
import "../../styles/Base.scss";
import styles from "./AppLayout.scss";
import template from "./AppLayout.template";

class AppLayout {
  constructor() {
    this.initListeners();
    this.gameView = new GameView();
    this.gameList = new GameList();
    this.gameSearch = new GameSearch();
  }

  initListeners() {
    registerEvent("game:show", this.showGameView);
    registerEvent("game:hide", this.closeGame);
    registerEvent("games:show:all", this.setAllGamesUIState);
    registerEvent("games:show:favourites", this.setFavouritiesUIState);
    registerEvent("game:play", this.dummy);
  }

  showGameView = ({ game, isFavourite }) => {
    this.gameView.render(game, isFavourite);
    setUIStatus(this.listContainer, "compressed");
    setUIStatus(this.gameViewContainer, "expanded");
  };

  closeGame = () => {
    clearUIStatus(this.listContainer);
    clearUIStatus(this.gameViewContainer);
  };

  start() {
    this.render();
  }

  didRender = () => {
    this.initSelectors();
    this.appendElements();
    this.controlLogoAnimation();
    this.startLayout();
  };

  initSelectors = () => {
    this.gameViewContainer = dom("#games-view-container");
    this.listContainer = dom("#games-list-container");
    this.logo = dom("#logo");
  };

  appendElements = () => {
    this.listContainer.appendChild(this.gameSearch.getEl());
    this.listContainer.appendChild(this.gameList.getEl());
    this.gameViewContainer.appendChild(this.gameView.getEl());
  };

  controlLogoAnimation = () => {
    addEventListener(this.logo, "animationend", () => {
      clearUIStatus(this.logo);
    });
  };

  startLayout = () => {
    dispatchEvent("layout:ready");
  };

  setAllGamesUIState = () => this.setSelectedList(true);

  setFavouritiesUIState = () => this.setSelectedList(false);

  setSelectedList = isShowAll => {
    setAttribute(this.listContainer, "data-ui-has", isShowAll ? "all" : "fav");
  };

  dummy = () => {
    setUIStatus(this.logo, "");
  };

  render() {
    document.body.insertAdjacentHTML("afterbegin", template(styles));
    this.didRender();
  }
}

export default AppLayout;
