// render.js
import art from './art.js';
import colors from './colors.js';

function applyColorMapping(asciiArt, mapping) {
  let pixels = [];
  const rows = asciiArt.split('\n');
  
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (mapping[char]) {
        pixels.push({ x, y, color: mapping[char] });
      }
    }
  }
  return pixels;
}

function generateSvgFromPixels(pixels, pixelSize = 10) {
  const svgElements = pixels.map(pixel => {
    return `<rect x="${pixel.x * pixelSize}" y="${pixel.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}" />`;
  }).join('');

  const svgWidth = Math.max(...pixels.map(p => p.x)) * pixelSize + pixelSize;
  const svgHeight = Math.max(...pixels.map(p => p.y)) * pixelSize + pixelSize;

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgElements}</svg>`;
}

export function render(tokenId) {
  // Example usage, adjust according to your needs:
  const gradientPixels = applyColorMapping(art.dino.main, colors.dino);
  return generateSvgFromPixels(gradientPixels);
}
