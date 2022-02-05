import MyReact from './MyReact.js'
import MyReactDom, { useState } from './MyReactDom.js'

/** @jsx MyReact.createElement */
const container = document.getElementById('root')
const onInputChange = (e) => {
  console.log('onInput', e.target.value)
  rerender(e.target.value)
}
// const App = (props) => {
//   return <h1>Hi, {props.name}</h1>
// }
const App = (props) => {
  return MyReact.createElement('h1', null, 'Hi', props.name)
}
const AppElement = MyReact.createElement(App, { name: '函数式组件' })
// MyReactDom.render(AppElement, container)

const rerender = (value) => {
  const element = (
    <div style='background: salmon'>
      <h1>{value}</h1>
      <input onInput={onInputChange} value={value} />
      {/* <App name='函数式组件' /> */}
      <h2 style='text-align:right'>from MyReact</h2>
    </div>
  )
  MyReactDom.render(element, container)
}
// rerender('Hello World')

/** @jsx MyReact.createElement */
function Counter() {
  const [state, setState] = useState(1)
  return (
    <div>
      <h1>Count: {state}</h1>
      <button onClick={() => setState((c) => c + 1)}>ADD</button>
    </div>
  )
}
const element = <Counter />
MyReactDom.render(element, container)
