import Dispatcher from './Dispatcher'

const dom = s => document.querySelector(s)

const setAttribute = (el, attr, val) => el.setAttribute(attr, val)

const removeAttribute = (el, attr) => el.removeAttribute(attr)

const clearUIStatus = el => removeAttribute(el, 'data-ui-status')

const setUIStatus = (el, val) => setAttribute(el, 'data-ui-status', val)

const dispatchEvent = (ev, props = {}) => Dispatcher.dispatch(ev, props)

const registerEvent = (ev, fn) => Dispatcher.register(ev, fn)

const addEventListener = (el, ev, fn) => el.addEventListener(ev, fn)

const onClick = (el, fn) => addEventListener(el, 'click', fn)

const onKeyUp = (el, fn) => addEventListener(el, 'keyup', fn)

const removeOnClick = (el, fn) => el.removeEventListener('click', fn)

const preloadImg = (url, fn) => {
  const image = document.createElement('IMG')
  image.src = url
  image.onload = fn
}

module.exports = {
  dom,
  setAttribute,
  removeAttribute,
  clearUIStatus,
  setUIStatus,
  dispatchEvent,
  registerEvent,
  addEventListener,
  onKeyUp,
  onClick,
  removeOnClick,
  preloadImg
}
