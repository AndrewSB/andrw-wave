import React, { Component } from 'react';

const backgroundImageUrl = 'https://i.pinimg.com/236x/e3/a3/65/e3a36503e5a0a5fa9748412df8551173---bit-the-planets.jpg'
const okHandImageUrl = 'https://78.media.tumblr.com/c0f430296f0ec59343bb11e6e2a38a25/tumblr_o1q0o5T23V1uf5j8co1_250.gif'

export default class extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div style={styles.title}>
          <p style={styles.ps}>4</p>
          <img alt='' src={okHandImageUrl} />
          <p style={styles.ps}>4</p>
        </div>
      </div>
    )
  }
}

const styles = {
    background: {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        imageRendering: 'pixelated',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ps: {
      fontSize: 66,
      color: '#E2019B',
      fontFamily: 'Andale Mono, AndaleMono, monospace',
    }
}
