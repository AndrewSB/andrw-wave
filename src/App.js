import React, { Component } from 'react'
import ReactWindowSized from 'react-window-size'
import FourOhFour from './components/FourOhFour.js'
import Me from './components/Me.js'

class App extends Component {
  render() {
    switch (true) { // o_o "pattern matching", they call this. Javascript 😢
      case (this.props.windowWidth > 575):
        return <p style={{display: 'flex', justifyContent: 'center'}}>screen too wide</p>
      // TODO: why does this look fine on the iPhone but not on macOS at this height? 715 breaks on desktop
      // case (this.props.windowHeight < 715):
      //   return <p style={{display: 'flex', justifyContent: 'center'}}>screen too short</p>
      default:
        return <Me />
    }
  }
}

export default ReactWindowSized(App);
