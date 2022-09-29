import React, { useState, useEffect, useCallback } from "react";
import Typed from "react-typed";
import { calculateTextDimensions } from "../calculate-text-dimensions";
import useResizeObserver from "@react-hook/resize-observer";

interface Props {
  styles?: string;
  onNewText: (newText: string) => void;
  pushLostPage: () => void;
}

var dialogBoxState = [
  {
    // height: 30,
    node: "?",
  },
  {
    // height: 30,
    node: `
    here are some links to click:
    <span> </span>
    <a href='https://github.com/AndrewSB'>github</a>
    <span> </span>
    <a href='https://linkedin.com/in/ndrww'>linkedin</a>
    <span> </span>
  `,
  },
  {
    // height: 63,
    node: "if you've made it this far, I would love to get to know you. send an e-mail to <a href='mailto:asbreckenridge@me.com'>asbreckenridge@me.com</a> with an answer to “What's your favorite color?\"",
  },
  {
    // height: 44,
    node: "no one ever does this. i'd be soOoOo thrilled if you did :)",
  },
  {
    // height: 30,
    node: "<a>remember to make time to be lost</a>",
  },
];

/// ignoringValuesOfHeight: this is a total hack to get around the fact that useResizeObserver fires before
/// the dangerouslySetInnerHTML takes effect for the opacity 0 measurement div... i wonder if there's a
/// a better way to do this. maybe i'll figure it out in 2023
const useSize = (target, ignoringValuesOfHeight) => {
  const [size, setSize] = React.useState<DOMRectReadOnly | null>();

  React.useLayoutEffect(() => {
    const s = target.current.getBoundingClientRect();
    if (s.height !== ignoringValuesOfHeight) {
      setSize(s);
    }
  }, [target, ignoringValuesOfHeight]);

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    const s = entry.contentRect;
    if (s.height !== ignoringValuesOfHeight) {
      setSize(entry.contentRect);
    }
  });
  return size;
};

const PokemonDialogBox: React.FC<Props> = (props) => {
  const [boxState, setBoxState] = useState(0);

  const measureRef = React.useRef(null);
  const measureBoxSize = useSize(measureRef, 128);

  const [typed, setTyped] = useState<any>(null);
  const dialogBoxRef = React.useRef(null);
  const dialogBoxSize = useSize(dialogBoxRef, 128);

  console.log(dialogBoxSize?.width, measureBoxSize?.height);

  const [textDoneTyping, setTextDoneTyping] = useState(true);
  const [skipTypingCommand, setSkipTypingCommand] = useState(true);

  return (
    <React.Fragment>
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          opacity: 1,
          left: -2000,
          width: dialogBoxSize?.width ?? 1000,
          fontSize: 14,
          lineHeight: "16px",
          fontFamily: '"Press Start 2P", Arial, sans-serif',
        }}
        dangerouslySetInnerHTML={{ __html: dialogBoxState[boxState].node }}
      />
      <div
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
        className={"box " + (boxState == 0 ? "inactive" : "active")}
      >
        <div ref={dialogBoxRef} id="box-content" className="cursor-default">
          <Typed
            typedRef={(e) => setTyped(e)}
            preStringTyped={() => setTextDoneTyping(false)}
            onStringTyped={() => {
              setSkipTypingCommand(false);
              setTextDoneTyping(true);
            }}
            strings={[
              skipTypingCommand
                ? `\`${dialogBoxState[boxState].node}\``
                : dialogBoxState[boxState].node,
            ]}
            typeSpeed={5}
            showCursor={false}
          />
        </div>
        {textDoneTyping && <i />}
        <style jsx>{`
          .box {
            ${props.styles}
            height: ${(measureBoxSize?.height ?? 0) + 22}px;
            font-size: 14px;
            font-family: "Press Start 2P", Arial, sans-serif;
            border-radius: 2px;
            padding: 8px;
            line-height: 16px;
            margin: auto;
            background: white;
            border: 1px solid white;
            box-shadow: 0 1px 0 1px black, inset 0 1px 0 1px black,
              0 0 0 1px black, inset 0 0 0 1px black;
          }

          #box-content {
            padding-right: 10px;
          }

          .box.active {
            left: 22px;
          }

          .box > i {
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
    </React.Fragment>
  );
};

export default PokemonDialogBox;
