var koiosBadge = artifacts.require("KoiosBadges");

module.exports = function(deployer) {
  // TODO set correct url
  deployer.deploy(koiosBadge, "https://web3assignments.github.io/BC2_Lars/Day_09/ERC721/Tokens/");
};
