const Thief = require('color-thief');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const colorThief = new Thief;
const dir = './';

function componentToHex(c) {
  // Converts rgb values (0-255) into haxadecimal values
  var hex = c.toString(16);

  // If the transformation results in only one symbol (e.g.: a) it's gonna attach the value "0" to it (e.g.: "0a").
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Lists everything inside dir
fs.readdir(dir,(err, contents)=>{
	// Filter files accepted by lqip
	const images = contents.filter(content =>{
		return path.extname(content).toLowerCase() == '.jpg' ||
		       path.extname(content).toLowerCase() == '.png';
	})

	// Generates the palette for every single image file
	// and print it to stdout.
	images.forEach((image) => {
		const filePath = dir + image;

		// Returns the dominant color in the format [r,g,b].
		const dominantColorRGB = colorThief.getColor(filePath)

		// Turn [r,g,b,a] into #rgba.
		let dominantColorHEX = rgbToHex(dominantColorRGB[0],dominantColorRGB[1],dominantColorRGB[2])

		// Return file name without its extension.
		const fileName = image.split('.').shift().toString();

		console.log(fileName + ": " + dominantColorHEX)
		// Creates another image 1x1 with the dominant color.
		/*let newImage = new Jimp(1,1,dominantColorHEX,(err, image) => {})*/

		// Writes the new image to the current folder.
/*		newImage.write(fileName+'.png');*/
	});
});

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// Generate PNG image using node.js
// https://stackoverflow.com/questions/12380841/generate-png-image-using-node-js