import art from "./art";
import { augmentObject } from "./augment-props";
import traits from "./traits";
import background from "./layers/background";
import dino from "./layers/dino";

// Utility function to merge all layers into a single object
// function mergeLayers(trait) {
//   const merged = {};
//   // Assuming each layer in 'trait' follows the structure { art, colors, offset }
//   Object.keys(trait).forEach(key => {
//     if (trait[key].art) {
//       merged[key] = {
//         art: trait[key].art,
//         colors: trait[key].colors || null,
//         offset: trait[key].offset || { x: 0, y: 0 }
//       };
//     }
//   });
//   return merged;
// }

function renderLayer(key, traitValue, layer) {
  console.log("RENDERING LAYER", key, traitValue, layer);
  if (!layer.art) {
    console.warn("2 No art provided for layer");
    return [];
  }
  if (!layer.art[traitValue]) {
    console.warn("No art provided for layer");
    return [];
  }

  let pixels = [];
  const offsetX = (layer.offset && layer.offset.x) || 0,
    offsetY = (layer.offset && layer.offset.y) || 0;

  // console.log("OFFSET", offsetX, offsetY);
  // console.log("ART", layer.art);
  const rows = layer.art[traitValue].trim().split("\n");
  rows.forEach((row, rowIndex) => {
    row = row.trim();
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "1") {
        const color = layer.colors
          ? layer.colors[rowIndex % layer.colors.length]
          : "#000000";
        pixels.push({ x: x + offsetX, y: rowIndex + offsetY, color });
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

function getObjectStructure(obj) {
  // Helper function to determine if a value is an object
  const isObject = (val) =>
    val && typeof val === "object" && !Array.isArray(val);

  // Recursive function to process each property
  function processObject(currentObj) {
    if (isObject(currentObj)) {
      const structure = {};
      for (const key in currentObj) {
        structure[key] = processObject(currentObj[key]);
      }
      return structure;
    } else {
      return null; // Replace leaf values with null or any desired placeholder
    }
  }

  return processObject(obj);
}

export function render(tokenId) {
  let trait = traits.find((trait) => trait.tokenId === tokenId);
  trait = augmentObject(trait);

  // Merge all layers
  const allLayers = { ...background, ...dino };

  const struct = getObjectStructure(allLayers);
  console.log("Object Structure:", struct); // Sanity check
  
  //   const mergedLayers = mergeLayers();
  console.log("Merged Layers:", Object.keys(allLayers)); // Sanity check

  // Render each layer
  const pixelSets = Object.keys(allLayers).map((key) => {
    const layer = allLayers[key];
    const traitValue = trait[key]; // Get the trait value corresponding to the layer key
    return renderLayer(key, traitValue, layer);
  });

  console.log("Pixel Sets:", pixelSets); // Sanity check
  return [trait, generateSvgFromPixels(pixelSets)];
}
