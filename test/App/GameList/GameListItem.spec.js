import Dispatcher from '../../../src/App/utilities/Dispatcher'

import ItemModel from '../../../src/App/state/GameModel'

import ListItem from '../../../src/App/GameList/GameListItem'

describe('Game Item', () => {
  const fakeData = {
    name: 'fake name',
    short: 'fake-short-1',
    url: 'fake-url',
    tags: '',
    hasBoosters: ''
  }

  beforeAll(() => {
    const fakeModel = ItemModel.create(fakeData).getData()
    const isFavourite = false

    const ItemView = new ListItem({game: fakeModel, isFavourite})

    window.document.body.appendChild(ItemView.render())
  })

  afterAll(() => {
    window.document.body.innerHTML = ''
  })

  describe('Rendering', () => {
    it('should render the game title', () => {
      const gameTitle = document
        .querySelector(`#game-${fakeData.short}`)
        .getAttribute('data-name')

      expect(gameTitle).toBe('fake name')
    })
  })

  describe('Events', () => {
    const mouseClickEvent = new window.MouseEvent('click')

    it('should trigger a custom event when user clicks on the game', () => {
      let didTrigger = false
      Dispatcher.register('game:show', () => (didTrigger = true))

      document
        .querySelector('#game-fake-short-1')
        .dispatchEvent(mouseClickEvent)

      expect(didTrigger).toBe(true)
    })
  })

  describe('W3C Validation', () => {
    const w3c = require('w3c-validate').createValidator([
      'no document type declaration; will parse without validation'
    ])

    it('should show the clear search button if user clicks search and if there is a search term', done => {
      w3c.validate(document.body.innerHTML, function(errors) {
        expect(errors).toBeNull()
        done()
      })
    })
  })
})
