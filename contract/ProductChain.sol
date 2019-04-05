pragma solidity ^0.5.0;

contract ProductChain {

    enum ProductState {
        WITH_OWNER,
        PENDING_APPROVAL,
        SOLD
    }

    struct Company {
        string name;
        string origin;
        address addr;
    }

    struct Product {
        bool isExists;
        string name;
        string description;
        Company[] owners;
        ProductState state;
        uint txCode;
    }

    mapping(uint => Product) products;

    constructor() public {

    }

    function createProduct(
        uint id,
        string memory name,
        string memory description,
        string memory producer,
        string memory origin
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
    
    function sellProduct(uint productId, uint txCode) public {
        Product storage product = products[productId];
        require(product.owners[product.owners.length - 1].addr == msg.sender, "Sender is not owner");
        product.state = ProductState.PENDING_APPROVAL;
        product.txCode = txCode;
    }
    
    function buyProduct(uint productId, uint txCode, string memory buyer, string memory origin) public {
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
    
    function markAsSold(uint id) public {
        Product storage product = products[id];
        require(product.owners[product.owners.length - 1].addr == msg.sender, "Sender is not owner");
        product.state = ProductState.SOLD;
    }

    function getProducerInfo(uint id)
        public
        view
        returns (
            string memory name,
            string memory description,
            bool isSold,
            string memory producerName,
            address producerAddr,
            string memory origin
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
            bytes32[5] memory origins,
            address[5] memory addresses
        )
    {
            Company[] storage owners = products[id].owners;
            for (uint i = 0; i < 5; i++) {
                ownersNames[i] = string2bytes32(owners[i].name);
                origins[i] = string2bytes32(owners[i].origin);
                addresses[i] = owners[i].addr;
            }
    }
    
    function string2bytes32(string memory str) private returns (bytes32 memory res) {
        bytes memory tmp = bytes(str);
        for (uint i = 0; i < tmp.length; i++) {
            res[i] = tmp[i];
        }
    }

}
