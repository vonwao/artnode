// utils/render.js
import art from './art';
import colorMappings from './colors';

function applyColorMapping(asciiArt, mapping) {
  let pixels = [];
  let currentX = 0, currentY = 0;
  let maxRowLength = 0; // Track the maximum row length

  const rows = asciiArt.trim().split('\n');
  rows.forEach(row => {
    let repeatColor = null;
    maxRowLength = Math.max(maxRowLength, row.length);

    for (let x = 0; x < row.length; x++) {
      let char = row[x];

      // Handle special directives
      if (char === '/') {
        const directive = row.substring(x).split(' ')[0];
        const args = directive.split(' ');

        switch (args[0]) {
          case '/start':
            currentX = parseInt(args[1]);
            currentY = parseInt(args[2]);
            x += directive.length; // Skip directive length
            break;
          case '/row':
            repeatColor = mapping[args[1]] || null;
            x += directive.length; // Skip directive length
            break;
          default:
            console.warn(`Unknown directive: ${directive}`);
            break;
        }
        continue;
      }

      // Handle color or transparency
      if (char !== '.') {
        const color = mapping[char] || '#000000'; // Default to black if no mapping
        pixels.push({ x: currentX, y: currentY, color: color });
      } else if (repeatColor) {
        pixels.push({ x: currentX, y: currentY, color: repeatColor });
      }

      currentX++;
    }

    currentY++;
    currentX = 0; // Reset X for new row
  });

  // Log statistics
  console.log(`Total Pixels: ${pixels.length}`);
  console.log(`Total Rows: ${rows.length}`);
  console.log(`Max Columns (Max Row Length): ${maxRowLength}`);

  return pixels;

}

function generateSvgFromPixels(pixels, pixelSize = 10) {
  const svgWidth = 16 * pixelSize;
  const svgHeight = 16 * pixelSize;

  const svgElements = pixels.map(pixel => {
    return `<rect x="${pixel.x * pixelSize}" y="${pixel.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}" />`;
  }).join('');

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgElements}</svg>`;
}

export function render(tokenId) {
  // const asciiArt = art[tokenId]; // Assuming art is indexed by tokenId
  // const colorMapping = colorMappings[tokenId]; // Assuming mappings indexed by tokenId
  const pixels = applyColorMapping(art.dino.main, colorMappings.dino);
  return generateSvgFromPixels(pixels);
}
