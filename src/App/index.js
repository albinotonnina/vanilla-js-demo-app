import "babel-polyfill";
import { get, set } from "idb-keyval";
import GamesCollectionFactory from "./State/GamesCollection";
import FavouritesCollectionFactory from "./State/FavouritesCollection";
import App from "./App";
import AppLayout from "./AppLayout/AppLayout";

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
