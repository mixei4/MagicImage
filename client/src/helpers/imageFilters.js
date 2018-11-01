const grayscalePixels = (pix) => {
	for (var i = 0, n = pix.length; i < n; i += 4) {
		var grayscale = pix[i] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
		pix[i] = grayscale;
		pix[i+1] = grayscale;
		pix[i+2] = grayscale;
	}
};

const sepiaPixels = (pix) => {
	for (var i = 0, n = pix.length; i < n; i += 4) {
		var r = pix[i] * 0.393 + pix[i+1] * 0.769 + pix[i+2] * 0.189;
		var g = pix[i] * 0.349 + pix[i+1] * 0.686 + pix[i+2] * 0.168;
		var b = pix[i] * 0.272 + pix[i+1] * 0.534 + pix[i+2] * 0.131;
		pix[i] = r;
		pix[i+1] = g;
		pix[i+2] = b;
	}
};

const getFilteredImage = (image, filter) => {
	return new Promise((resolve) => {
		var canvasTemp = document.createElement('canvas');
		canvasTemp.width = image.width;
		canvasTemp.height = image.height;
		canvasTemp.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
		var imageData = canvasTemp.getContext('2d').getImageData(0, 0, image.width, image.height);
		var pix = imageData.data;
		filter(pix);
		canvasTemp.getContext('2d').putImageData(imageData, 0, 0);
		var result = new Image();
		result.src = canvasTemp.toDataURL('image/png');
		result.onload = () => {resolve(result);};
	});
};

export {grayscalePixels, sepiaPixels, getFilteredImage};