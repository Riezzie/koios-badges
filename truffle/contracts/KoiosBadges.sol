pragma solidity 0.5.16;

import "./ERC1155Full.sol";

contract KoiosBadges is ERC1155 {

  bytes4 constant private INTERFACE_SIGNATURE_URI = 0x0e89341c;
  string baseURI;

  // id => creators
  mapping (uint256 => address) public creators;

  // A nonce to ensure we have a unique id each time we mint.
  uint256 public nonce;

  modifier creatorOnly(uint256 _id) {
    require(creators[_id] == msg.sender);
    _;
  }

  function supportsInterface(bytes4 _interfaceId) public view returns (bool) {
    if (_interfaceId == INTERFACE_SIGNATURE_URI) {
      return true;
    } else {
      return super.supportsInterface(_interfaceId);
    }
  }

  constructor(string memory _baseURI) public {
    baseURI = _baseURI;

    // Create 3 badges
    create(100);
    create(100);
    create(100);

  }

  // Creates a new token type and assings _initialSupply to minter
  function create(uint256 _initialSupply) public returns(uint256 _id) {

    _id = ++nonce;
    creators[_id] = msg.sender;
    balances[_id][msg.sender] = _initialSupply;

    // Transfer event with mint semantic
    emit TransferSingle(msg.sender, address(0x0), msg.sender, _id, _initialSupply);

    emit URI(baseURI, _id);
  }

  // Batch mint tokens. Assign directly to _to[].
  function mint(uint256 _id, address[] memory _to, uint256[] memory _quantities) public creatorOnly(_id) {

    for (uint256 i = 0; i < _to.length; ++i) {

      address to = _to[i];
      uint256 quantity = _quantities[i];

      // Grant the items to the caller
      balances[_id][to] = quantity.add(balances[_id][to]);

      // Emit the Transfer/Mint event.
      // the 0x0 source address implies a mint
      // It will also provide the circulating supply info.
      emit TransferSingle(msg.sender, address(0x0), to, _id, quantity);

      if (to.isContract()) {
        _doSafeTransferAcceptanceCheck(msg.sender, msg.sender, to, _id, quantity, '');
      }
    }
  }

  function setURI(string memory _uri, uint256 _id) public creatorOnly(_id) {
    emit URI(_uri, _id);
  }
}

