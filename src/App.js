import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Device from './components/Device'
require('viewport-units-buggyfill').init()

class App extends Component {
  render() {
    setTimeout(() => {window.scrollTo(100, 1)}, 1000)
    return (
      <BrowserRouter>
        <Device />
      </BrowserRouter>
    )
  }
}

export default App;
