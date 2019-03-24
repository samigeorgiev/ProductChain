var ProductChain = artifacts.require('./ProductChain.sol');

function strToHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return '0x' + hex;
}

function hexToStr(hex) {
	hex  = hex.toString();
    hex = hex.split('').slice(2).join('');
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
        var ch = String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        if (ch == '0') { break; }
        str += ch;
	}
	return str;
}

contract('ProductChain', function(accounts) {
  it('should create products', function() {
    return ProductChain.deployed().then(function(contract) {
        return contract.addProduct(strToHex('Kingston'), strToHex('USA'), strToHex('SD Card'), strToHex('8GB'), 1234, { from: accounts[0] });
    });
  });

  it('should return info', function() {
      return ProductChain.deployed().then(function(contract) {
          return contract.getInformation(1234);
      }).then(function(result) {
          assert.isTrue(result[4]);
      });
  });
});
