import GameModel from "./GameModel";

export default {
  create(localDB) {
    let privateModels = [];

    return {
      ...{
        add(game) {
          privateModels = [...privateModels, GameModel.create(game).getData()];

          this.persistState();
        },

        remove(game) {
          privateModels = privateModels.filter(el => {
            return el.short !== game.short;
          });

          this.persistState();
        },

        find(searchGame) {
          return (
            privateModels.find(game => {
              return searchGame.short === game.short;
            }) !== undefined
          );
        },

        get models() {
          return privateModels;
        },

        set models(data) {
          privateModels = data;

          this.persistState();
        },

        populatefromLocalDB() {
          return localDB
            .get("favourite_games")
            .then((games = []) => {
              privateModels = games;
              return games;
            })
            .catch(err => {
              return err;
            });
        },

        persistState() {
          localDB.set("favourite_games", privateModels).catch(err => {
            throw new Error({ name: "Error", message: err });
          });
        }
      }
    };
  }
};
