const directoryPath = "../../tiny-dragon-assets/green/"; // specify your directory path

const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const outputJsPath = "pixel_art_and_colors_new.js"; // specify your output JS file name

// Function to convert color to hex format
function colorToHex(color) {
  return (
    "#" +
    ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

// Function to process each image file
async function processImage(filePath) {
  const image = await Jimp.read(filePath);
  const totalSquares = 16; // Total number of squares per row/column
  const squareWidth = Math.floor(image.bitmap.width / totalSquares);
  const squareHeight = Math.floor(image.bitmap.height / totalSquares);
  let colorSet = new Set();
  let asciiArt = [];
  let colorMap = {};
  let nextChar = 1;

  for (let y = 0; y < totalSquares; y++) {
    let row = "";
    for (let x = 0; x < totalSquares; x++) {
      const sampleX = x * squareWidth + Math.floor(squareWidth / 2);
      const sampleY = y * squareHeight + Math.floor(squareHeight / 2);
      const color = Jimp.intToRGBA(image.getPixelColor(sampleX, sampleY));
      const hexColor = colorToHex(color);
      colorSet.add(hexColor);

      if (!colorMap[hexColor]) {
        colorMap[hexColor] = nextChar.toString(16).toUpperCase();
        nextChar++;
        if (nextChar > 0xf) nextChar = 1;
      }

      row += colorMap[hexColor];
    }
    asciiArt.push(row);
  }

  return {
    colors: Array.from(colorSet),
    asciiArt: asciiArt.join("\n"),
  };
}

// Function to loop through directory and process each image file
async function processDirectory() {
  const files = fs
    .readdirSync(directoryPath)
    .filter((file) => path.extname(file).toLowerCase() === ".png");
  let arts = {};
  let colorSets = {};

  for (let file of files) {
    const filePath = path.join(directoryPath, file);
    const result = await processImage(filePath);
    const name = file.replace(".png", "");
    colorSets[name] = result.colors;
    arts[name] = result.asciiArt;
  }

  const jsContent = `export default ({\n art: ${JSON.stringify(
    arts,
    null,
    2
  )},\n colors: ${JSON.stringify(colorSets, null, 2)}\n});`;
  fs.writeFileSync(outputJsPath, jsContent);
  console.log(`Art and color data written to ${outputJsPath}`);
}

processDirectory().catch((err) => {
  console.error("Error:", err);
});
