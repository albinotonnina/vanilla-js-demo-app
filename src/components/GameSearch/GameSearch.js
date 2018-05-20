import {
  dom,
  dispatchEvent,
  setUIStatus,
  registerEvent,
  onClick,
  onKeyUp
} from "../../utilities/functions";

import styles from "./GameSearch.scss";
import template from "./GameSearch.template";

export default class {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = styles.searchContainer;
    this.initEvents();
  }

  initEvents() {
    registerEvent("layout:ready", this.showSearch);
    registerEvent("games:show:all", this.setAllGamesUIState);
    registerEvent("games:show:favourites", this.setFavouritiesUIState);
    registerEvent("games:list:reset", this.clearSearch);
  }

  getEl = () => this.el;

  render() {
    this.el.innerHTML = template({ styles });
    this.didRender();
  }

  showSearch = () => {
    this.render();
  };

  clearSearch = () => {
    this.filterInput.value = "";
  };

  didRender = () => {
    this.initSelectors();
    this.initDOMEvents();
  };

  initSelectors() {
    this.filterInput = dom("#search-input");
    this.showAllBtn = dom("#show-all-btn");
    this.showFavouriteBtn = dom("#show-fav-btn");
  }

  initDOMEvents = () => {
    onKeyUp(this.filterInput, this.searchGames);
    onClick(this.showAllBtn, this.showAllGames);
    onClick(this.showFavouriteBtn, this.showFavourites);
  };

  searchGames = event => {
    dispatchEvent("games:search", event.target.value);
  };

  showAllGames = () => {
    this.setAllGamesUIState();
    dispatchEvent("games:show:all");
  };

  showFavourites = () => {
    this.setFavouritiesUIState();
    dispatchEvent("games:show:favourites");
  };

  setAllGamesUIState = () => this.setSelectedList(true);

  setFavouritiesUIState = () => this.setSelectedList(false);

  setSelectedList = isShowAll => {
    setUIStatus(this.showAllBtn, isShowAll ? "selected" : "");
    setUIStatus(this.showFavouriteBtn, isShowAll ? "" : "selected");
  };
}
