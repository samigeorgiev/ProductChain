new Vue({
	el: '#form',
	data: {
		notSubmitted: true,
		scan: false,

		company: "Company Name",
		company_default: "Company Name",

		productId: "Product ID",
		productId_default: "Product ID",
		passphrase: "Passphrase",
		passphrase_default: "Passphrase",
	},

	methods: {
		companyFocus: function() {
			this.company = '';
		},
		productFocus: function() {
			this.productId = '';
		},
		passphraseFocus: function() {
			this.passphrase = '';
		},

		companyFocusOut: function() {
			this.company = this.company_default;
		},
		productFocusOut: function() {
			this.productId = this.productId_default;
		},
		passphraseFocusOut: function() {
			this.passphrase = this.passphrase_default;
		},

		transfer: function() {
			composeJSON();
			composeQR();
			notSubmitted = false;
		}
	}

})

function composeJSON() {
	let obj = {}
	let productId = document.getElementById('productId').value;

	obj['productId'] = productId;
	obj['transactionId'] = Math.floor(Math.random() * 256);

	const passphrase = form[3].value;

	console.log(obj);
}

function qrCode() {
	var qrcode = new QRCode("qrcode");

	function makeCode() {
		var url = null
		qrcode.makeCode(url);
	}

	makeCode();
}

function strToHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

function hexToStr(hex) {
	hex  = hex.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}


var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
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
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
	video.srcObject = stream;
	video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
	video.play();
	requestAnimationFrame(tick);
});

function tick() {
	loadingMessage.innerText = "⌛ Loading video..."
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		loadingMessage.hidden = true;
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
			outputData.parentElement.hidden = false;
			outputData.innerText = code.data;
			canvasElement.hidden = true;
			return;
		} else {
			outputMessage.hidden = false;
			outputData.parentElement.hidden = true;
		}
	}
	requestAnimationFrame(tick);
}
