import { pressStart2P } from "./fonts";

export function calculateTextDimensions(
  text: string,
  width: number
): { width: number; height: number } {
  var div = document.createElement("p");
  div.setAttribute(
    "style",
    `width: ${width}px; font-family: ${pressStart2P.style.fontFamily};`
  );

  div.innerHTML = text;

  document.body.appendChild(div);

  const rect = div.offsetHeight;
  console.log(rect);
  var dimensions = {
    width: 0,
    height: rect,
  };

  div.parentNode.removeChild(div);

  return dimensions;
}
