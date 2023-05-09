// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DurianTrackingApplication {
  enum Roles {
    Farmer, 
    Distributor, 
    Retailer, 
    Consumer,
    Count
  }

  struct User {
    string name;
    Roles role;
  }

  struct Durian {
    address durianAddress;
    string durianType;
    DurianFarm durianFarm;
    DurianDistributionCenter durianDistributionCenter;
  }

  struct DurianFarm {
    address farmAddress;
    address treeAddress;
    int harvestDate;
    int harvestTime;
    int datePassToDistributionCenter;
  }

  struct DurianDistributionCenter {
    address distributionCenterAddress;
    int dateReceivedFromFarm;
    int datePassToRetailer;
  }

  struct Tree {
    address treeAddress;
    string treeType;
    uint lastHarvestDate;
  }

  struct Farm {
    address farmAddress;
    address farmOwner;
    string farmName;
    string farmLocation;
    uint farmOperatingYears;
    address[] farmers;
    address[] trees;
    uint lastPassingDate;
  }

  struct DistributionCenter {
    address distributionCenterAddress;
    address distributionCenterOwner;
    string distributionCenterName;
    string distributionCenterLocation;
    uint distributionCenterOperatingYears;
    address[] distributors;
    uint lastPassingDate;
  }

  mapping(address => User) public users;
  mapping(address => User) public farmers;
  mapping(address => User) public distributors;

  uint public treesCount;
  mapping(address => Tree) public trees;

  uint public duriansCount;
  mapping(address => Durian) public durians;

  uint public farmsCount;
  mapping(address => Farm) public farms;

  uint public distributionCentersCount;
  mapping(address => DistributionCenter) public distributionCenters;

  // ----------------------------------------------------
  // |                     Modifiers                     |
  // ----------------------------------------------------
  // OnlyBy modifier for users
  modifier onlyUser() {
    require(bytes(users[msg.sender].name).length != 0, "Only user can call this function");
    _;
  }

  // OnlyBy modifier for farmers
  modifier onlyFarmer() {
    require(users[msg.sender].role == Roles.Farmer, "Only farmer can call this function");
    _;
  }

  // OnlyBy modifier for distributors
  modifier onlyDistributor() {
    require(users[msg.sender].role == Roles.Distributor, "Only distributor can call this function");
    _;
  }

  // OnlyBy modifier for retailers
  modifier onlyRetailer() {
    require(users[msg.sender].role == Roles.Retailer, "Only retailer can call this function");
    _;
  }

  // OnlyBy modifier for farm owners
  modifier onlyFarmOwner(address _farmAddress) {
    require(msg.sender == farms[_farmAddress].farmOwner, "Only the owner of the farm can perform this action.");
    _;
  }

  // OnlyBy modifier for distribution center owners
  modifier onlyDistributionCentreOwner(address _distributionCenterAddress) {
    require(msg.sender == distributionCenters[_distributionCenterAddress].distributionCenterOwner, "Only the owner of the distribution centre can perform this action.");
    _;
  }

  // Get roles
  function getRoles() external pure returns (string[] memory) {
    uint rolesCount = uint(Roles.Count);
    string[] memory roles = new string[](rolesCount);

    roles[uint(Roles.Farmer)] = "Farmer";
    roles[uint(Roles.Distributor)] = "Distributor";
    roles[uint(Roles.Retailer)] = "Retailer";
    roles[uint(Roles.Consumer)] = "Consumer";

    return roles;
  }

  // ---------------------------------------------------------
  // |                     User function                     |
  // ---------------------------------------------------------
  // Create user
  function createUser(string memory _name, uint _role) external {
    require(_role >= 0 && _role <= 3, "Invalid role");
    users[msg.sender] = User(_name, Roles(_role));

    if(_role == 2){
      distributors[msg.sender] = User(_name, Roles(_role));
    }
  }

  // Get user 
  function getUser(address _userAddress) external view returns (string memory, uint) {
    User memory user = users[_userAddress];
    return (user.name, uint(user.role));
  }

  // Check whether user have selected role
  function isUserHaveRole() external view returns (bool) {
    User memory user = users[msg.sender];
    return user.role != Roles(0);
  }

  // -----------------------------------------------------------
  // |                     Durian function                     |
  // -----------------------------------------------------------
  // Create durian onlyby farm
  function createDurian(address _farmAddress, string memory _type, address _treeAddress, int _harvestDate, int _harvestTime) external onlyUser onlyFarmer {
    DurianFarm memory durianFarm = DurianFarm({
      farmAddress: _farmAddress,
      treeAddress: _treeAddress,
      harvestDate: _harvestDate,
      harvestTime: _harvestTime,
      datePassToDistributionCenter: 0
    });

    Durian memory durian = Durian({
      durianAddress: address(this),
      durianType: _type,
      durianFarm: durianFarm,
      durianDistributionCenter: DurianDistributionCenter({
        distributionCenterAddress: address(0),
        dateReceivedFromFarm: 0,
        datePassToRetailer: 0
      })
    });

    // Add durian to mapping
    durians[durian.durianAddress] = durian;
    duriansCount++;
  }

  // Update date pass to distribution center
  function updateDatePassToDistributionCenter(address _durianAddress, int _datePassToDistributionCenter) external view onlyUser onlyFarmer {
    Durian memory durian = durians[_durianAddress];
    durian.durianFarm.datePassToDistributionCenter = _datePassToDistributionCenter;
  }

  // Get durian information for farmer
  function getDurianInfoForFarmer(address _durianAddress) external view onlyUser onlyFarmer returns (address, string memory, address, int, int, int) {
    Durian memory durian = durians[_durianAddress];
    return (
      durian.durianAddress,
      durian.durianType,
      durian.durianFarm.treeAddress,
      durian.durianFarm.harvestDate,
      durian.durianFarm.harvestTime,
      durian.durianFarm.datePassToDistributionCenter
    );
  }

  // Update durian information for distributor
  function updateDurianInfoForDistributor(address _durianAddress, address _distributionCenterAddress, int _dateReceivedFromFarm) external view onlyUser onlyDistributor {
    Durian memory durian = durians[_durianAddress];
    durian.durianDistributionCenter.distributionCenterAddress = _distributionCenterAddress;
    durian.durianDistributionCenter.dateReceivedFromFarm = _dateReceivedFromFarm;
  }

  // Update date pass to retailer
  function updateDatePassToRetailer(address _durianAddress, int _datePassToRetailer) external view onlyUser onlyDistributor {
    Durian memory durian = durians[_durianAddress];
    durian.durianDistributionCenter.datePassToRetailer = _datePassToRetailer;
  }

  // ---------------------------------------------------------
  // |                     Farm function                     |
  // ---------------------------------------------------------
  // Create farm onlyby farmer
  function createFarm(string memory _name, uint _operatingYears, string memory _location) external onlyUser onlyFarmer {
    Farm memory farm = Farm({
      farmAddress: address(this),
      farmOwner: msg.sender,
      farmName: _name,
      farmLocation: _location,
      farmOperatingYears: _operatingYears,
      farmers: new address[](0),
      trees: new address[](0),
      lastPassingDate: 0
    });

    // Add farm to mapping
    farms[farm.farmAddress] = farm;
  }

  // Get farm information
  function getFarmInfo(address _farmAddress) external view returns (address, address, string memory, string memory, uint, address[] memory, address[] memory, uint) {
    Farm memory farm = farms[_farmAddress];
    return (
      farm.farmAddress, 
      farm.farmOwner, 
      farm.farmName, 
      farm.farmLocation, 
      farm.farmOperatingYears, 
      farm.farmers, 
      farm.trees, 
      farm.lastPassingDate
    );
  }

  // Add farmer to farm
  function addFarmerToFarm(address _farmAddress, address _userAddress) external onlyFarmOwner(_farmAddress) {
    farms[_farmAddress].farmers.push(_userAddress);
  }

  // Add tree to farm
  function addTreeToFarm(address _farmAddress, address _treeAddress) external onlyFarmOwner(_farmAddress) {
    Tree memory tree = Tree({
      treeAddress: _treeAddress,
      treeType: "Durian",
      lastHarvestDate: 0
    });

    farms[_farmAddress].trees.push(_treeAddress);
    trees[_treeAddress] = tree;
    treesCount++;
  }

  // Get tree information
  function getTreeInfo(address _treeAddress) external view returns (address, string memory, uint) {
    Tree memory tree = trees[_treeAddress];
    return (
      tree.treeAddress, 
      tree.treeType, 
      tree.lastHarvestDate
    );
  }

  // Set last passing date
  function setLastPassingDate(address _farmAddress, uint _lastPassingDate) external onlyFarmOwner(_farmAddress) {
    farms[_farmAddress].lastPassingDate = _lastPassingDate;
  }

  // Update operating years
  function setOperatingYears(address _farmAddress, uint _operatingYears) external onlyFarmOwner(_farmAddress) {
    farms[_farmAddress].farmOperatingYears = _operatingYears;
  }

  // ------------------------------------------------------------------------
  // |                     Distribution Center function                     |
  // ------------------------------------------------------------------------
  // Create distribution center onlyby distributor
  function createDistributionCenter(string memory _name, uint _operatingYears, string memory _location) external onlyUser onlyDistributor {
    DistributionCenter memory distributionCenter = DistributionCenter({
      distributionCenterAddress: address(this),
      distributionCenterOwner: msg.sender,
      distributionCenterName: _name,
      distributionCenterLocation: _location,
      distributionCenterOperatingYears: _operatingYears,
      distributors: new address[](0),
      lastPassingDate: 0
    });

    // Add distribution center to mapping
    distributionCenters[distributionCenter.distributionCenterAddress] = distributionCenter;
    distributionCentersCount++;
  }

  // Get distribution center information
  function getDistributionCenterInfo(address _distributionCenterAddress) external view returns (address, address, string memory, string memory, uint, address[] memory, uint) {
    DistributionCenter memory distributionCenter = distributionCenters[_distributionCenterAddress];
    return (
      distributionCenter.distributionCenterAddress, 
      distributionCenter.distributionCenterOwner, 
      distributionCenter.distributionCenterName, 
      distributionCenter.distributionCenterLocation, 
      distributionCenter.distributionCenterOperatingYears, 
      distributionCenter.distributors, 
      distributionCenter.lastPassingDate
    );
  }

  // Add distributor to distribution center
  function addDistributorToDistributionCenter(address _distributionCenterAddress, address _userAddress) external onlyDistributionCentreOwner(_distributionCenterAddress) {
    distributionCenters[_distributionCenterAddress].distributors.push(_userAddress);
  }
}