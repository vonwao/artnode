import { augmentObject } from "./augment-props";
import traits from "./traits";
import background from "./layers/background";
import dino from "./layers/dino";
import head from "./layers/head";
import feet from "./layers/feet";
import eyes from "./layers/eyes";
import face from "./layers/face";
import hands from "./layers/hands";

// layer schema
// mote string in colors is a hex color
// layers = {
//   [layer_key] : {
//       art: {[trait_value]: string}
//       colors: {[trait_value]: [string]}
//       offset: [number, number]
//   }
// }

function renderLayer(key, traitValue, layer) {
  // console.log("RENDERING LAYER", key, traitValue, layer);

  const art = layer.art && (layer.art[traitValue] || layer.art.default);
  if (!art) {
    console.warn(`No art provided for layer: ${key}, trait: ${traitValue}`);
    return [];
  }

  let pixels = [];
  const offsetX = layer.offset ? layer.offset[0] - 1 : 0,
    offsetY = layer.offset ? layer.offset[1] - 1 : 0;

  const rows = art.trim().split("\n");
  rows.forEach((row, rowIndex) => {
    row = row.trim();
    for (let x = 0; x < row.length; x++) {
      const char = row[x].toLowerCase();
      if (char >= "1" && char <= "f") {
        const colorIndex = parseInt(char, 16) - 1; // Convert hex to array index
        const colorArray =
          layer.colors && layer.colors[traitValue]
            ? layer.colors[traitValue]
            : ["#000000"];
        const color = colorArray[colorIndex];
        pixels.push({ x: x + offsetX, y: rowIndex + offsetY, color });
        // console.log(
        //   `Pixel: (${x + offsetX}, ${rowIndex + offsetY}), Color: ${color}`
        // ); // Debug statement
      }
    }
  });

  return pixels;
}

function generateSvgFromPixels(pixelSets, pixelSize = 20) {
  const svgWidth = 16 * pixelSize;
  const svgHeight = 16 * pixelSize;

  const svgLayers = pixelSets
    .map((pixels) =>
      pixels
        .map(
          (pixel) =>
            `<rect x="${pixel.x * pixelSize}" y="${
              pixel.y * pixelSize
            }" width="${pixelSize}" height="${pixelSize}" fill="${
              pixel.color
            }" />`
        )
        .join("")
    )
    .join("");

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgLayers}</svg>`;
}

function normalizeLayers(layers) {
  const normalized = {};
  Object.keys(layers).forEach((layerKey) => {
    const layer = layers[layerKey];

    // Normalize 'art'
    normalized[layerKey] = {
      ...layer,
      art: typeof layer.art === "string" ? { default: layer.art } : layer.art,
    };

    // Normalize 'colors'
    normalized[layerKey].colors = {};
    console.log("Layer Colors:", layer.colors); // Sanity check
    Object.keys(layer.colors).forEach((traitKey) => {
      const colorValue = layer.colors[traitKey];
      // If the color value is a string, convert it to an array
      normalized[layerKey].colors[traitKey] =
        typeof colorValue === "string" ? [colorValue] : colorValue;
    });
  });
  return normalized;
}

export function render(tokenId) {
  let trait = traits.find((trait) => trait.tokenId === tokenId);
  trait = augmentObject(trait);

  // Merge all layers
  let allLayers = {
    ...background,
    ...dino,
    ...head,
    ...eyes,
    ...face,
    ...hands,
    ...feet,
  };
  allLayers = normalizeLayers(allLayers);
  console.log("Merged Layers:", Object.keys(allLayers)); // Sanity check

  // Render each layer
  const pixelSets = Object.keys(allLayers).map((key) => {
    const layer = allLayers[key];
    const traitValue = trait[key]; // Get the trait value corresponding to the layer key
    return renderLayer(key, traitValue, layer);
  });

  return [trait, generateSvgFromPixels(pixelSets)];
}
