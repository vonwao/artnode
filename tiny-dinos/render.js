// utils/render.js
import art from './art';
import { augmentObject } from './augment-props';
import { colorDefs } from './color-def';
import colorMappings from './colors';
import traits from './traits'
import bgDef from './def-bg'

function applyColorMappingComplex(category, key, mapping) {
  let asciiArt = art[category][key];
  if (!asciiArt) {
    console.log(`No ascii art found: ${category} ${key}`);
    return []; // Return empty array if no ascii art (e.g. for empty traits
  }
  // console.log(`Applying color mapping for: ${category} ${key}`);
  // console.log('MAPPING', mapping);
  // console.log('ASCII ART', asciiArt);
  return applyColorMapping(asciiArt, mapping);
}

function renderBackground(backgroundKey, colorMapping) {
  const asciiArt = bgDef.art[backgroundKey];
  if (!asciiArt) {
    console.warn('No background art found for:', backgroundKey);
    return [];
  }
  return applyColorMapping(asciiArt, colorMapping, false, true);
}

function applyColorMapping(asciiArt, mapping, useColorDefs = false, colorMapOffset = false) {
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
          offsetX = parseInt(args[0]) - 1;
          offsetY = parseInt(args[1]) - 1;
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
        let color;
        if (useColorDefs) {
          // this next line is not reusable because it's specific to the dino
          let key = char === 'D' ? 'body'
            : char === 'o' ? 'eyes'
              : char === 's' ? 'spike' :
                char === 'b' ? 'chest' : char;
          console.log('mapping[char]', mapping[char]);
          if (colorMapOffset) {
            console.log('Color Map Offset:', colorMapOffset);
            color = colorDefs[key] && colorDefs[key][mapping[char-1]] || mapping[char] || '#000000';
          } else {
            color = colorDefs[key] && colorDefs[key][mapping[char]] || mapping[char] || '#000000';
          }
          color = mapping[char] || '#000000'; // Default to black if no mapping
        }
        pixels.push({ x: x + offsetX, y: offsetY, color: color });
      }
    }
    offsetY++;
  });

  // console.log(`Total Pixels: ${pixels.length}`);
  // console.log(`Total Rows: ${rows.length}`);
  // console.log(`Max Columns (Max Row Length): ${maxRowLength}`);

  return pixels;
}

let errOne = true;
function errorOnce(message) {
  if (errOne) console.error(message);
  else errOne = false;
}

function generateSvgFromPixels(pixelSets, backgroundColor, pixelSize = 20) {
  const svgWidth = 16 * pixelSize;
  const svgHeight = 16 * pixelSize;

  const svgLayers = pixelSets.map((pixels, index) => {
    if (!pixels || pixels.length === 0) {
      console.warn(`Empty or undefined pixel set at index ${index}`);
      return '';
    }

    const layer = pixels.map(pixel => {
      if (typeof pixel.x !== 'number' || typeof pixel.y !== 'number' || typeof pixel.color !== 'string') {
        errorOnce('Invalid pixel data:', pixel);
        return '';
      }
      return `<rect x="${pixel.x * pixelSize}" y="${pixel.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}" />`;
    }).join('');

    // console.log(`Layer ${index}:`, layer);
    return layer;
  });

  const svgElements = svgLayers.map(layer => `<g>${layer}</g>`).join('');
  const finalSvg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor}"></rect>
  ${svgElements}
  </svg>`;
  // console.log('Final SVG:', finalSvg);

  return finalSvg;
}

export function render(tokenId) {
  let trait = traits.find(trait => trait.tokenId === tokenId);
  trait = augmentObject(trait)
  console.log('Trait:', trait);
  const backgroundArtKey = trait['background'] + ".png";
  const backgroundPixels = renderBackground(backgroundArtKey, bgDef.colors[backgroundArtKey]);
  // const bg = applyColorMapping(art.bg.gradient, colorMappings.gradient)


  const dino = applyColorMapping(art.dino.main, colorMappings.dino(trait), true);
  const eyes = applyColorMapping(art.eyes.main, colorMappings.eyes(trait), true);
  // const eyes = applyColorMappingComplex("eyes", trait.eyes, colorMappings.default)
  const face = applyColorMappingComplex("face", trait.face, colorMappings.default)
  // const hands = applyColorMappingComplex("hands", trait.hands, colorMappings.default)
  // const feet = applyColorMappingComplex("feet", trait.feet, colorMappings.default)
  // const head = applyColorMappingComplex("head", trait['head'], colorMappings.default)
  // // todo: add a tiny function that just takes away the gradient from the 
  // // const bg2 = trait['background-color'] && colorDefs.background[trait['background-color']] || '#000000'
  // return [trait, generateSvgFromPixels([backgroundPixels, dino, eyes, face, head, hands, feet])];

  return [trait, generateSvgFromPixels([backgroundPixels])];
}
