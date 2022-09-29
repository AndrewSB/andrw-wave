import React from "react";

interface Props {
  className?: string;
  customStyle?: string;
  showingWidth: number;
  children: React.ReactNode;
}

const FakePhonePanel: React.FC<Props> = (props) => {
  let className = props.className ?? "fake-phone-panel";

  return (
    <div className={className}>
      <div className="fake-phone-panel-inner">{props.children}</div>

      <style jsx>{`
        .${className} {
          ${props.customStyle}
        }

        .fake-phone-panel-inner {
          width: 100%;
          height: 100%;
        }

        @media (min-width: ${props.showingWidth}px) {
          .${className} {
            padding-bottom: 2vh;
            padding-top: 2vh;
          }

          .fake-phone-panel-inner {
            margin: auto;
            width: 500px;
            border-radius: 10px;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default FakePhonePanel;
