//Migration changes the state of the blockchain, and the migration lets us do this

var Migrations = artifacts.require("./Migrations.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
