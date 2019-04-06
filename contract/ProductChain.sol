pragma solidity >=0.4.0 <0.6.0;

contract ProductChain {

    enum ProductState {
        WITH_OWNER,
        PENDING_APPROVAL,
        SOLD
    }

    struct Company {
        bytes32 name;
        bytes32 origin;
        address addr;
    }

    struct Product {
        bool isExists;
        bytes32 name;
        bytes32 description;
        Company[] owners;
        ProductState state;
        uint txCode;
    }

    mapping(uint => Product) products;

    constructor() public {

    }
    
    modifier onlyProductOwner(uint id) {
        Product storage product = products[id];
        require(product.owners[product.owners.length - 1].addr == msg.sender, "Sender is not owner");
        _;
    }

    function createProduct(
        uint id,
        bytes32 name,
        bytes32 description,
        bytes32 producer,
        bytes32 origin
    )
        public
    {
        Product storage product = products[id];
        require(!product.isExists, "Product with this id exists");
        product.isExists = true;
        product.name = name;
        product.description = description;
        product.owners.push(Company({
                    name: producer,
                    origin: origin,
                    addr: msg.sender
        }));
        product.state = ProductState.WITH_OWNER;
    }
    
    function sellProduct(uint productId, uint txCode) public onlyProductOwner(productId) {
        Product storage product = products[productId];
        product.state = ProductState.PENDING_APPROVAL;
        product.txCode = txCode;
    }
    
    function buyProduct(uint productId, uint txCode, bytes32 buyer, bytes32 origin) public {
        Product storage product = products[productId];
        require(product.state == ProductState.PENDING_APPROVAL, "Product has owner or is sold");
        require(product.txCode == txCode, "Invalid tx Code");
        product.owners.push(Company({
            name: buyer,
            origin: origin,
            addr: msg.sender
        }));
        product.state = ProductState.WITH_OWNER;
    }
    
    function markAsSold(uint id) public onlyProductOwner(id) { products[id].state = ProductState.SOLD; }

    function getProductBasicInfo(uint id)
        public
        view
        returns (
            bytes32 name,
            bytes32 description,
            bool isSold,
            bytes32 producerName,
            address producerAddr,
            bytes32 origin
        )
    {
        Product storage product = products[id];
        name = product.name;
        description = product.description;
        isSold = (product.state == ProductState.SOLD);
        Company storage producer = product.owners[0];
        producerName = producer.name;
        producerAddr = producer.addr;
        origin = producer.origin;
    }
    
    function getOwnersInfo(uint id)
        public
        view
        returns (
            bytes32[5] memory ownersNames,
            bytes32[5] memory origins, // Cannot return dynamic array
            address[5] memory addresses
        )
    {
            Company[] storage owners = products[id].owners;
            for (uint i = 0; i < owners.length && i < 5; i++) {
                ownersNames[i] = owners[i].name;
                origins[i] = owners[i].origin;
                addresses[i] = owners[i].addr;
            }
    }
}