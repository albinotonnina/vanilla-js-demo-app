import Dispatcher from '../../../src/App/utilities/Dispatcher'
import Layout from '../../../src/App/AppLayout/AppLayout'

describe('App Layout', () => {
  const mouseClickEvent = new window.MouseEvent('click')

  beforeEach(() => {
    const layout = new Layout()

    layout.start()
  })

  afterEach(() => {
    window.document.body.innerHTML = ''
  })

  describe('Rendering', () => {
    it('should render the app', () => {
      expect(document.querySelector('main')).not.toBeNull()
    })
  })
})
