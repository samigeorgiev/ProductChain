const ABI = '[{"constant":true,"inputs":[{"name":"pr_id","type":"uint32"}],"name":"getInformation","outputs":[{"name":"pr_name","type":"bytes32"},{"name":"pr_descr","type":"bytes32"},{"name":"producer","type":"bytes32"},{"name":"origin","type":"bytes32"},{"name":"p_key","type":"address"},{"name":"sell_names","type":"bytes32[10]"},{"name":"buy_names","type":"bytes32[10]"},{"name":"sell_addr","type":"address[10]"},{"name":"buy_addr","type":"address[10]"},{"name":"isSold","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"c_name","type":"bytes32"},{"name":"c_origin","type":"bytes32"},{"name":"pr_name","type":"bytes32"},{"name":"pr_descr","type":"bytes32"},{"name":"pr_id","type":"uint32"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pr_id","type":"uint32"}],"name":"makeSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pr_id","type":"uint32"},{"name":"tr_id","type":"uint32"},{"name":"s_name","type":"bytes32"},{"name":"s_origin","type":"bytes32"}],"name":"buyProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pr_id","type":"uint32"},{"name":"tr_id","type":"uint32"}],"name":"sellProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
const ADDRESS = '0xf7c02276d0734A8feafCBb6c1d05b4fE2d63FF16';

let localResult=[
  "0x73616d6900000000000000000000000000000000000000000000000000000000",
  "0x73616d6900000000000000000000000000000000000000000000000000000000",
  "0x73616d6900000000000000000000000000000000000000000000000000000000",
  "0x73616d6900000000000000000000000000000000000000000000000000000000",
  "0x95c35036aaf96115c580b8a5c54ef51e47ee6fc3",
  [
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ],
  [
    "0x73616d6900000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ],
  [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000"
  ],
  [
    "0x95c35036aaf96115c580b8a5c54ef51e47ee6fc3",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000"
  ]
];

function getWeb3() {

    if (typeof web3 !== 'undefined') { window.web3 = new Web3(web3.currentProvider); }
    else { console.log('Metamask not found'); }
}

function createContractObj() {

    getWeb3();

    if(!window.web3){
        return undefined;
    }

    let contract = web3.eth.contract(JSON.parse(ABI));
    return contract.at(ADDRESS);

}

function makeQrCode(code) {
    let div = document.getElementById('qrcode');
    let text = document.getElementById('text-entry')
    let qr = document.getElementById('qr');

    var qrcode = new QRCode("qrcode");

    try {
        qr.hidden = true;
        text.hidden = true;
    } catch (e) {

    } finally {

        div.hidden = false;
    }

    function makeCode() {
        qrcode.makeCode(code);
    }

    makeCode();
}

function addProduct() {

    let id = Math.floor(Math.random() * 100000000) + 1;

    console.log(id);

    // let id = 1122;

    let contract = createContractObj();
    let params = createComposeJSON();

    contract.addProduct.sendTransaction(params.company, params.origin, params.name, params.description, id, { from: web3.eth.coinbase }, function(error, result) {
        if (error) { console.log('error'); }
        else { console.log('success'); }
    });
}

function sellProduct(pr_id, tr_id) {

    let contract = createContractObj();

    contract.sellProduct.sendTransaction(pr_id, tr_id, { from: web3.eth.coinbase }, function(error, result) {
        if (error) { console.log('error'); }
        else {console.log('success'); }
    })
}

function buyProduct(params) {

    let contract = createContractObj();

    contract.buyProduct.sendTransaction(params.productId, params.transactionId, params.company, params.origin, { from: web3.eth.coinbase }, function() {
        if (error) { console.log('error'); }
        else { console.log('success'); }
    });
}

function makeSale(pr_id) {

    let contract = createContractObj();

    contract.makeSale.sendTransaction(pr_id, { from: web3.eth.coinbase }, function() {
        if (error) { console.log('error'); }
        else { console.log('success'); }
    });
}

function getInfo(id, callback) {

    let contract = createContractObj();
    if(!contract){
        return callback(undefined, localResult);
    }
    contract.getInformation.call(id, { from: web3.eth.coinbase }, web3.eth.defaultBlock, callback);

    //    function(error, result) {
    //    if (error) { console.log('error'); }
    //    else { console.log(result); }
    //});
}
