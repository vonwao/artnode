const directoryPath = '../../tinydinosassets/images/traits/16x16/background'; // specify your directory path

const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const outputJsPath = 'pixel_art_and_colors.js'; // specify your output JS file name

// Function to convert color to hex format
function colorToHex(color) {
    return '#' + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase();
}

// Function to process each image file
async function processImage(filePath) {
    const image = await Jimp.read(filePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    let colorSet = new Set();
    let asciiArt = [];
    let colorMap = {};
    let nextChar = 1; // start at 1 and go to F

    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            const color = Jimp.intToRGBA(image.getPixelColor(x, y));
            const hexColor = colorToHex(color);
            colorSet.add(hexColor);

            // Assign a character to the color if not already assigned
            if (!colorMap[hexColor]) {
                colorMap[hexColor] = nextChar.toString(16).toUpperCase();
                nextChar++;
                if (nextChar > 0xF) nextChar = 1; // reset to 1 if it exceeds F
            }

            row += colorMap[hexColor];
        }
        asciiArt.push(row);
    }

    return { 
        colors: Array.from(colorSet), 
        asciiArt: asciiArt.join('\n')
    };
}

// Function to loop through directory and process each image file
async function processDirectory() {
    const files = fs.readdirSync(directoryPath).filter(file => path.extname(file).toLowerCase() === '.png');
    let arts = {};
    let colorSets = {};

    for (let file of files) {
        const filePath = path.join(directoryPath, file);
        const result = await processImage(filePath);
        colorSets[file] = result.colors;
        arts[file] = `\`${result.asciiArt}\``;
    }

    const jsContent = `const pixelData = {\n  art: ${JSON.stringify(arts, null, 2)},\n  colors: ${JSON.stringify(colorSets, null, 2)}\n};\nmodule.exports = pixelData;`;
    fs.writeFileSync(outputJsPath, jsContent);
    console.log(`Art and color data written to ${outputJsPath}`);
}

processDirectory().catch(err => {
    console.error('Error:', err);
});
