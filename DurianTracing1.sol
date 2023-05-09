// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DurianTracing {
  address public contractOwner;

  enum Roles {
    Admin,
    Farmer, 
    Distributor, 
    Retailer, 
    Consumer,
    Count
  }

  struct User {
    address userAddress;
    string userName;
    Roles userRole;
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

  mapping(address => User) public users; // User address => User
  mapping(address => bool) public admins;
  mapping(address => bool) public farmers;
  mapping(address => bool) public distributors;
  mapping(address => bool) public retailers;
  mapping(address => bool) public consumers;

  uint public treesCount;
  mapping(address => Tree) public trees;

  uint public duriansCount;
  mapping(address => Durian) public durians;

  uint public farmsCount;
  mapping(address => Farm) public farms;

  uint public distributionCentersCount;
  mapping(address => DistributionCenter) public distributionCenters;

  // -------------------------------------------------------
  // |                     Constructor                     |
  // -------------------------------------------------------
  constructor() {
    contractOwner = msg.sender;
    users[contractOwner] = User(contractOwner, "Contract Owner", Roles.Admin);
    admins[contractOwner] = true;
    treesCount = 0;
    duriansCount = 0;
    farmsCount = 0;
    distributionCentersCount = 0;
  }

  // -----------------------------------------------------------
  // |                     Admins function                     |
  // -----------------------------------------------------------
  // Add admin only by contract owner
  function addAdmin(address _adminAddress) external onlyOwner {
    admins[_adminAddress] = true;
  }

  // Remove admin only by contract owner
  function removeAdmin(address _adminAddress) external onlyOwner {
    admins[_adminAddress] = false;
  }

  // ----------------------------------------------------
  // |                     Modifiers                     |
  // ----------------------------------------------------
  // OnlyBy modifier for contract owner
  modifier onlyOwner() {
    require(msg.sender == contractOwner, "Only contract owner can call this function");
    _;
  }

  // OnlyBy modifier for admins
  modifier onlyAdmin() {
    require(admins[msg.sender], "Only admin can call this function");
    _;
  }

  // OnlyBy modifier for farmers
  modifier onlyFarmer() {
    require(farmers[msg.sender], "Only farmer can call this function");
    _;
  }

  // OnlyBy modifier for distributors
  modifier onlyDistributor() {
    require(distributors[msg.sender], "Only distributor can call this function");
    _;
  }

  // OnlyBy modifier for retailers
  modifier onlyRetailer() {
    require(retailers[msg.sender], "Only retailer can call this function");
    _;
  }

  // OnlyBy modifier for consumers
  modifier onlyConsumer() {
    require(consumers[msg.sender], "Only consumer can call this function");
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

    roles[uint(Roles.Admin)] = "Admin";
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
  function createUser(string memory _name) external {
    users[msg.sender] = User(msg.sender, _name, Roles.Consumer); // Default role is consumer
  }

  // Get user 
  function getUser(address _userAddress) external view returns (address, string memory, uint) {
    User memory user = users[_userAddress];
    
    return (
      user.userAddress,
      user.userName, 
      uint(user.userRole)
    );
  }

  // Assign role for user only by admin
  function assignRole(address _userAddress, Roles _role) external onlyAdmin {
    users[_userAddress].userRole = _role;
  }

  // -----------------------------------------------------------
  // |                     Durian function                     |
  // -----------------------------------------------------------
  // Create durian onlyby farm
  function createDurian(address _farmAddress, string memory _type, address _treeAddress, int _harvestDate, int _harvestTime) external onlyFarmer {
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
  function updateDatePassToDistributionCenter(address _durianAddress, int _datePassToDistributionCenter) external view onlyFarmer {
    Durian memory durian = durians[_durianAddress];
    durian.durianFarm.datePassToDistributionCenter = _datePassToDistributionCenter;
  }

  // Get durian information for farmer
  function getDurianInfoForFarmer(address _durianAddress) external view onlyFarmer returns (address, string memory, address, int, int, int) {
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
  function updateDurianInfoForDistributor(address _durianAddress, address _distributionCenterAddress, int _dateReceivedFromFarm) external view onlyDistributor {
    Durian memory durian = durians[_durianAddress];
    durian.durianDistributionCenter.distributionCenterAddress = _distributionCenterAddress;
    durian.durianDistributionCenter.dateReceivedFromFarm = _dateReceivedFromFarm;
  }

  // Update date pass to retailer
  function updateDatePassToRetailer(address _durianAddress, int _datePassToRetailer) external view onlyDistributor {
    Durian memory durian = durians[_durianAddress];
    durian.durianDistributionCenter.datePassToRetailer = _datePassToRetailer;
  }

  // ---------------------------------------------------------
  // |                     Farm function                     |
  // ---------------------------------------------------------
  // Create farm onlyby farmer
  function createFarm(address _owner, string memory _name, uint _operatingYears, string memory _location) external onlyAdmin {
    Farm memory farm = Farm({
      farmAddress: address(this),
      farmOwner: _owner,
      farmName: _name,
      farmLocation: _location,
      farmOperatingYears: _operatingYears,
      farmers: new address[](0),
      trees: new address[](0),
      lastPassingDate: 0
    });

    // Add farm to mapping
    farms[farm.farmAddress] = farm;
    farmsCount++;
  }

  // Get farm information
  function getFarmInfo(address _farmAddress) external view onlyFarmer returns (address, address, string memory, string memory, uint, address[] memory, address[] memory, uint) {
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

  // Set last passing date
  function setLastPassingDate(address _farmAddress, uint _lastPassingDate) external onlyFarmOwner(_farmAddress) {
    farms[_farmAddress].lastPassingDate = _lastPassingDate;
  }

  // Update operating years
  function setOperatingYears(address _farmAddress, uint _operatingYears) external onlyFarmOwner(_farmAddress) {
    farms[_farmAddress].farmOperatingYears = _operatingYears;
  }

  // Add tree to farm
  function addTreeToFarm(address _farmAddress, address _treeAddress) external onlyFarmer {
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
  function getTreeInfo(address _treeAddress) external view onlyFarmer returns (address, string memory, uint) {
    Tree memory tree = trees[_treeAddress];
    return (
      tree.treeAddress, 
      tree.treeType, 
      tree.lastHarvestDate
    );
  }

  // ------------------------------------------------------------------------
  // |                     Distribution Center function                     |
  // ------------------------------------------------------------------------
  // Create distribution center onlyby distributor
  function createDistributionCenter(address _owner, string memory _name, uint _operatingYears, string memory _location) external onlyAdmin {
    DistributionCenter memory distributionCenter = DistributionCenter({
      distributionCenterAddress: address(this),
      distributionCenterOwner: _owner,
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

  // Add distributor to distribution center
  function addDistributorToDistributionCenter(address _distributionCenterAddress, address _userAddress) external onlyDistributionCentreOwner(_distributionCenterAddress) {
    distributionCenters[_distributionCenterAddress].distributors.push(_userAddress);
  }

  // Get distribution center information
  function getDistributionCenterInfo(address _distributionCenterAddress) external view onlyDistributor returns (address, address, string memory, string memory, uint, address[] memory, uint) {
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
}