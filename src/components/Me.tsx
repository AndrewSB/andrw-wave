import React, { Component, useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import FakePhonePanel from './FakePhonePanel';

const backgroundImageUrl = 'https://svgshare.com/i/Jp7.svg'
const oldBackgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'
const backgroundImageUrlPallete = {
  'dominant': 'rgb(40, 70, 80)',
};

const AnimationState = Object.freeze({
  notYet: 0,
  animating: 1,
  done: 2,
})

var dialogBoxState = [
  {height: 30, node: (<>?</>)},
  {height: 44, node: (<>this is a fun art project - not the portfolio you might expect</>)},
  {height: 30, node: (<>
    here are some links to click:
    <span> </span>
    <a href='https://github.com/AndrewSB'>github</a>
    <span> </span>
    <a href='https://linkedin.com/in/ndrww'>linkedin</a>
    <span> </span>
  </>)},
  {height: 63, node: <>if you’ve made it this far, I would love to get to know you. send an e-mail to <a href='mailto:asbreckenridge@me.com'>asbreckenridge@me.com</a> with an answer to “What’s your favorite color?”</>},
  {height: 44, node: <>note: no one ever does this. I would be soOoOo thrilled if you did.</>},
  {height: 30, node: <><a>always remember to make time to be lost</a></>}
]

const Me: React.FC = () => {
  const state = {
    animating: AnimationState.notYet,
    overlayAlpha: 0,
  }
  
  // this is kind of a shit check, but media-queries dont work well in React and this seems to work
  const isMobile = false // ['Mobile', 'iPhone', 'Android', 'Windows Phone'].some((candidateString) => navigator.userAgent.indexOf(candidateString) !== -1)

  const [boxState, setBoxState] = useState(0);
  const [height, setHeight] = useState(16);
  useEffect(
    () => setHeight(document.getElementById('box-content').getBoundingClientRect().height),
    [boxState]
  )

  return (
    <FakePhonePanel showingWidth={530} customStyle={`
      background: ${backgroundImageUrlPallete.dominant};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    `}>
      <div className='background'>
        <Link href='/404'>
          <a className='fourohfourlink'> </a>
        </Link>
        <div
          onClick={() => {
            const nextState = (boxState + 1) % dialogBoxState.length;
            if (nextState == 0) Router.push('/404');
            else setBoxState(nextState);
          }}
          className={'box ' + (boxState == 0 ? 'inactive' : 'active')}>
            <div id='box-content'>{dialogBoxState[boxState].node}</div>
            <i />
        </div>
      </div>
      <style jsx>{`
        .background {
          background-image: url(${backgroundImageUrl});
          background-size: cover;
          background-position: top center;
          width: 100%;
          height: 100%;
          justify-content: center;
          display: flex;
          position: relative;
        }

        .fourohfourlink {
          display: block;
          padding-top: 8.5vh;
          height: 88px;
          width: 200px;
        }

        p {
          font-family: Arial, sans-serif;
        }

        span {
          margin-left: 1.25em;
          margin-right: 1.25em;
        }

        .box {
          position: absolute;
          bottom: 22px;
          right: 22px;
          font-size: 8px;
          font-family: "Press Start 2P", Arial, sans-serif;
          border-radius: 2px;
          padding: 8px;
          line-height: 16px;
          height: ${height + 8}px;
          margin: auto;
          background: white;
          border: 1px solid white;
          box-shadow: 0 1px 0 1px black,
                      inset 0 1px 0 1px black,
                      0 0 0 1px black,
                      inset 0 0 0 1px black;
        }

        #box-content {
          padding-right: 10px;
        }

        .box.active {
          left: 22px;
        }

        .box>i {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top-color: black;
          margin-top: 23px;
          animation: shake-vertical 1s ease-in-out infinite alternate;
          float: right;
        }

        @keyframes shake-vertical {
          from { margin-top: 0px; }
          to { margin-top: 2px; }
        }
      `}</style>
    </FakePhonePanel>
  );
      // <>
      //   <div style={styles.lostContainer(this.isMobile)}>
      //     <a style={styles.lost} onClick={this.handleClick.bind(this)}>u lost?</a>
      //   </div>
      //   <div style={styles.nameContainer(this.isMobile)}>
      //     <p style={styles.name}>A N D R W</p>
      //   </div>
      //   <div style={styles.whiteOverlay(this.state)} />
      // </>

  // handleClick() {
  //   if (this.state.animating === AnimationState.animating) { return }

  //   this.setState({ animating: AnimationState.animating })
  //   this.animate()
  // }

  // // Callee is responsible for only calling this once
  // animate() {
  //   const opacityJumps = [30, 40, 50, 60, 70, 80, 90, 100]
  //   var i = 0;
  //   var parentThis = this;
  //   const intervalHandle = setInterval(() => {
  //     parentThis.setState({ overlayAlpha: opacityJumps[i] })
  //     i++;
  //     if (i === opacityJumps.length) {
  //       clearInterval(intervalHandle)
  //       parentThis.setState({ animating: AnimationState.done, overlayAlpha: 0 })
  //       window.location.href = '/404'
  //     }
  //   }, 250)

  // }
}

export default Me;

const styles = {
  whiteOverlay: (state) => {
    if (state.animating === 1) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        opacity: state.overlayAlpha / 100,
      }
    } else {
      return { display: 'none' }
    }
  },
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
  lostContainer: (isMobile) => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '3vw',
      marginTop: isMobile ? '8.5vh' : '10vh',
    }
  },
  lost: {
    color: '#DF976C',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '4vw',
  },
  nameContainer: (isMobile) => {
    return {
      marginLeft: isMobile ? '4vw' : '5vw',
      marginTop: isMobile ? '25vh' : '31vh',
    }
  },
  name: {
    color: '#176EA8',
    fontFamily: "Andale Mono, AndaleMono, monospace",
    fontSize: '8vw',
  },
}
