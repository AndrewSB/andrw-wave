import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import Device from './components/Device'
require('viewport-units-buggyfill').init()

class App extends Component {
  render() {
    setTimeout(() => {window.scrollTo(100, 1)}, 1000)
    return (
      <HashRouter>
        <Device />
      </HashRouter>
    )
  }
}

export default App;
