function composeJSON() {
	let obj = {}
	let form = document.getElementById('form');
	obj['seller'] = form[0].value;
	obj['buyer'] = form[1].value;
	obj['productId'] = form[2].value;
	// obj['transactionId'] = random
	console.log(obj);
}