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

  mapping(address => User) usersMapping;
  address[] users;

  mapping(uint => Land) landsMapping;
  uint[] lands;
  mapping(address => uint[]) usersLandMapping;

  modifier onlyInspector() {
    if (!isInspectorExist(msg.sender)) {
      revert('User is not inspector');
    }

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

  function getInspector(address _addr) public view returns (Inspector memory) {
    require(isInspectorExist(_addr), 'Inspector does not exist');

    return inspectorsMapping[_addr];
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

  function getUserCount() public view returns (uint) {
    return users.length;
  }

  function getAllUsers() public view returns (User[] memory) {
    User[] memory _users = new User[](users.length);
    for (uint256 i = 0; i < users.length; i++) {
      _users[i] = usersMapping[users[i]];
    }

    return _users;
  }

  function getUser(address _addr) public view returns (User memory) {
    require(isUserExist(_addr), 'User does not exist');

    return usersMapping[_addr];
  }

  function isUserExist(address _addr) public view returns (bool) {
    return (usersMapping[_addr].id != address(0));
  }

  function addUser(string memory _name, string memory _aadharNumber) external {
    address _addr = msg.sender;

    require(!isUserExist(_addr), 'User already exist');

    usersMapping[_addr] = User(_addr, _name, _aadharNumber, false);
    users.push(_addr);
  }

  function updateUser(
    string memory _name,
    string memory _aadharNumber
  ) external {
    address _addr = msg.sender;

    require(isUserExist(_addr), 'User does not exist');

    usersMapping[_addr].name = _name;
    usersMapping[_addr].aadharNumber = _aadharNumber;
  }

  function verifyUser(address _addr) external onlyInspector {
    usersMapping[_addr].isVerified = true;
  }

  function isLandExist(uint _propertyId) public view returns (bool) {
    return (landsMapping[_propertyId].id != 0);
  }

  function getLandCount() public view returns (uint) {
    return lands.length;
  }

  function getAllLands() public view returns (Land[] memory) {
    Land[] memory _lands = new Land[](lands.length);
    for (uint256 i = 0; i < lands.length; i++) {
      _lands[i] = landsMapping[lands[i]];
    }

    return _lands;
  }

  function getAllLands(address _addr) public view returns (Land[] memory) {
    require(isUserExist(_addr), 'User not Exist');

    uint[] memory _landsId = usersLandMapping[_addr];
    Land[] memory _lands = new Land[](_landsId.length);

    for (uint256 i = 0; i < _landsId.length; i++) {
      _lands[i] = landsMapping[_landsId[i]];
    }

    return _lands;
  }

  function getLand(uint _id) public view returns (Land memory) {
    require(isLandExist(_id), 'Land does not exist');

    return landsMapping[_id];
  }

  function addLand(
    uint _area,
    string memory _landAddress,
    string memory _latLng,
    uint _propertyId
  ) external {
    require(!isLandExist(_propertyId), 'Land already exist');

    uint _id = lands.length + 1;

    landsMapping[_propertyId] = Land(
      _id,
      _area,
      _landAddress,
      _latLng,
      _propertyId,
      payable(msg.sender),
      false
    );
    lands.push(_propertyId);
    usersLandMapping[msg.sender].push(_propertyId);
  }

  function updateLand(
    uint _propertyId,
    uint _area,
    string memory _landAddress,
    string memory _latLng
  ) external {
    require(isLandExist(_propertyId), 'Land does not exist');
    require(
      landsMapping[_propertyId].ownerAddr == msg.sender,
      'Only land owner can update'
    );

    landsMapping[_propertyId].area = _area;
    landsMapping[_propertyId].landAddress = _landAddress;
    landsMapping[_propertyId].latLng = _latLng;
  }

  function verifyLand(uint _propertyId) external onlyInspector {
    require(isLandExist(_propertyId), 'Land does not exist');

    landsMapping[_propertyId].isVerified = true;
  }

  function transferLand(
    uint _propertyId,
    address payable _newOwnerAddr
  ) external onlyInspector {
    require(isLandExist(_propertyId), 'Land does not exist');

    landsMapping[_propertyId].ownerAddr = _newOwnerAddr;
  }

  function _canSetOwner() internal view virtual override returns (bool) {
    return msg.sender == owner();
  }
}
