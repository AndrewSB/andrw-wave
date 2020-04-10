import React, { Component, useState, useEffect } from 'react';

interface Props {
  styles?: string,
  pushLostPage: () => void,
};

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
  {height: 30, node: <><a>remember to make time to be lost</a></>}
]

const PokemonDialogBox: React.FC<Props> = (props) => {
  const [boxState, setBoxState] = useState(0);
  const [height, setHeight] = useState(16);
  useEffect(
    () => setHeight(document.getElementById('box-content').getBoundingClientRect().height),
    [boxState]
  )

  return <div
    onClick={() => {
      const nextState = (boxState + 1) % dialogBoxState.length;
      if (nextState == 0) props.pushLostPage();
      else setBoxState(nextState);
    }}
    className={'box ' + (boxState == 0 ? 'inactive' : 'active')}>
      <div id='box-content'>{dialogBoxState[boxState].node}</div>
      <i />
  <style jsx>{`
    .box {
      ${props.styles}
      font-size: 14px;
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
  </div>
}

export default PokemonDialogBox