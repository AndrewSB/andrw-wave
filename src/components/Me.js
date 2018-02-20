import React, { Component } from 'react';
// import meBg from '../../public/me-bg.jpg'

export default class extends Component {
  render() {
    return (
      <div style={styles.background}>
        <p>hi</p>
      </div>
    )
  }
}

const styles = {
  background: {
    backgroundImage: 'url(../../public/me-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lost: {

  },
  name: {

  },
}
