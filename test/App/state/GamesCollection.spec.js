import fakeData from '../../helpers/mockFetch'

import Collection from '../../../src/App/state/GamesCollection'

describe('Games Collection', () => {
  require('fetch-mock').get('/api/games/', {games: fakeData})

  let collection

  beforeEach(() => {
    collection = Collection.create()
  })

  describe('Fetching', () => {
    it('should fetch the data and populate the collection', done => {
      collection.fetch().then(() => {
        expect(collection.models.length).toBe(3)
        done()
      })
    })
  })

  describe('getter/setter', () => {
    it('should get and set models', () => {
      collection.models = fakeData
      expect(collection.models.length).toBe(3)
    })

    it('should get and set models', () => {
      collection.add(fakeData[0])
      expect(collection.models.length).toBe(1)
    })
  })
})
