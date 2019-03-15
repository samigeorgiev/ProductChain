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
    }
    
    struct Product {
        string name;
        string description;
        int32 id;
        Transaction[] transactions;
    }
    
    mapping (int32 => Product) products;
    
    constructor() public {
      
    }
    
    function createProduct(string memory c_name, string memory c_origin, string memory pr_name, string memory pr_descr, int32 pr_id) public {
        
        Company memory cmp;
        Transaction memory tr;
        Product memory pr;
        
        cmp.name = c_name;
        cmp.origin = c_origin;
        cmp.p_key = msg.sender;
        
        tr.buyer = cmp;
        tr.datastamp = now;
        
        pr.name = pr_name;
        pr.description = pr_descr;
        pr.id = pr_id;
    }
  
  
}
