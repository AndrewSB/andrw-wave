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

const useSize = (target, shouldIgnore: (number) => boolean) => {
  const [size, setSize] = React.useState<DOMRectReadOnly | null>();

  React.useLayoutEffect(() => {
    const s = target.current.getBoundingClientRect();
    if (!shouldIgnore(s.height)) {
      setSize(s);
    }
  }, [target, shouldIgnore]);

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    const s = entry.contentRect;
    if (!shouldIgnore(s.height)) {
      setSize(s);
    } else {
      console.log("i");
    }
  });
  return size;
};

const PokemonDialogBox: React.FC<Props> = (props) => {
  const [boxState, setBoxState] = useState(0);

  const measureRef = React.useRef(null);
  const measureBoxIgnorePredicate = useCallback(() => false, []);
  const measureBoxSize = useSize(measureRef, measureBoxIgnorePredicate);

  const [typed, setTyped] = useState<any>(null);
  const dialogBoxRef = React.useRef(null);
  /// dialogBoxIgnorePredicate: this is a total hack to get around the fact that useResizeObserver fires before
  /// the dangerouslySetInnerHTML takes effect for the opacity 0 measurement div... i wonder if there's a
  /// a better way to do this. maybe i'll figure it out in 2023
  /// basically what's happening is the measurement div is still at a `?` sized width, then we switch the text in
  /// it, so it thinks it needs to be _super_ tall, then one render loop later we set the measurement div to the
  /// correct width
  /// i don't like that single render loop flash tho
  const dialogBoxIgnorePredicate = useCallback(
    () => measureBoxSize?.height === 128 && boxState === 1,
    [measureBoxSize, boxState]
  );
  const dialogBoxSize = useSize(dialogBoxRef, dialogBoxIgnorePredicate);

  console.log(dialogBoxSize, measureBoxSize, boxState);

  const [textDoneTyping, setTextDoneTyping] = useState(true);
  const [skipTypingCommand, setSkipTypingCommand] = useState(true);

  const handleDialogPress = useCallback(() => {
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
  }, [boxState, textDoneTyping, typed, props]);

  useEffect(() => {
    window.onkeydown = (event) => {
      if (event.code === "Space") {
        handleDialogPress();
      }
    };
  }, [handleDialogPress]);

  return (
    <React.Fragment>
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          opacity: 0,
          // background: "red",
          left: -2000,
          overflowWrap: "break-word",
          width: (dialogBoxSize?.width ?? 0) - 8,
          fontSize: 14,
          lineHeight: "16px",
          fontFamily: '"Press Start 2P", Arial, sans-serif',
        }}
        dangerouslySetInnerHTML={{ __html: dialogBoxState[boxState].node }}
      />
      <div
        onClick={handleDialogPress}
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
            height: ${(measureBoxSize?.height ?? 0) + 25}px;
            font-size: 14px;
            font-family: "Press Start 2P", Arial, sans-serif;
            border-radius: 2px;
            padding: 8px;
            overflow-wrap: break-word;
            line-height: 16px;
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
              margin-top: -4px;
              padding-top: 4px;
            }
          }
        `}</style>
      </div>
    </React.Fragment>
  );
};

export default PokemonDialogBox;
