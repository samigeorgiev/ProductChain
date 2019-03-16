var ProductChain = artifacts.require('./ProductChain.sol');

function strToHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return '0x' + hex;
}

contract('ProductChain', function(accounts) {
  it('should create products', function() {
    return ProductChain.deployed().then(function(contract) {
        return contract.addProduct('0x0122', strToHex('USA'), strToHex('SD Card'), strToHex('8GB'), 1234);
    });
  });

/*  it('should return info', function() {
      return ProductChain.deployed().then(function(contract) {
          return contract.getInformation(1234);
      }).then(function(result) {
          assert.isTrue(result[0].toString(16) === 'Kingston');
      });
  }); */
});
