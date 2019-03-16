let root = new Vue({
	el: '#form',
	data: {
		scan: true,
		company: "Company Name",
		company_default: "Company Name",
		origin: "Origin",
		origin_default: "Origin",
	},
	methods: {
		companyFocus: function() {
			this.company = '';
		},
		originFocus: function() {
			this.origin = '';
		},

		companyFocusOut: function() {
			this.company = this.company_default;
		},
		originFocusOut: function() {
			this.origin = this.origin_default;
		},

		transfer: function() {
			obj['company'] = document.getElementById('company').value;
			obj['origin'] = document.getElementById('origin').value;
			console.log(obj);
			// Samkata's functions!
		}

	}

})


var obj = {}
function composeJSON(prodId) {
	if (prodId == null) {
		let productId = document.getElementById('productId').value;
		document.getElementById('text-entry').hidden = true;
		prodId = productId;
	}

	document.getElementById('navigator').hidden = true;

	obj['productId'] = prodId;
	obj['transactionId'] = Math.floor(Math.random() * 256);

	let code = obj['productId'] + '.' + obj['transactionId'];

	console.log(code);

	makeQrCode(code);

	console.log(obj);

	sellProduct(obj.productId, obj.transactionId);
}

function setTransfer(code) {
	let ids = code.split('.');
	obj['productId'] = ids[0];
	obj['transactionId'] = ids[1];
	root.scan = false;
}

function strToHex(str) {
	var hex = '';
	for (var i = 0; i < str.length; i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

function hexToStr(hex) {
	hex = hex.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}


var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(begin, end, color) {
	canvas.beginPath();
	canvas.moveTo(begin.x, begin.y);
	canvas.lineTo(end.x, end.y);
	canvas.lineWidth = 4;
	canvas.strokeStyle = color;
	canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({
	video: {
		facingMode: "environment"
	}
}).then(function(stream) {
	video.srcObject = stream;
	video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
	video.play();
	requestAnimationFrame(tick);
});

function tick() {
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		canvasElement.hidden = false;
		outputContainer.hidden = false;

		canvasElement.height = video.videoHeight;
		canvasElement.width = video.videoWidth;
		canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
		var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
		var code = jsQR(imageData.data, imageData.width, imageData.height, {
			inversionAttempts: "dontInvert",
		});
		if (code) {
			drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
			drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
			drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
			drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
			outputMessage.hidden = true;
			canvasElement.hidden = true;
			setTransfer(code.data);
			return;
		} else {
			outputMessage.hidden = false;
		}
	}
	requestAnimationFrame(tick);
}
