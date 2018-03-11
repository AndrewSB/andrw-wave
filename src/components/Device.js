import React, { Component } from 'react'
import ReactWindowSized from 'react-window-size'
import FourOhFour from './FourOhFour.js'
import Me from './Me.js'

class Device extends Component {
  render() {
    switch (true) { // o_o "pattern matching", they call this. Javascript 😢
      case (this.props.windowWidth > 575):
        return (<p style={{display: 'flex', justifyContent: 'center'}}>
          screen too wide
        </p>)
      // TODO: why does this look fine on the iPhone but not on macOS at this height? 715 breaks on desktop
      // case (this.props.windowHeight < 715):
      //   return <p style={{display: 'flex', justifyContent: 'center'}}>screen too short</p>
      default:
        switch (this.props.currentPage) {
        case 0:
          return <Me goTo404={ () => { window.setPage(1) } }/>
        case 1:
          return <FourOhFour />
        }
    }
  }
}

export default ReactWindowSized(Device)
