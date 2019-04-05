pragma solidity >=0.4.0 <0.6.0;

import "remix_tests.sol";
import "./ProductChain.sol";

contract Test1 {
    
    ProductChain inst;
    
    function beforeAll() public {
        inst = new ProductChain();
    }
}