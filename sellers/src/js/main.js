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
