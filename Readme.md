# Vanilla JS demo app

🚀 blazing fast, 🗜 tiny (bundle: 40 kb) simple imaginary app.

Apart from [idb-keyval](https://github.com/jakearchibald/idb-keyval) (promise based keyval store for data persistency, < 600 bytes) and express (web framework + API), this app has **no dependencies**.

Under the hood it works with an implementation of the Observer Pattern, more specifically the Publish / Subscribe one:
this simple [dispatcher](src/utilities/Dispatcher.js) is used to broadcast messages to multiple subscribers.

UI events and data/model events are mixed. React/Vue powered apps would be best.

Without a proper UI framework, playing around with the DOM gives this app a certain imperative flavour. Unlikely a good choice in a real world app.

# Demo

[View demo on Heroku](https://vanilla-js-demo-app.herokuapp.com/)

# Tools

No dependencies but the tooling part is fairly similar to a real world FE app:

* webpack
* babel
* sass
* postcss
* jest
* prettier
* eslint
* [husky](https://github.com/typicode/husky)
* [w3c-validate](https://www.npmjs.com/package/w3c-validate)

# Getting started

Install and launch tests:

```
yarn && yarn test
```

Launch dev server on port 8080:

```
yarn start
```

`yarn build` builds for production

`yarn size-limit` check if the bundle is under 50k

## Notes

w3c tests are skipped at the moment. There is a connection to a w3c service that sometimes goes off.

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs **not** accepted.

## License

Do not use. This repo is going to disappear soon.
