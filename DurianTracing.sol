// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DurianTracing {
  // ------------------------------------------------
  // |                     Enum                     |
  // ------------------------------------------------
  enum Roles {
    Admin,
    Farmer, 
    Distributor, 
    Retailer, 
    Consumer,
    Count
  }

  enum RatingScale {
    Excellent,
    Good,
    Average,
    Bad,
    Inedible,
    Undefined,
    Count
  }

  struct User {
    address userAddress;
    string userName;
    Roles userRole;
  }

  // --------------------------------------------------
  // |                     Struct                     |
  // --------------------------------------------------
  struct Durian {
    address durianAddress;
    string durianType;
    DurianFarm durianFarm;
    DurianDistributionCenter durianDistributionCenter;
    DurianRetailer durianRetailer;
    DurianConsumer durianConsumer;
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

  struct DurianRetailer {
    address retailerAddress;
    int dateReceivedFromDistributionCenter;
    int datePassToConsumer;
  }

  struct DurianConsumer {
    address consumerAddress;
    int dateReceivedFromRetailer;
    Rating rating;
  }

  struct Tree {
    address treeAddress;
    string treeType;
    uint lastHarvestDate;
  }

  struct Rating {
    RatingScale taste;
    RatingScale fragrance;
    RatingScale texture;
    RatingScale creaminess;
    RatingScale ripeness;
    string gradeRating;
    string comment;
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

  struct Retailer{
    address retailerAddress;
    string retailerName;
    string retailerLocation;
    uint retailerOperatingYears;
    uint lastPassingDate;
  }

  struct Consumer {
    address consumerAddress;
    string consumerName;
    string consumerLocation;
  }

  // -------------------------------------------------------------------
  // |                     Mapping & Mapping Count                     |
  // -------------------------------------------------------------------
  uint public usersCount;
  mapping(address => User) public users;

  mapping(address => bool) public admins;
  mapping(address => address) public farmers; // mapping(farmAddress => farmerAddress)
  mapping(address => address) public distributors; // mapping(distributionCenterAddress => distributorAddress)

  uint public treesCount;
  mapping(address => Tree) public trees;

  uint public duriansCount;
  mapping(address => Durian) public durians;

  uint public farmsCount;
  mapping(address => Farm) public farms;

  uint public distributionCentersCount;
  mapping(address => DistributionCenter) public distributionCenters;

  uint public retailersCount;
  mapping(address => Retailer) public retailers; // mapping(retailerAddress => retailer)

  uint public consumersCount;
  mapping(address => Consumer) public consumers; // mapping(consumerAddress => consumer)

  // ----------------------------------------------------
  // |                     Variable                     |
  // ----------------------------------------------------
  address public contractOwner;

  // -------------------------------------------------------
  // |                     Constructor                     |
  // -------------------------------------------------------
  constructor() {
    usersCount = 0;
    treesCount = 0;
    duriansCount = 0;
    farmsCount = 0;
    distributionCentersCount = 0;
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
    require(
        users[msg.sender].userRole == Roles.Admin,
        "Only admin can call this function"
    );
    _;
  }

  // OnlyBy modifier for farmers
  modifier onlyFarmer() {
    require(
        farmers[msg.sender] == 0x0000000000000000000000000000000000000000, 
        "Only farmer can call this function"
      );
    _;
  }

  // OnlyBy modifier for distributors
  modifier onlyDistributor() {
    require(
      distributors[msg.sender] == 0x0000000000000000000000000000000000000000,
      "Only distributor can call this function"
    );
    _;
  }

  // OnlyBy modifier for retailers
  modifier onlyRetailer() {
    require(
      retailers[msg.sender].retailerAddress == 0x0000000000000000000000000000000000000000,
      "Only retailer can call this function"
    );
    _;
  }

  // OnlyBy modifier for consumers
  modifier onlyConsumer() {
    require(
      consumers[msg.sender].consumerAddress == 0x0000000000000000000000000000000000000000,
      "Only consumer can call this function"
    );
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

  // ------------------------------------------------------------
  // |                     Contract function                    |
  // ------------------------------------------------------------
  // Create owner
  function createOwner() external {
    contractOwner = msg.sender;
    users[contractOwner] = User(
      contractOwner,
      "Contract Owner",
      Roles.Admin
    );
    admins[contractOwner] = true;
  }

  // Get owner
  function getOwner() external view returns (address) {
    return contractOwner;
  }

  // ---------------------------------------------------------
  // |                     Owner function                    |
  // ---------------------------------------------------------

  // Add admin only by contract owner
  function addAdmin(address _adminAddress) external onlyOwner {
    admins[_adminAddress] = true;
  }

  // Remove admin only by contract owner
  function removeAdmin(address _adminAddress) external onlyOwner {
    admins[_adminAddress] = false;
  }

  // -----------------------------------------------------------
  // |                     Admins function                     |
  // -----------------------------------------------------------
  // Create user
  function createUser(string memory _name) external {
    User memory user = User(msg.sender, _name, Roles.Consumer); // Default role is consumer
    Consumer memory consumer = Consumer(msg.sender, _name, "");
    users[msg.sender] = user;
    usersCount++;
    consumers[msg.sender] = consumer;
    consumersCount++;
  }

  // Get user 
  function getUser(address _userAddress) external view returns (address, string memory, uint) {
    return (
      users[_userAddress].userAddress, 
      users[_userAddress].userName, 
      uint(users[_userAddress].userRole)
    );
  }

  // Assign role for user only by admin
  function assignRole(address _userAddress, Roles _role) external onlyAdmin {
    users[_userAddress].userRole = _role;
    // If role is farmer and distributors
    if (_role == Roles.Retailer) {
      retailers[_userAddress] = Retailer({
        retailerAddress: _userAddress,
        retailerName: users[_userAddress].userName,
        retailerLocation: "",
        retailerOperatingYears: 0,
        lastPassingDate: 0
      });
      retailersCount++;
    }
  }

  // Get roles list
  function getRoleList() external view onlyAdmin returns (string[] memory) {
    uint rolesCount = uint(Roles.Count);
    string[] memory roles = new string[](rolesCount);

    roles[uint(Roles.Admin)] = "Admin";
    roles[uint(Roles.Farmer)] = "Farmer";
    roles[uint(Roles.Distributor)] = "Distributor";
    roles[uint(Roles.Retailer)] = "Retailer";
    roles[uint(Roles.Consumer)] = "Consumer";

    return roles;
  }

  // Get user role
  function getUserRole(address _userAddress) external view returns (Roles) {
    return users[_userAddress].userRole;
  }

  // Check farmer belongs to which farm
  function getFarmerFarm(address _farmerAddress) external view returns (address) {
    return farmers[_farmerAddress];
  }

  // Check distributor belongs to which distribution center
  function getDistributorDistributionCenter(address _distributorAddress) external view returns (address) {
    return distributors[_distributorAddress];
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
      }),
      durianRetailer: DurianRetailer({
        retailerAddress: address(0),
        dateReceivedFromDistributionCenter: 0,
        datePassToConsumer: 0
      }),
      durianConsumer: DurianConsumer({
        consumerAddress: address(0),
        dateReceivedFromRetailer: 0,
        rating: Rating({
          taste: RatingScale.Undefined,
          fragrance: RatingScale.Undefined,
          texture: RatingScale.Undefined,
          creaminess: RatingScale.Undefined,
          ripeness: RatingScale.Undefined,
          gradeRating: "",
          comment: ""
        })
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

  // Get durian information for distributor
  function getDurianInfoForDistributor(address _durianAddress) external view onlyDistributor returns (address, string memory, address, int, int, int, address, int, int) {
    Durian memory durian = durians[_durianAddress];
    return (
      durian.durianAddress,
      durian.durianType,
      durian.durianFarm.treeAddress,
      durian.durianFarm.harvestDate,
      durian.durianFarm.harvestTime,
      durian.durianFarm.datePassToDistributionCenter,
      durian.durianDistributionCenter.distributionCenterAddress,
      durian.durianDistributionCenter.dateReceivedFromFarm,
      durian.durianDistributionCenter.datePassToRetailer
    );
  }

  // Update durian information for retailer
  function updateDurianInfoForRetailer(address _durianAddress, address _retailerAddress, int _dateReceivedFromDistributionCenter) external view onlyRetailer {
    Durian memory durian = durians[_durianAddress];
    durian.durianRetailer.retailerAddress = _retailerAddress;
    durian.durianRetailer.dateReceivedFromDistributionCenter = _dateReceivedFromDistributionCenter;
  }

  // Update date pass to consumer
  function updateDatePassToConsumer(address _durianAddress, int _datePassToConsumer) external view onlyRetailer {
    Durian memory durian = durians[_durianAddress];
    durian.durianRetailer.datePassToConsumer = _datePassToConsumer;
  }

  // Get durian information for retailer
  function getDurianInfoForRetailer(address _durianAddress) external view onlyRetailer returns (address, string memory, address, int, int, int, address, int, int, address, int, int) {
    Durian memory durian = durians[_durianAddress];
    return (
      durian.durianAddress,
      durian.durianType,
      durian.durianFarm.treeAddress,
      durian.durianFarm.harvestDate,
      durian.durianFarm.harvestTime,
      durian.durianFarm.datePassToDistributionCenter,
      durian.durianDistributionCenter.distributionCenterAddress,
      durian.durianDistributionCenter.dateReceivedFromFarm,
      durian.durianDistributionCenter.datePassToRetailer,
      durian.durianRetailer.retailerAddress,
      durian.durianRetailer.dateReceivedFromDistributionCenter,
      durian.durianRetailer.datePassToConsumer
    );
  }

  // Update durian information for consumer
  function updateDurianInfoForConsumer(address _durianAddress, int _dateReceivedFromRetailer) external view onlyConsumer {
    Durian memory durian = durians[_durianAddress];
    durian.durianConsumer.dateReceivedFromRetailer = _dateReceivedFromRetailer;
  }

  // Update durian rating
  function updateDurianRating(
    address _durianAddress, 
    uint _taste, 
    uint _fragrance, 
    uint _texture, 
    uint _creaminess, 
    uint _ripeness, 
    string memory _gradeRating, 
    string memory _comment
  ) external view onlyConsumer {
    Durian memory durian = durians[_durianAddress];
    durian.durianConsumer.rating.taste = RatingScale(_taste);
    durian.durianConsumer.rating.fragrance = RatingScale(_fragrance);
    durian.durianConsumer.rating.texture = RatingScale(_texture);
    durian.durianConsumer.rating.creaminess = RatingScale(_creaminess);
    durian.durianConsumer.rating.ripeness = RatingScale(_ripeness);
    durian.durianConsumer.rating.gradeRating = _gradeRating;
    durian.durianConsumer.rating.comment = _comment;
  }

  // ---------------------------------------------------------
  // |                     Farm function                     |
  // ---------------------------------------------------------
  // Create farm onlyby farmer
  function createFarm(
    address _owner, 
    string memory _name, 
    uint _operatingYears, 
    string memory _location
  ) external onlyAdmin {
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
    farmers[_userAddress] = _farmAddress;
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
  function createDistributionCenter(
    address _owner, 
    string memory _name, 
    uint _operatingYears, 
    string memory _location
  ) external onlyAdmin {
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
    distributors[_userAddress] = _distributionCenterAddress;
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

  // -------------------------------------------------------------
  // |                     Retailer function                     |
  // -------------------------------------------------------------
  // Get retailer information
  function getRetailerInfo(address _retailerAddress) external view onlyRetailer returns (address, string memory, string memory, uint, uint) {
    Retailer memory retailer = retailers[_retailerAddress];
    return (
      retailer.retailerAddress, 
      retailer.retailerName, 
      retailer.retailerLocation, 
      retailer.retailerOperatingYears, 
      retailer.lastPassingDate
    );
  }

  // Update retailer information (location and operating years)
  function updateRetailerInfo(address _retailerAddress, string memory _location, uint _operatingYears) external onlyRetailer {
    retailers[_retailerAddress].retailerLocation = _location;
    retailers[_retailerAddress].retailerOperatingYears = _operatingYears;
  }

  // -------------------------------------------------------------
  // |                     Consumer function                     |
  // -------------------------------------------------------------
  // Get consumer information
  function getConsumerInfo(address _consumerAddress) external view onlyConsumer returns (address, string memory, string memory) {
    Consumer memory consumer = consumers[_consumerAddress];
    return (
      consumer.consumerAddress, 
      consumer.consumerName, 
      consumer.consumerLocation
    );
  }
}