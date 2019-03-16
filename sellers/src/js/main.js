function composeJSON() {
	let obj = {}
	let form = document.getElementById('form');
	for (var i = 0; i < 3; i++) {
		obj[form[i].id] = strToHex(form[i].value);
	}
	console.log(form.length);
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
