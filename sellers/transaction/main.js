function composeJSON() {
	let obj = {}
	let form = document.getElementById('form');
	obj['seller'] = form[0].value;
	obj['buyer'] = form[1].value;
	obj['productId'] = form[2].value;
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
