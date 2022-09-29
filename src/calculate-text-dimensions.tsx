export function calculateTextDimensions(
  text: string,
  width: number
): { width: number; height: number } {
  var div = document.createElement("p");
  div.setAttribute(
    "style",
    `width: ${width}px; font-family: "Press Start 2P", Arial, sans-serif;`
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
