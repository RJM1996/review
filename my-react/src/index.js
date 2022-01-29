import MyReact from './MyReact.js'
import MyReactDom from './MyReactDom.js'

/** @jsx MyReact.createElement */
const element = (
  <div style='background: salmon'>
    <h1>Hello World</h1>
    <h2 style='text-align:right'>from MyReact</h2>
  </div>
)
const container = document.getElementById('root')
MyReactDom.render(element, container)
