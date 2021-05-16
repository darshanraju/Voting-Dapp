//Migration changes the state of the blockchain, and the migration lets us do this

//artifacts = contract abstraction specific to Truffle
var Election = artifacts.require("./Election.sol");

module.exports = function (deployer) {
  deployer.deploy(Election);
};
