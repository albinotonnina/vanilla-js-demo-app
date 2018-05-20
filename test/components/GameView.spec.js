import Dispatcher from "../../src/utilities/Dispatcher";
import GameView from "../../src/components/GameView/GameVIew";

describe("Game View", () => {
  const fakeData = {
    name: "fake name",
    short: "fake-short-1",
    url: "fake-url",
    tags: "",
    hasBoosters: ""
  };

  beforeEach(() => {
    const gameView = new GameView();
    document.body.appendChild(gameView.getEl());
    const isFavourite = true;
    gameView.render(fakeData, isFavourite);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("should render the play button", () => {
      expect(document.querySelector("#play-game").innerHTML).toEqual(
        `Play ${fakeData.name}`
      );
    });

    it("should render the game images", () => {
      expect(
        document.querySelector(`#game-view-image-${fakeData.short}`)
      ).not.toBeNull();
      expect(
        document.querySelector(`#game-screenshot-${fakeData.short}`)
      ).not.toBeNull();
    });
  });

  describe("Events", () => {
    const e = new window.MouseEvent("click");

    const callback = jest.fn();

    Dispatcher.register("game:fav:toggle", callback);

    it("should trigger a custom event when user clicks to close the view", () => {
      let didTrigger = false;

      Dispatcher.register("game:hide", () => {
        didTrigger = true;
      });

      document.querySelector("#close-view").dispatchEvent(e);

      expect(didTrigger).toBe(true);
    });

    it("should trigger a custom event when user clicks to add/remove favourite btn - toggle on", () => {
      document.querySelector("#favourite-btn").dispatchEvent(e);
      expect(callback).toBeCalled();
      expect(callback.mock.calls[0][0].isAdd).toBeFalsy();
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
