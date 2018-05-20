import Dispatcher from "../../src/utilities/Dispatcher";
import fakeLocalDB from "../__mocks__/fakeLocalDB";
import FavouritesCollection from "../../src/state/FavouritesCollection";
import fakeData from "../__mocks__/mockFetch";
import GameListView from "../../src/components/GameList/GameList";

describe("Game List", () => {
  const localDB = fakeLocalDB();
  const favouritesCollection = FavouritesCollection.create(localDB);
  const gameList = new GameListView();

  beforeEach(() => {
    document.body.appendChild(gameList.getEl());
    gameList.render(0);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("should show the empty view", () => {
      expect(document.querySelector("#empty-list")).not.toBeNull();
    });

    it("should add games to the DOM", () => {
      gameList.showGames({ games: fakeData, favouritesCollection });

      expect(document.querySelector("#game-fake-short-1")).not.toBeNull();
      expect(document.querySelector("#game-fake-short-2")).not.toBeNull();
      expect(document.querySelector("#game-fake-short-3")).not.toBeNull();
    });
  });

  describe("Events", () => {
    it("should call the render method on event dispatch", () => {
      gameList.render(1);

      Dispatcher.dispatch("games:render", {
        games: fakeData,
        favouritesCollection
      });

      expect(document.querySelector("#game-fake-short-1")).not.toBeNull();
      expect(document.querySelector("#game-fake-short-2")).not.toBeNull();
      expect(document.querySelector("#game-fake-short-3")).not.toBeNull();
    });

    it("should change the favourite attribute on event dispatch", () => {
      const isAdd = true;

      gameList.showGames({ games: fakeData, favouritesCollection });

      Dispatcher.dispatch("game:fav:toggle", { game: fakeData[0], isAdd });

      expect(
        document
          .querySelector(`#game-${fakeData[0].short}`)
          .getAttribute("data-favourite")
      ).toBe("true");
    });

    it("should change the favourite attribute on event dispatch", () => {
      const isAdd = false;

      gameList.showGames({ games: fakeData, favouritesCollection });

      Dispatcher.dispatch("game:fav:toggle", { game: fakeData[0], isAdd });

      expect(
        document
          .querySelector(`#game-${fakeData[0].short}`)
          .getAttribute("data-favourite")
      ).toBe("false");
    });
  });

  describe.skip("W3C Validation", () => {
    const w3c = require("w3c-validate").createValidator([
      "no document type declaration; will parse without validation"
    ]);

    it("should show the clear search button if user clicks search and if there is a search term", done => {
      w3c.validate(document.body.innerHTML, function(errors) {
        expect(errors).toBeNull();
        done();
      });
    });
  });
});
