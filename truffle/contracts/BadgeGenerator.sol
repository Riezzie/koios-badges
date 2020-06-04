pragma solidity 0.5.16;

import "./ERC1155Full.sol";

contract BadgeGenerator is ERC1155 {

  struct Badge {
    uint256 id;
    string metadataUrl;
    address owner;
    mapping(address => bool) badgeCreators;
  }


  address public owner;
  uint256 public badgeCount;

  mapping(uint256 => Badge) public badges;
  mapping(address => bool) public creators;

  event badgeCreated(uint256 badgeId);
  event addedCreator(address _address);
  event removedCreator(address _address);


  constructor() public {
    // set owner of contract
    owner = msg.sender;
    // add owner as creator
    creators[msg.sender] = true;
  }

  modifier ownerOnly() {
    require(msg.sender == owner, 'You are not the owner');
    _;
  }

  modifier creatorOnly() {
    require(creators[msg.sender], 'You are not a badge creator');
    _;
  }

  modifier badgeOwnerOnly(uint256 _badgeId) {
    Badge storage badge = badges[_badgeId];
    require(badge.owner == msg.sender);
    _;
  }

  function addCreator(address _address) public ownerOnly {
    creators[_address] = true;
    emit addedCreator(_address);
  }

  function removeCreator(address _address) public ownerOnly {
    creators[_address] = false;
    emit removedCreator(_address);
  }

  // Creates a new token type and assigns _initialSupply to minter
  function createBadge(uint256 _initialSupply, string memory _metadataUrl) public creatorOnly returns (uint256 _id) {
    require(badgeCount >= 0, 'invalid badgeCount');

    _id = badgeCount++;
    badges[_id] = Badge(_id, _metadataUrl, msg.sender);
    addBadgeCreator(_id, msg.sender);

    balances[_id][msg.sender] = _initialSupply;

    emit TransferSingle(msg.sender, address(0x0), msg.sender, _id, _initialSupply);

    if (bytes(_metadataUrl).length > 0)
      emit URI(_metadataUrl, _id);

    emit badgeCreated(badgeCount);
  }

  function addBadgeCreator(uint256 _badgeId, address _address) public badgeOwnerOnly(_badgeId) {
    require((_badgeId >= 0 && _badgeId <= badgeCount), 'invalid badge id');
    badges[_badgeId].badgeCreators[_address] = true;
  }

  function removeBadgeCreator(uint256 _badgeId, address _address) public badgeOwnerOnly(_badgeId) {
    require((_badgeId >= 0 && _badgeId <= badgeCount), 'invalid badge id');
    badges[_badgeId].badgeCreators[_address] = false;
  }

  function isBadgeCreator(uint256 _badgeId, address _address) public view returns (bool) {
    require((_badgeId >= 0 && _badgeId <= badgeCount), 'invalid badge id');
    return badges[_badgeId].badgeCreators[_address];
  }

  function setURI(string calldata _uri, uint256 _id) external badgeOwnerOnly(_id) {
    emit URI(_uri, _id);
  }
}
