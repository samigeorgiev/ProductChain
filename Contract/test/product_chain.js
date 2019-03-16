var ProductChain = artifacts.require('./ProductChain.sol');

function strToHex(str) { return parseInt(str.replace(/^#/, ''), 16); }

contract('ProductChain', function(accounts) {
  it('should create products', function() {
    return ProductChain.deployed().then(function(contract) {
        return contract.addProduct(strToHex('Kingston'), strToHex('USA'), strToHex('SD Card'), strToHex('8GB'), 1234);
    });
  });

  it('should return info', function() {
      return ProductChain.deployed().then(function(contract) {
          return contract.getInformation(1234);
      }).then(function(result) {
          assert.isTrue(result[0].toString(16) === 'Kingston');
      });
  });
});
