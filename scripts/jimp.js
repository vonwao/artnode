const Jimp = require('jimp');

Jimp.read('path/to/your/image.png')
    .then(image => {
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const color = Jimp.intToRGBA(image.getPixelColor(x, y));
                console.log(`Pixel at (${x}, ${y}):`, color);
            }
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
