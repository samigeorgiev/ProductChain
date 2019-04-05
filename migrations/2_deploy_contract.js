var contract = artefacts.require("ProductChain");

module.exports = deployer => {
    deployer.deploy(contract);
};
