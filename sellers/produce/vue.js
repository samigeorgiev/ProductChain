function composeJSON() {
	let obj = {}
	let form = document.getElementById('form');
	obj['name'] = form[0].value;
	obj['company'] = form[1].value;
	obj['origin'] = form[2].value;
    obj['description'] = form[3].value;
	console.log(obj);
}
