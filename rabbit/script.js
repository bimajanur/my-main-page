const output = document.getElementById('ascii-output');
const img = document.getElementById('source-image');

// The "Rabbit Hole" character set
const charMap = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

function getAscii(brightness) {
    const index = Math.floor((brightness / 255) * (charMap.length - 1));
    return charMap[index];
}

function drawAscii() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 80;
    const height = 60;
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(img, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height).data;
    
    let asciiImage = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / 3;
            
            asciiImage += getAscii(brightness);
        }
        asciiImage += "\n";
    }
    
    output.textContent = asciiImage;
}

img.onload = drawAscii;