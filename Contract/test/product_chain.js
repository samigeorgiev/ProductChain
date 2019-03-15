var ProductChain = artifacts.require("./ProductChain.sol");

contract('ProductChain', function(accounts) {
  it("should create products", function() {
    return ProductChain.deployed().then(function(contract) {
        return contract.addProduct("Sami", "Sofia", "Person", "No", 1234);
    });
  });

  it("should return info", function() {
      return ProductChain.deployed().then(function(contract) {
          return contract.getInformation();
      }).then(function(result) {
          assert.isTrue(result === "Sami");
      });
  });
});
