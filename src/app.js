import { dispatchEvent, registerEvent } from "./utilities/functions";

export default class App {
  constructor({ GamesCollection, FavouritesCollection }) {
    this.gamesCollection = GamesCollection;
    this.favouritesCollection = FavouritesCollection;
    this.searchQuery = "";
    this.initEvents();
  }

  state = {
    currentGames: {
      models: []
    },
    searchQuery: ""
  };

  start = async () => {
    await this.favouritesCollection.populatefromLocalDB();
    await this.gamesCollection.fetch();
  };

  initEvents() {
    registerEvent("game:fav:toggle", this.updateFavouritesCollection);
    registerEvent("games:search", this.searchGames);
    registerEvent("games:list:reset", this.clearSearch);
    registerEvent("games:show:all", this.getAllGames);
    registerEvent("games:show:favourites", this.getFavourites);
    registerEvent("layout:ready", this.showAllGames);
  }

  showAllGames = () =>
    requestAnimationFrame(() => dispatchEvent("games:show:all"));

  updateFavouritesCollection = ({ game, isAdd }) => {
    if (isAdd) {
      this.favouritesCollection.add(game);
    } else {
      this.favouritesCollection.remove(game);
    }
  };

  searchGames = query => {
    this.state.searchQuery = query;
    this.showGames();
  };

  clearSearch = () => {
    this.state.searchQuery = "";
    this.showGames();
  };

  getAllGames = () => {
    this.state.currentGames = this.gamesCollection;
    this.showGames();
  };

  getFavourites = () => {
    this.state.currentGames = this.favouritesCollection;
    this.showGames();
  };

  showGames = () => {
    const games = this.state.currentGames.models.filter(game =>
      game.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    dispatchEvent("games:render", {
      games,
      favouritesCollection: this.favouritesCollection
    });
  };
}
