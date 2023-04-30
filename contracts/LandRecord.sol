// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@thirdweb-dev/contracts/extension/Ownable.sol';

struct User {
  address id;
  string name;
  string aadharNumber;
  bool isVerified;
}

struct Inspector {
  address id;
  string name;
}

struct Land {
  uint id;
  uint area;
  string landAddress;
  string latLng;
  uint propertyId;
  address payable ownerAddr;
  bool isVerified;
}

contract LandRecord is Ownable {
  event InspectorAdded(address indexed id, string name);
  event InspectorUpdated(address indexed id, string name);

  mapping(address => Inspector) inspectorsMapping;
  address[] inspectors;

  modifier onlyInspector() {
    _;
  }

  constructor() {
    _setupOwner(msg.sender);
  }

  function isContractOwner(address _addr) public view returns (bool) {
    return _addr == owner();
  }

  function isInspectorExist(address _addr) public view returns (bool) {
    return (inspectorsMapping[_addr].id != address(0));
  }

  function getInspectorCount() public view returns (uint) {
    return inspectors.length;
  }

  function getAllInspectors() public view returns (Inspector[] memory) {
    Inspector[] memory _inspectors = new Inspector[](inspectors.length);
    for (uint256 i = 0; i < inspectors.length; i++) {
      _inspectors[i] = inspectorsMapping[inspectors[i]];
    }

    return _inspectors;
  }

  function addInspector(address _id, string memory _name) external onlyOwner {
    require(!isInspectorExist(_id), 'Inspector already exist');

    inspectorsMapping[_id] = Inspector(_id, _name);
    inspectors.push(_id);

    emit InspectorAdded(_id, _name);
  }

  function updateInspector(string memory _name) external {
    address _addr = msg.sender;

    require(isInspectorExist(_addr), 'Inspector does not exist');

    inspectorsMapping[_addr].name = _name;

    emit InspectorUpdated(_addr, _name);
  }

  function _canSetOwner() internal view virtual override returns (bool) {
    return msg.sender == owner();
  }
}
