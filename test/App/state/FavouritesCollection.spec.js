import Collection from '../../../src/App/state/FavouritesCollection'
import fakeLocalDB from '../../helpers/fakeLocalDB'

describe('Favourite Collection', () => {
  let collection,
    localDB = fakeLocalDB()

  const fakeData = {
    name: 'fake name',
    short: 'fake-short',
    url: 'fake-url',
    tags: '',
    hasBoosters: ''
  }

  beforeEach(() => {
    collection = Collection.create(localDB)
  })

  describe('Add / Remove', () => {
    it('should add a game to the favourite', () => {
      collection.add(fakeData)

      expect(collection.models.length).toBe(1)
    })

    it('should remove a game from the favourite', () => {
      collection.add(fakeData)

      expect(collection.models.length).toBe(1)

      collection.remove(fakeData)

      expect(collection.models.length).toBe(0)
    })
  })

  describe('Find', () => {
    it('should find a game if in favourite', () => {
      collection.add(fakeData)

      expect(collection.find(fakeData)).toBe(true)
    })
  })

  describe('Local DB', () => {
    it('should populate the collection with the existing games in the local db', done => {
      collection.add(fakeData)

      localDB
        .get('favourite_games')
        .then(games => {
          expect(games.length).toBe(1)
          done()
        })
        .catch(err => console.log(err))
    })

    it('should populate the collection with the existing games in the local db', done => {
      localDB.set('favourite_games', [{fake: 'object'}, {fake: 'object'}])

      collection
        .populatefromLocalDB()
        .then(games => {
          expect(games.length).toBe(2)
          done()
        })
        .catch(err => console.log(err))
    })
  })
})
