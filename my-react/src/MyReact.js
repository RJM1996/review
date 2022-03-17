import { ELEMENT_TYPE } from './types.js'

/**
 * MyReact: 实现自己的 react
 */
export default class MyReact {
  // 实现 createElement 函数
  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) =>
          typeof child === 'object' ? child : this.createTextElement(child)
        )
      }
    }
  }
  // 创建文本类型的节点
  static createTextElement(text) {
    return {
      type: ELEMENT_TYPE.TEXT_ELEMENT,
      props: {
        nodeValue: text,
        children: []
      }
    }
  }
}
