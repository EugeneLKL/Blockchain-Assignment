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
        uint durianID;
        string durianType;
        DurianFarm durianFarm;
        DurianDistributionCenter durianDistributionCenter;
        DurianRetailer durianRetailer;
        DurianConsumer durianConsumer;
    }

    struct DurianFarm {
        uint farmID;
        uint treeID;
        int harvestDateTime;
        int datePassToDistributionCenter;
        uint distributionCenterID;
    }

    struct DurianDistributionCenter {
        int dateReceivedFromFarm;
        int datePassToRetailer;
        address retailerAddress;
    }

    struct DurianRetailer {
        int dateReceivedFromDistributionCenter;
        int datePassToConsumer;
        address consumerAddress;
    }

    struct DurianConsumer {
        int dateReceivedFromRetailer;
        Rating rating;
    }

    struct Tree {
        uint treeID;
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
        uint farmID;
        address farmOwner;
        string farmName;
        string farmLocation;
        uint farmOperatingYears;
        address[] farmers;
        uint[] trees;
    }

    struct DistributionCenter {
        uint distributionCenterID;
        address distributionCenterOwner;
        string distributionCenterName;
        string distributionCenterLocation;
        uint distributionCenterOperatingYears;
        address[] distributors;
    }

    struct Retailer {
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
    mapping(address => uint) public farmers; // mapping(farmerAddress => farmID)
    mapping(address => uint) public distributors; // mapping(distributorAddress => distributionCenterID)

    uint public treesCount;
    mapping(uint => Tree) public trees; // mapping(treeId => tree)

    uint public duriansCount;
    mapping(uint => Durian) public durians; // mapping(durianId => durian)
    uint[] durianIDs;

    uint public farmsCount;
    mapping(uint => Farm) public farms; // mapping(farmID => farm)
    uint[] farmIDs;

    uint public distributionCentersCount;
    mapping(uint => DistributionCenter) public distributionCenters; // mapping(distributionCenterID => distributionCenter)
    uint[] distributionCenterIDs;

    uint public retailersCount;
    mapping(address => Retailer) public retailers; // mapping(retailerAddress => retailer)
    address[] retailerAddresses;

    uint public consumersCount;
    mapping(address => Consumer) public consumers; // mapping(consumerAddress => consumer)
    address[] consumerAddresses;

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
        require(
            msg.sender == contractOwner,
            "Only contract owner can call this function"
        );
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
            users[msg.sender].userRole == Roles.Farmer,
            "Only farmer can call this function"
        );
        _;
    }

    // OnlyBy modifier for distributors
    modifier onlyDistributor() {
        require(
            users[msg.sender].userRole == Roles.Distributor,
            "Only distributor can call this function"
        );
        _;
    }

    // OnlyBy modifier for retailers
    modifier onlyRetailer() {
        require(
            users[msg.sender].userRole == Roles.Retailer,
            "Only retailer can call this function"
        );
        _;
    }

    // OnlyBy modifier for consumers
    modifier onlyConsumer() {
        require(
            users[msg.sender].userRole == Roles.Consumer,
            "Only consumer can call this function"
        );
        _;
    }

    // OnlyBy modifier for farm owners
    modifier onlyFarmOwner(uint _farmID) {
        require(
            msg.sender == farms[_farmID].farmOwner,
            "Only the owner of the farm can perform this action."
        );
        _;
    }

    // OnlyBy modifier for distribution center owners
    modifier onlyDistributionCentreOwner(uint _distributionCenterID) {
        require(
            msg.sender ==
                distributionCenters[_distributionCenterID]
                    .distributionCenterOwner,
            "Only the owner of the distribution centre can perform this action."
        );
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
        consumerAddresses.push(msg.sender);
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
            retailerAddresses.push(_userAddress);
        }
    }

    // Get user role
    function getUserRole(address _userAddress) external view returns (Roles) {
        if (admins[_userAddress]) return Roles.Admin; 
        return users[_userAddress].userRole;
    }

    // Check farmer belongs to which farm
    function getFarmerFarm(
        address _farmerAddress
    ) external view returns (uint) {
        return farmers[_farmerAddress];
    }

    // Check distributor belongs to which distribution center
    function getDistributorDistributionCenter(
        address _distributorAddress
    ) external view returns (uint) {
        return distributors[_distributorAddress];
    }

    // Check whether address is user
    function isUser(address _userAddress) external view returns (bool) {
        return users[_userAddress].userAddress != address(0);
    }

    // -----------------------------------------------------------
    // |                     Durian function                     |
    // -----------------------------------------------------------
    // Create durian onlyby farm
    function createDurian(
        uint _farmID,
        string memory _type,
        uint _treeID,
        int _harvestDateTime
    ) external onlyFarmer {
        DurianFarm memory durianFarm = DurianFarm({
            farmID: _farmID,
            treeID: _treeID,
            harvestDateTime: _harvestDateTime,
            datePassToDistributionCenter: 0,
            distributionCenterID: 0
        });

        Durian memory durian = Durian({
            durianID: duriansCount + 1,
            durianType: _type,
            durianFarm: durianFarm,
            durianDistributionCenter: DurianDistributionCenter({
                dateReceivedFromFarm: 0,
                datePassToRetailer: 0,
                retailerAddress: address(0)
            }),
            durianRetailer: DurianRetailer({
                dateReceivedFromDistributionCenter: 0,
                datePassToConsumer: 0,
                consumerAddress: address(0)
            }),
            durianConsumer: DurianConsumer({
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
        durians[durian.durianID] = durian;
        duriansCount++;
        durianIDs.push(durian.durianID);
    }

    // Update date pass to distribution center
    function updateDatePassToDistributionCenter(
        uint _durianID,
        int _datePassToDistributionCenter,
        uint _distributionCenterID
    ) external onlyFarmer {
        durians[_durianID]
            .durianFarm
            .datePassToDistributionCenter = _datePassToDistributionCenter;
        durians[_durianID].durianFarm.distributionCenterID = _distributionCenterID;
    }

    // Update durian information for distributor
    function updateDurianInfoForDistributor(
        uint _durianID,
        int _dateReceivedFromFarm
    ) external onlyDistributor {
        durians[_durianID]
            .durianDistributionCenter
            .dateReceivedFromFarm = _dateReceivedFromFarm;
    }

    // Update date pass to retailer
    function updateDatePassToRetailer(
        uint _durianID,
        int _datePassToRetailer,
        address _retailerAddress
    ) external onlyDistributor {
        durians[_durianID]
            .durianDistributionCenter
            .datePassToRetailer = _datePassToRetailer;
        durians[_durianID].durianDistributionCenter.retailerAddress = _retailerAddress;
    }

    // Update durian information for retailer
    function updateDurianInfoForRetailer(
        uint _durianID,
        int _dateReceivedFromDistributionCenter
    ) external onlyRetailer {
        durians[_durianID]
            .durianRetailer
            .dateReceivedFromDistributionCenter = _dateReceivedFromDistributionCenter;
    }

    // Update date pass to consumer
    function updateDatePassToConsumer(
        uint _durianID,
        int _datePassToConsumer,
        address _consumerAddress
    ) external onlyRetailer {
        durians[_durianID].durianRetailer.datePassToConsumer = _datePassToConsumer;
        durians[_durianID].durianRetailer.consumerAddress = _consumerAddress;
    }

    // Update durian information for consumer
    function updateDurianInfoForConsumer(
        uint _durianID,
        int _dateReceivedFromRetailer
    ) external onlyConsumer {
        durians[_durianID]
            .durianConsumer
            .dateReceivedFromRetailer = _dateReceivedFromRetailer;
    }

    // Update durian rating
    function updateDurianRating(
        uint _durianID,
        uint _taste,
        uint _fragrance,
        uint _texture,
        uint _creaminess,
        uint _ripeness,
        string memory _gradeRating,
        string memory _comment
    ) external onlyConsumer {
        durians[_durianID].durianConsumer.rating.taste = RatingScale(_taste);
        durians[_durianID].durianConsumer.rating.fragrance = RatingScale(_fragrance);
        durians[_durianID].durianConsumer.rating.texture = RatingScale(_texture);
        durians[_durianID].durianConsumer.rating.creaminess = RatingScale(_creaminess);
        durians[_durianID].durianConsumer.rating.ripeness = RatingScale(_ripeness);
        durians[_durianID].durianConsumer.rating.gradeRating = _gradeRating;
        durians[_durianID].durianConsumer.rating.comment = _comment;
    }

    // Get durian information for consumer
    function getDurianInfoForConsumer(
        uint _durianID
    ) external view returns (Durian memory) {
        return durians[_durianID];
    }

    // Get durian list
    function getDurian() external view returns (Durian[] memory) {
        Durian[] memory durian = new Durian[](durianIDs.length);
        for (uint i = 0; i < durianIDs.length; i++) {
            durian[i] = durians[durianIDs[i]];
        }
        return (durian);
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
            farmID: farmsCount + 1,
            farmOwner: _owner,
            farmName: _name,
            farmLocation: _location,
            farmOperatingYears: _operatingYears,
            farmers: new address[](0),
            trees: new uint[](0)
        });

        // Add farm to mapping
        farms[farm.farmID] = farm;
        farmsCount++;
        farmIDs.push(farm.farmID);

        // Add owner to farmer list
        farmers[_owner] = farm.farmID;
    }

    // Get farm owner
    function getFarmOwner(uint _farmID) external view returns (address) {
        return farms[_farmID].farmOwner;
    }

    // Add farmer to farm
    function addFarmerToFarm(
        uint _farmID,
        address _userAddress
    ) external onlyFarmOwner(_farmID) {
        farms[_farmID].farmers.push(_userAddress);
        farmers[_userAddress] = _farmID;
    }

    // Add tree to farm
    function addTreeToFarm(
        uint _farmID,
        uint _treeID
    ) external onlyFarmer {
        Tree memory tree = Tree({
            treeID: _treeID,
            treeType: "Durian",
            lastHarvestDate: 0
        });

        farms[_farmID].trees.push(_treeID);
        trees[_treeID] = tree;
        treesCount++;
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
            distributionCenterID: distributionCentersCount + 1,
            distributionCenterOwner: _owner,
            distributionCenterName: _name,
            distributionCenterLocation: _location,
            distributionCenterOperatingYears: _operatingYears,
            distributors: new address[](0)
        });

        // Add distribution center to mapping
        distributionCenters[
            distributionCenter.distributionCenterID
        ] = distributionCenter;
        distributionCentersCount++;
        distributionCenterIDs.push(distributionCenter.distributionCenterID);

        // Add owner to distributor list
        distributors[_owner] = distributionCenter.distributionCenterID;
    }

    // Get distribution center owner
    function getDistributionCenterOwner(
        uint _distributionCenterID
    ) external view returns (address) {
        return
            distributionCenters[_distributionCenterID].distributionCenterOwner;
    }

    // Add distributor to distribution center
    function addDistributorToDistributionCenter(
        uint _distributionCenterID,
        address _userAddress
    ) external onlyDistributionCentreOwner(_distributionCenterID) {
        distributionCenters[_distributionCenterID].distributors.push(
            _userAddress
        );
        distributors[_userAddress] = _distributionCenterID;
    }

    // Get all distribution center IDs
    function getDistributionCenterIDs() external view returns (DistributionCenter[] memory) {
        // return distributionCenterIDs;
        DistributionCenter[] memory distributionCenter = new DistributionCenter[](distributionCenterIDs.length);
        for (uint i = 0; i < distributionCenterIDs.length; i++) {
        	distributionCenter[i] = distributionCenters[distributionCenterIDs[i]];
        }
        return (distributionCenter);
    }

    // -------------------------------------------------------------
    // |                     Retailer function                     |
    // -------------------------------------------------------------
    // Update retailer information (location and operating years)
    function updateRetailerInfo(
        address _retailerAddress,
        string memory _location,
        uint _operatingYears
    ) external onlyRetailer {
        retailers[_retailerAddress].retailerLocation = _location;
        retailers[_retailerAddress].retailerOperatingYears = _operatingYears;
    }

    // Get retailers
    function getRetailers() external view returns (Retailer[] memory) {
        Retailer[] memory retailer = new Retailer[](retailerAddresses.length);
        for (uint i = 0; i < retailerAddresses.length; i++) {
        	retailer[i] = retailers[retailerAddresses[i]];
        }
        return (retailer);
    }

    // -------------------------------------------------------------
    // |                     Consumer function                     |
    // -------------------------------------------------------------
    // Get consumers
    function getConsumers() external view returns (Consumer[] memory) {
        Consumer[] memory consumer = new Consumer[](consumerAddresses.length);
        for (uint i = 0; i < consumerAddresses.length; i++) {
        	consumer[i] = consumers[consumerAddresses[i]];
        }
        return (consumer);
    }
}
