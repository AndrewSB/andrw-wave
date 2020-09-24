export default function calculateTextDimensions(text: string, width: number): {width: number, height: number} {
  var classes = [];

  classes.push('textDimensionCalculation');

  var div = document.createElement('div');
  div.setAttribute('class', classes.join(' '));
  div.setAttribute('style', `width: ${width}px; font-family: "Press Start 2P", Arial, sans-serif;`)

  div.innerHTML = text;

  document.body.appendChild(div);

  const rect = div.getBoundingClientRect()

  var dimensions = {
    width : rect.width,
    height : rect.height
  };

  div.parentNode.removeChild(div);

  return dimensions;
};