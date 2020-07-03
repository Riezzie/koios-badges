var koiosBadge = artifacts.require("KoiosBadges");

module.exports = function(deployer) {
  deployer.deploy(koiosBadge, "https://riezzie.github.io/koios-badges/tokens/");
};
