import { ELEMENT_TYPE } from './types.js'

/**
 * MyReactDom
 */
export default class MyReactDom {
  constructor() {}
  static render(element, container) {
    // element.props.children.forEach((child) => MyReactDom.render(child, dom))
    // container.appendChild(dom)

    wipRoot = {
      dom: container,
      props: {
        children: [element]
      }
    }
    nextUnitOfWork = wipRoot
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
    requestIdleCallback((deadline) => workLoop(deadline))
  }
}

function createDom(fiber) {
  const dom =
    fiber.type === ELEMENT_TYPE.TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  Object.keys(fiber.props)
    .filter((key) => key !== 'children')
    .forEach((name) => {
      dom[name] = fiber.props[name]
    })
  return dom
}

// 下一个工作单元
let nextUnitOfWork = null
// work in progress root
let wipRoot = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  // 当不存在下一个工作单元时, 再整体渲染 wipRoot 到真实的 dom 中
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback((deadline) => workLoop(deadline))
}

function commitRoot() {
  console.log('commitRoot')
  commitWork(wipRoot.child)
  wipRoot = null
}
// 递归添加当前节点,子节点,兄弟节点到真实的 dom 中
function commitWork(fiber) {
  if (!fiber) return
  const parentDom = fiber.parent.dom
  parentDom.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// 执行工作单元
function performUnitOfWork(fiber) {
  console.log('fiber', fiber)
  // 1. 根据 fiber 节点创建真实的 dom 节点, 并将 fiber 的 dom 属性指向真实的 dom 节点对象
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // 不用每次执行时都添加到真实的dom中
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  // 2. 为子节点创建 fiber 节点
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
      child: null, // 第一个子节点
      sibling: null // 兄弟节点
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

  // 3. 返回下一个工作单元
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
  return null
}
