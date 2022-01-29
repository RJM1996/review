import { ELEMENT_TYPE } from './types.js'

/**
 * MyReactDom
 */
export default class MyReactDom {
  static render(element, container) {
    const dom =
      element.type === ELEMENT_TYPE.TEXT_ELEMENT
        ? document.createTextNode('')
        : document.createElement(element.type)
    Object.keys(element.props)
      .filter((key) => key !== 'children')
      .forEach((name) => {
        dom[name] = element.props[name]
      })
    element.props.children.forEach((child) => MyReactDom.render(child, dom))
    container.appendChild(dom)
  }
}
