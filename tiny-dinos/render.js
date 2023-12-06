// utils/render.js
import art from './art';
import colorMappings from './colors';
import traits from './traits'

function applyColorMapping(asciiArt, mapping) {
  if (!asciiArt) {
    console.warn('No ascii art found!');
    return []; // Return empty array if no ascii art (e.g. for empty traits
  }

  let pixels = [];
  let offsetX = 0, offsetY = 0;
  let maxRowLength = 0;

  const rows = asciiArt.trim().split('\n');
  rows.forEach(row => {
    row = row.trim(); // Trim whitespace from each row
    if (row.startsWith('/')) {
      // Process directives
      const [directive, ...args] = row.split(' ');
      switch (directive) {
        case '/start':
          offsetX = parseInt(args[0]);
          offsetY = parseInt(args[1]);
          break;
          case '/row':
            repeatColor = mapping[args[1]] || null;
            x += directive.length; // Skip directive length
            break;
        default:
          console.warn(`Unknown directive: ${directive}`);
      }
      return; // Skip the rest of the loop for directive rows
    }

    maxRowLength = Math.max(maxRowLength, row.length);
    for (let x = 0; x < row.length; x++) {
      let char = row[x];
      if (char !== '.') {
        const color = mapping[char] || '#000000'; // Default to black if no mapping
        pixels.push({ x: x + offsetX, y: offsetY, color: color });
      }
    }
    offsetY++;
  });

  console.log(`Total Pixels: ${pixels.length}`);
  console.log(`Total Rows: ${rows.length}`);
  console.log(`Max Columns (Max Row Length): ${maxRowLength}`);

  return pixels;
}

function generateSvgFromPixels(pixelSets, pixelSize = 10) {
  const svgWidth = 16 * pixelSize;
  const svgHeight = 16 * pixelSize;

  const svgLayers = pixelSets.map(pixels => {
    return pixels.map(pixel => {
      return `<rect x="${pixel.x * pixelSize}" y="${pixel.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}" />`;
    }).join('');
  });

  const svgElements = svgLayers.map(layer => `<g>${layer}</g>`).join('');
  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgElements}</svg>`;
}

export function render(tokenId) {
  const trait = traits.find(trait => trait.tokenId === tokenId);
  console.log('Trait:', trait);

  // const asciiArt = art[tokenId]; // Assuming art is indexed by tokenId
  // const colorMapping = colorMappings[tokenId]; // Assuming mappings indexed by tokenId

  console.log('Face:', art.face[trait.face]);

  const bg = applyColorMapping(art.bg.gradient, colorMappings.gradient)
  const dino = applyColorMapping(art.dino.main, colorMappings.dino(trait));
  const eyes = applyColorMapping(art.eyes[trait.eyes], colorMappings.default)
  const face = applyColorMapping(art.face[trait.face], colorMappings.default)
  return generateSvgFromPixels([bg, dino, face]);
}
