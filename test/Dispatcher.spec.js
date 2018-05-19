/* global describe it afterEach */
import Dispatcher from '../src/App/utilities/Dispatcher'

const noop = () => null,
  noop1 = () => null,
  eventName = 'TEST',
  payload = {}

describe('Dispatcher', () => {
  afterEach(() => Dispatcher.clearEventHandlers(eventName))

  describe('register(event, fn)', () => {
    it('should register event handler', () => {
      Dispatcher.register(eventName, noop)
      expect(noop).toBe(Dispatcher.getEventHandlers(eventName)[0])
    })
  })

  describe('remove(event, fn)', () => {
    it('should remove event handler', () => {
      Dispatcher.register(eventName, noop)
      Dispatcher.remove(eventName, noop)

      expect(Dispatcher.getEventHandlers(eventName).length).toBe(0)
    })
  })

  describe('dispatch(event, payload)', () => {
    it('should dispatch event', () => {
      Dispatcher.register(eventName, inPayload => {
        expect(inPayload).toBe(payload)
      })

      Dispatcher.dispatch(eventName, payload)
    })
  })

  describe('getEventHandlers(event)', () => {
    it('should get event handlers', () => {
      Dispatcher.register(eventName, noop)
      Dispatcher.register(eventName, noop1)

      expect(Dispatcher.getEventHandlers(eventName).length).toBe(2)
    })
  })

  describe('clearEventHandlers(event?)', () => {
    it('should clear event handlers of type', () => {
      Dispatcher.register(eventName, noop)
      Dispatcher.clearEventHandlers(eventName)

      expect(Dispatcher.getEventHandlers(eventName).length).toBe(0)
    })
  })
})
