import React, { Component } from 'react';

const backgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'

export default class extends Component {
  componentDidMount() {
    console.log(this.refs.hi.offsetWidth)
  }
  render() {
    return (
      <div ref='hi' style={styles.background}>
        <a style={styles.lost}>u lost?</a>
        <p style={styles.name}>A N D R W</p>
      </div>
    )
  }
}

const styles = {
  background: {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lost: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10vh',
    color: '#DF976C',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '3vw',
  },
  name: {
    color: '#176EA8',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '8vw',
    marginLeft: '5vw',
    marginTop: '30vh',
  },
}
