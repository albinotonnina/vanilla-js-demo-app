import Dispatcher from "../../src/utilities/Dispatcher";
import GameSearch from "../../src/components/GameSearch/GameSearch";

describe("Game Search", () => {
  const gameSearch = new GameSearch();

  const mouseClickEvent = new window.MouseEvent("click");
  const keyUpEvent = new window.KeyboardEvent("keyup");

  beforeEach(() => {
    document.body.appendChild(gameSearch.getEl());
    gameSearch.render();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Filters", () => {
    describe("Events", () => {
      it("should trigger a custom event when user submits a search", () => {
        const callback = jest.fn();

        Dispatcher.register("games:search", callback);

        document.querySelector("#search-input").value = "search something";
        document.querySelector("#search-input").dispatchEvent(keyUpEvent);

        expect(callback).toBeCalled();
      });
    });
  });

  describe("Rendering", () => {
    it("should trigger a custom event when user click on show all", () => {
      let didTrigger = false;
      Dispatcher.register("games:show:all", () => (didTrigger = true));

      document.querySelector("#show-all-btn").dispatchEvent(mouseClickEvent);

      expect(didTrigger).toBe(true);
    });

    it("should trigger a custom event when user click on show favourite", () => {
      let didTrigger = false;
      Dispatcher.register("games:show:favourites", () => (didTrigger = true));

      document.querySelector("#show-fav-btn").dispatchEvent(mouseClickEvent);

      expect(didTrigger).toBe(true);
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
