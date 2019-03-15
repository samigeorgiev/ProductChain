pragma solidity ^0.5.0;

contract ProductChain {

    struct Company {
        string name;
        string origin;
        address p_key;
    }

    struct Transaction {
        Company seller;
        Company buyer;
        uint datastamp;
        uint8 id;
    }

    struct Product {
        string name;
        string description;
        uint32 id;
    }

    mapping (uint32 => Product) products;
    mapping (uint32 => Transaction[10]) transactions;

    constructor() public {

    }

    function addProduct(string memory c_name, string memory c_origin, string memory pr_name, string memory pr_descr, uint32 pr_id) public {

        Company memory cmp;
        Transaction memory tr;
        Product memory pr;

        cmp.name = c_name;
        cmp.origin = c_origin;
        cmp.p_key = msg.sender;

        pr.name = pr_name;
        pr.description = pr_descr;
        pr.id = pr_id;

        tr.buyer = cmp;
        tr.datastamp = now;
        tr.id = 0;

        products[pr_id] = pr;
        transactions[pr_id][0] = tr;
    }

//     function buyProduct(uint32 pr_id, uint8 tr_id) public {
//
//         Product storage pr = products[pr_id];
//         Company storage seller = pr.transactions[pr.transactions.length - 1].buyer;
//         require(msg.sender == seller.p_key);
//
//         Transaction memory tr;
//         tr.seller = seller;
//         tr.id = tr_id;
//
//         pr.transactions[pr.transactions.length] = tr;
//     }
}
