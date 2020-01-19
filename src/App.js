import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Device from './components/Device'
require('viewport-units-buggyfill').init()

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Device />
      </BrowserRouter>
    )
  }
}

export default App;
