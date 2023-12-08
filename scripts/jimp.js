const directoryPath = '../../tinydinosassets/images/traits/16x16/background'; // specify your directory path

const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const outputFilePath = 'output.json'; // specify your output file name

// Function to convert color to hex format
function colorToHex(color) {
    return '#' + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase();
}

// Function to get luminance of a color
function getLuminance(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Function to process each image file
async function processImage(filePath) {
    const image = await Jimp.read(filePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    let colorSet = new Set();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = Jimp.intToRGBA(image.getPixelColor(x, y));
            const hexColor = colorToHex(color);
            colorSet.add(hexColor);
        }
    }

    let colors = Array.from(colorSet);

    // Sort colors by luminance (from dark to light)
    colors.sort((a, b) => getLuminance(a) - getLuminance(b));

    // Optionally find the darkest and lightest colors
    const darkest = colors[0];
    const lightest = colors[colors.length - 1];

    return { colors, darkest, lightest };
}

// Function to loop through directory and process each image file
async function processDirectory() {
    const files = fs.readdirSync(directoryPath).filter(file => path.extname(file).toLowerCase() === '.png');
    let result = {};

    for (let file of files) {
        const filePath = path.join(directoryPath, file);
        result[file] = await processImage(filePath);
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
    console.log(`Color data written to ${outputFilePath}`);
}

processDirectory().catch(err => {
    console.error('Error:', err);
});
