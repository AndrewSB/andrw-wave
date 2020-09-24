import React, { Component, useState, useEffect } from 'react';
import Typed from 'react-typed';
import calculateWordDimensions from '../calculate-text-dimensions';

interface Props {
  styles?: string,
  onNewText: (newText: string) => void,
  pushLostPage: () => void,
};

var dialogBoxState = [
  { height: 30, node: '?' },
  {
    height: 30, node: (`
    here are some links to click:
    <span> </span>
    <a href='https://github.com/AndrewSB'>github</a>
    <span> </span>
    <a href='https://linkedin.com/in/ndrww'>linkedin</a>
    <span> </span>
  `)
  },
  { height: 63, node: 'if you’ve made it this far, I would love to get to know you. send an e-mail to <a href=\'mailto:asbreckenridge@me.com\'>asbreckenridge@me.com</a> with an answer to \“What’s your favorite color?\"' },
  { height: 44, node: 'note: no one ever does this. I would be soOoOo thrilled if you did.' },
  { height: 30, node: '<a>remember to make time to be lost</a>' }
]

const PokemonDialogBox: React.FC<Props> = (props) => {
  const [boxState, setBoxState] = useState(0);
  const [boxHeight, setBoxHeight] = useState(18);

  const [typed, setTyped] = useState(undefined);

  const [textDoneTyping, setTextDoneTyping] = useState(true);
  const [skipTypingCommand, setSkipTypingCommand] = useState(true);

  useEffect(
    () => {
      const box = document.getElementById('box-content');
      const boxDimensions = calculateWordDimensions(dialogBoxState[boxState].node, box.getBoundingClientRect().width);
      setBoxHeight(boxDimensions.height)
    },
    [boxState]
  )

  return <div
    onClick={() => {
      if (!textDoneTyping) {
        typed.reset();
        setSkipTypingCommand(true);
      } else {
        const nextState = (boxState + 1) % dialogBoxState.length;
        if (nextState == 0) props.pushLostPage();
        else {
          setBoxState(nextState);
          props.onNewText(dialogBoxState[nextState].node);
          typed.reset();
        }
      }
    }}
    className={'box ' + (boxState == 0 ? 'inactive' : 'active')}>
    <div id='box-content'>
      <Typed
        typedRef={typed => setTyped(typed)}
        preStringTyped={() => setTextDoneTyping(false)}
        onStringTyped={() => {
          setSkipTypingCommand(false)
          setTextDoneTyping(true)
        }}
        strings={[skipTypingCommand ? `\`${dialogBoxState[boxState].node}\`` : dialogBoxState[boxState].node]}
        typeSpeed={9}
        showCursor={false} />
    </div>
    {textDoneTyping && <i />}
    <style jsx>{`
    .box {
      ${props.styles}
      height: ${boxHeight + 8}px;
      font-size: 14px;
      font-family: "Press Start 2P", Arial, sans-serif;
      border-radius: 2px;
      padding: 8px;
      line-height: 16px;
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
      animation: shake-vertical 1s ease-in-out infinite alternate;
      float: right;
    }

    @keyframes shake-vertical {
      from {
        margin-top: 0px;
        padding-top: 0px;
      }
      to {
        margin-top: -2px;
        padding-top: 2px;
      }
    }
  `}</style>
  </div>
}

export default PokemonDialogBox