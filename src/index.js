import "babel-polyfill";
import { get, set } from "idb-keyval";
import GamesCollectionFactory from "./state/GamesCollection";
import FavouritesCollectionFactory from "./state/FavouritesCollection";
import App from "./app";
import AppLayout from "./components/AppLayout/AppLayout";

const localDB = {
  get,
  set
};

const app = new App({
  GamesCollection: GamesCollectionFactory.create(),
  FavouritesCollection: FavouritesCollectionFactory.create(localDB)
});

const appLayout = new AppLayout();

window.onload = async () => {
  await app.start();
  appLayout.start();
};
