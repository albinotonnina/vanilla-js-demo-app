import Model from '../../src/state/GameModel'

describe('Game Model', () => {
  const fakeData = {
      name: 'fake name',
      short: 'fake-short-1',
      url: 'fake-url',
      tags: '',
      hasBoosters: ''
    },
    model = Model.create(fakeData)

  describe('Get data', () => {
    it('should get the game data', () => {
      expect(model.getData() == fakeData).toBe(true)
    })
  })
})
