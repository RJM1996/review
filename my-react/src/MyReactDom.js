import { EFFECT_TAG, ELEMENT_TYPE } from './types.js'

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
      },
      alternate: currentRoot
    }
    deletions = []
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

  updateDom(dom, {}, fiber.props)
  return dom
}

// 下一个工作单元
let nextUnitOfWork = null
// work in progress root
let wipRoot = null
// 保存当前 fiber 树的根节点
let currentRoot = null
// 记录已删除节点的数组
let deletions = []

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
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}
// 递归更新当前节点,子节点,兄弟节点到真实的 dom 中
function commitWork(fiber) {
  if (!fiber) return
  const parentDom = fiber.parent.dom

  // 根据 effectTag 属性进行相应操作(更新/新增/删除)
  if (fiber.effectTag === EFFECT_TAG.PLACEMENT && fiber.dom !== null) {
    parentDom.appendChild(fiber.dom)
  }
  if (fiber.effectTag === EFFECT_TAG.UPDATE && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }
  if (fiber.effectTag === EFFECT_TAG.DELETION) {
    parentDom.removeChild(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function updateDom(dom, prevProps, nextProps) {
  // 定义用于判断属性类型的一系列方法
  // 是否为事件监听属性 (react 中的事件属性都以 on 开头)
  const isEvent = (key) => key.startsWith('on')
  // 是否为原始属性
  const isProperty = (key) => key !== 'children' && !isEvent(key)
  // 是否为新增属性
  const isNew = (prev, next) => (key) => prev[key] !== next[key]
  // 是否为移除属性
  const isGone = (prev, next) => (key) => !(key in next)

  // 过滤出老节点上的事件监听属性,然后再次过滤出在新节点上不存在或者在新旧节点上属性值不同的属性,将其移除
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      // 获取属性名称
      const eventType = name.toLowerCase().substring(2)
      // 删除该属性
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 过滤出新节点上的原始属性,并再次过滤出新旧节点上属性值不同的属性,添加到dom中
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name]
    })

  // 过滤出新节点上的事件监听属性,添加到dom中
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}
function updateFunComponent(fiber) {
  // 执行函数获取函数式组件的子节点
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function updateHostComponent(fiber) {
  // 1. 根据 fiber 节点创建真实的 dom 节点, 并将 fiber 的 dom 属性指向真实的 dom 节点对象
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  // 2. 为子节点创建 fiber 节点
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
}
// 执行工作单元
function performUnitOfWork(fiber) {
  // console.log('fiber', fiber)

  // 函数式组件和类组件有不同的更新逻辑
  const isFunComponent = fiber.type instanceof Function
  if (isFunComponent) {
    updateFunComponent(fiber)
  } else {
    updateHostComponent(fiber)
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

// 调和(对比前后 fiber 树结构的不同, 更新节点)
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  while (index < elements.length || oldFiber) {
    console.log('reconcileChildren', index, oldFiber)
    const element = elements[index]
    let newFiber = null
    const sameType = oldFiber && element && element.type === oldFiber.type

    // type 相同: 更新节点
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: EFFECT_TAG.UPDATE
      }
      console.log(111, newFiber)
    }
    // type 不同: 新建节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: EFFECT_TAG.PLACEMENT
      }
    }
    // type 不同且同级仅存在 oldFiber: 删除节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = EFFECT_TAG.DELETION
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}
