import Layout from '../../src/components/AppLayout/AppLayout'

describe('App Layout', () => {
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
