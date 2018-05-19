import GameModel from "./GameModel";

export default {
  create() {
    let privateModels = [];

    return {
      ...{
        fetch() {
          return fetch("/api/games/")
            .then(response => response.json())
            .then(response => {
              this.populate(response);
              return privateModels;
            })
            .catch(err => {
              throw err;
            });
        },

        populate(data) {
          data.games.forEach(game => {
            this.add(game);
          });
        },

        add(game) {
          privateModels = [...privateModels, GameModel.create(game).getData()];
        },

        get models() {
          return privateModels;
        },

        set models(data) {
          privateModels = data;
        }
      }
    };
  }
};
