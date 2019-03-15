pragma solidity ^0.5.0;

contract ProductChain {

    struct Company {
        bytes32 name;
        bytes32 origin;
        address p_key;
    }

    struct Transaction {
        Company seller;
        Company buyer;
        uint datastamp;
        uint32 id;
    }

    struct Product {
        bytes32 name;
        bytes32 description;
        uint32 id;
        uint32 transactions_count;
    }

    mapping (uint32 => Product) products;
    mapping (uint32 => Transaction[10]) transactions;

    constructor() public {

    }

    function addProduct(bytes32 c_name, bytes32 c_origin, bytes32 pr_name, bytes32 pr_descr, uint32 pr_id) public {

        Company memory cmp;
        Transaction memory tr;
        Product storage pr = products[pr_id];

        cmp.name = c_name;
        cmp.origin = c_origin;
        cmp.p_key = msg.sender;

        pr.name = pr_name;
        pr.description = pr_descr;
        pr.id = pr_id;
        pr.transactions_count = 1;

        tr.buyer = cmp;
        tr.datastamp = now;
        tr.id = 0;

        transactions[pr_id][0] = tr;
    }

    function sellProduct(uint32 pr_id, uint32 tr_id) public {

        uint32 tr_count = products[pr_id].transactions_count;
        require(msg.sender == transactions[pr_id][tr_count - 1].buyer.p_key);

        Transaction memory tr;
        tr.seller = transactions[pr_id][tr_count - 1].buyer;
        tr.id = tr_id;

        transactions[pr_id][tr_count] = tr;
        products[pr_id].transactions_count += 1;
    }

    function buyProduct(uint32 pr_id, uint32 tr_id, bytes32 s_name, bytes32 s_origin) public {

        uint32 tr_count = products[pr_id].transactions_count;
        require(tr_id == transactions[pr_id][tr_count - 1].id);

        transactions[pr_id][tr_count - 1].buyer.name = s_name;
        transactions[pr_id][tr_count - 1].buyer.p_key = msg.sender;
        transactions[pr_id][tr_count - 1].buyer.origin = s_origin;
    }

    function getInformation(uint32 pr_id) public view
        returns(bytes32 pr_name, bytes32 pr_descr, bytes32 producer, bytes32 origin, address p_key, bytes32[10] memory sell_names, bytes32[10] memory buy_names, address[10] memory sell_addr, address[10] memory buy_addr) {

        Product storage pr = products[pr_id];

        pr_name = pr.name;
        pr_descr = pr.description;
        producer = transactions[pr_id][0].buyer.name;
        origin = transactions[pr_id][0].buyer.origin;
        p_key = transactions[pr_id][0].buyer.p_key;
        for (uint i = 0; i < pr.transactions_count; i++) {
            sell_names[i] = transactions[pr_id][i].seller.name;
            sell_addr[i] = transactions[pr_id][i].seller.p_key;
            buy_names[i] = transactions[pr_id][i].buyer.name;
            buy_addr[i] = transactions[pr_id][i].buyer.p_key;
        }
    }
}
