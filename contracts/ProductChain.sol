pragma solidity ^0.5.0;


contract ProductChain {

    struct Company {
        string name;
        string origin;
        address addr;
    }

    enum ProductState {
        WITH_OWNER,
        PENDING_APPROVAL,
        SOLD
    }

    struct Product {
        string name;
        string description;
        Company[] owners;
        ProductState state;
    }

    mapping(uint => Product) products;

    constructor() public {

    }
}
