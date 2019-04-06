import "remix_tests.sol";
import "./ProductChain.sol";

contract Test1 {
    
    ProductChain inst;
    address productOwner;
    
    function beforeAll() public {
        inst = new ProductChain();
        productOwner = address(this);
        createProduct();
    }
    
    function checkBasicInfo() public {
        (bytes32 name, , bool isSold, bytes32 producerName, address producerAddr,) = inst.getProductBasicInfo(1122);
        
        Assert.equal(name, "0x01", "Name should be 0x01");
        Assert.equal(producerName, "0x03", "producerName should be 0x03");
        Assert.equal(producerAddr, productOwner, "Product Owner should be the contract");
        Assert.ok(!isSold, "Product should not be sold");
    }
    
    function checkOwnersInfo() public {
        inst.sellProduct(1122, 1122);
        inst.buyProduct(1122, 1122, "0x05", "0x06");
        
        (bytes32[5] memory owners, ,address[5] memory addresses) = inst.getOwnersInfo(1122);
        
        Assert.equal(owners[1], "0x05", "New owner should be 0x05");
        Assert.equal(addresses[1], productOwner, "New addres of the owner should be the same");
    }
    
    function checkIsSold() public {
        inst.markAsSold(1122);
        
        (, , bool isSold, , ,) = inst.getProductBasicInfo(1122);
        
        Assert.ok(isSold, "Product should be sold");
    }
    
    function createProduct() private { inst.createProduct(1122, "0x01", "0x02", "0x03", "0x04"); }
}