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
    
    constructor() public {
      
    }
    
    function createProduct(string c_name, string c_origin, string pr_name, string pr_descr, int32 pr_id) {
        Company company = Company( {name: c_name, origin: c_origin, p_key: msg.sender} );
        Transaction transaction = Transaction( {datastamp: now} );
        transaction.buyer = company;
        Product product = Product( {name: pr_name, description: pr_descr, id: pr_id});
        product.transactions.push(transaction);
    }
  
  
}
