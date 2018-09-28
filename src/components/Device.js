import React, { Component } from 'react'
import ReactWindowSized from 'react-window-size'
import Main from './Main.js'

class Device extends Component {
  render() {
    switch (true) { // o_o "pattern matching", they call this. Javascript 😢
    case (this.props.windowWidth > 575):
      const centerTextStyle = {display: 'flex', justifyContent: 'center'}
      return (
        <div>
          <p style={centerTextStyle}>
	          your screen is too wide
          </p>
          <p style={centerTextStyle}>
	          make your screen narrower and the page will render -- this is a work in progress
          </p>
        </div>
      )
      // TODO: why does this look fine on the iPhone but not on macOS at this height? 715 breaks on desktop
      // case (this.props.windowHeight < 715):
      //   return <p style={{display: 'flex', justifyContent: 'center'}}>screen too short</p>
      default:
        return <Main />
    }
  }
}

export default ReactWindowSized(Device)
