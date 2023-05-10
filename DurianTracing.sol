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
        uint farmID;
        address treeAddress;
        int harvestDate;
        int harvestTime;
        int datePassToDistributionCenter;
				address distributionCenterAddress;
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
        string treeAddress;
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
        string[] trees;
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
    mapping(address => address) public distributors; // mapping(distributionCenterAddress => distributorAddress)

    uint public treesCount;
    mapping(string => Tree) public trees; // mapping(treeId => tree)

    uint public duriansCount;
    mapping(address => Durian) public durians; // mapping(durianAddress => durian)
		address[] durianAddresses;

    uint public farmsCount;
    mapping(uint => Farm) public farms; // mapping(farmID => farm)
		uint[] farmAddresses;

    uint public distributionCentersCount;
    mapping(address => DistributionCenter) public distributionCenters; // mapping(distributionCenterAddress => distributionCenter)
		address[] distributionCenterAddresses;

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
            distributors[msg.sender] !=
                0x0000000000000000000000000000000000000000,
            "Only distributor can call this function"
        );
        _;
    }

    // OnlyBy modifier for retailers
    modifier onlyRetailer() {
        require(
            retailers[msg.sender].retailerAddress !=
                0x0000000000000000000000000000000000000000,
            "Only retailer can call this function"
        );
        _;
    }

    // OnlyBy modifier for consumers
    modifier onlyConsumer() {
        require(
            consumers[msg.sender].consumerAddress !=
                0x0000000000000000000000000000000000000000,
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
    modifier onlyDistributionCentreOwner(address _distributionCenterAddress) {
        require(
            msg.sender ==
                distributionCenters[_distributionCenterAddress]
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

    // Get user
    function getUser(
        address _userAddress
    ) external view returns (address, string memory, uint) {
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
						retailerAddresses.push(_userAddress);
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
    function getFarmerFarm(
        address _farmerAddress
    ) external view returns (uint) {
        return farmers[_farmerAddress];
    }

    // Check distributor belongs to which distribution center
    function getDistributorDistributionCenter(
        address _distributorAddress
    ) external view returns (address) {
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
        address _treeAddress,
        int _harvestDate,
        int _harvestTime
    ) external onlyFarmer {
        DurianFarm memory durianFarm = DurianFarm({
            farmID: _farmID,
            treeAddress: _treeAddress,
            harvestDate: _harvestDate,
            harvestTime: _harvestTime,
            datePassToDistributionCenter: 0,
						distributionCenterAddress: address(0)
        });

        Durian memory durian = Durian({
            durianAddress: address(this),
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
        durians[durian.durianAddress] = durian;
        duriansCount++;
				durianAddresses.push(durian.durianAddress);
    }

    // Update date pass to distribution center
    function updateDatePassToDistributionCenter(
        address _durianAddress,
        int _datePassToDistributionCenter,
				address _distributionCenterAddress
    ) external view onlyFarmer {
        Durian memory durian = durians[_durianAddress];
        durian
            .durianFarm
            .datePassToDistributionCenter = _datePassToDistributionCenter;
				durian.durianFarm.distributionCenterAddress = _distributionCenterAddress;
    }

    // Update durian information for distributor
    function updateDurianInfoForDistributor(
        address _durianAddress,
        int _dateReceivedFromFarm
    ) external view onlyDistributor {
        Durian memory durian = durians[_durianAddress];
        durian
            .durianDistributionCenter
            .dateReceivedFromFarm = _dateReceivedFromFarm;
    }

    // Update date pass to retailer
    function updateDatePassToRetailer(
        address _durianAddress,
        int _datePassToRetailer,
				address _retailerAddress
    ) external view onlyDistributor {
        Durian memory durian = durians[_durianAddress];
        durian
            .durianDistributionCenter
            .datePassToRetailer = _datePassToRetailer;
				durian.durianDistributionCenter.retailerAddress = _retailerAddress;
    }

    // Update durian information for retailer
    function updateDurianInfoForRetailer(
        address _durianAddress,
        int _dateReceivedFromDistributionCenter
    ) external view onlyRetailer {
        Durian memory durian = durians[_durianAddress];
        durian
            .durianRetailer
            .dateReceivedFromDistributionCenter = _dateReceivedFromDistributionCenter;
    }

    // Update date pass to consumer
    function updateDatePassToConsumer(
        address _durianAddress,
        int _datePassToConsumer,
				address _consumerAddress
    ) external view onlyRetailer {
        Durian memory durian = durians[_durianAddress];
        durian.durianRetailer.datePassToConsumer = _datePassToConsumer;
				durian.durianRetailer.consumerAddress = _consumerAddress;
    }

    // Update durian information for consumer
    function updateDurianInfoForConsumer(
        address _durianAddress,
        int _dateReceivedFromRetailer
    ) external view onlyConsumer {
        Durian memory durian = durians[_durianAddress];
        durian
            .durianConsumer
            .dateReceivedFromRetailer = _dateReceivedFromRetailer;
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

    // Get durian information for consumer
    function getDurianInfoForConsumer(
        address _durianAddress
    ) external view onlyConsumer returns (Durian memory) {
        return durians[_durianAddress];
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
            trees: new string[](0),
            lastPassingDate: 0
        });

        // Add farm to mapping
        farms[farm.farmID] = farm;
        farmsCount++;
				farmAddresses.push(farm.farmID);

        // Add owner to farmer list
        farmers[_owner] = farm.farmID;
    }

    // Get farm owner
    function getFarmOwner(
        uint _farmID
    ) external view returns (address) {
        return farms[_farmID].farmOwner;
    }

    // Get farm information
    // function getFarmInfo(
    //     address _farmAddress
    // )
    //     external
    //     view
    //     onlyFarmer
    //     returns (
    //         address,
    //         address,
    //         string memory,
    //         string memory,
    //         uint,
    //         address[] memory,
    //         string[] memory,
    //         uint
    //     )
    // {
    //     Farm memory farm = farms[_farmAddress];
    //     return (
    //         farm.farmAddress,
    //         farm.farmOwner,
    //         farm.farmName,
    //         farm.farmLocation,
    //         farm.farmOperatingYears,
    //         farm.farmers,
    //         farm.trees,
    //         farm.lastPassingDate
    //     );
    // }

    // Add farmer to farm
    function addFarmerToFarm(
        uint _farmID,
        address _userAddress
    ) external onlyFarmOwner(_farmID) {
        farms[_farmID].farmers.push(_userAddress);
        farmers[_userAddress] = _farmID;
    }

    // Set last passing date
    function setLastPassingDate(
        uint _farmID,
        uint _lastPassingDate
    ) external onlyFarmOwner(_farmID) {
        farms[_farmID].lastPassingDate = _lastPassingDate;
    }

    // Update operating years
    function setOperatingYears(
        uint _farmID,
        uint _operatingYears
    ) external onlyFarmOwner(_farmID) {
        farms[_farmID].farmOperatingYears = _operatingYears;
    }

    // Add tree to farm
    function addTreeToFarm(
        uint _farmID,
        string memory _treeID
    ) external onlyFarmer {
        Tree memory tree = Tree({
            treeAddress: _treeID,
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
            distributionCenterAddress: address(this),
            distributionCenterOwner: _owner,
            distributionCenterName: _name,
            distributionCenterLocation: _location,
            distributionCenterOperatingYears: _operatingYears,
            distributors: new address[](0),
            lastPassingDate: 0
        });

        // Add distribution center to mapping
        distributionCenters[
            distributionCenter.distributionCenterAddress
        ] = distributionCenter;
        distributionCentersCount++;
				distributionCenterAddresses.push(distributionCenter.distributionCenterAddress);

        // Add owner to distributor list
        distributors[_owner] = distributionCenter.distributionCenterAddress;
    }

    // Get distribution center owner
    function getDistributionCenterOwner(
        address _distributionCenterAddress
    ) external view returns (address) {
        return
            distributionCenters[_distributionCenterAddress]
                .distributionCenterOwner;
    }

    // Add distributor to distribution center
    function addDistributorToDistributionCenter(
        address _distributionCenterAddress,
        address _userAddress
    ) external onlyDistributionCentreOwner(_distributionCenterAddress) {
        distributionCenters[_distributionCenterAddress].distributors.push(
            _userAddress
        );
        distributors[_userAddress] = _distributionCenterAddress;
    }

    // // Get distribution center information
    // function getDistributionCenterInfo(
    //     address _distributionCenterAddress
    // )
    //     external
    //     view
    //     onlyDistributor
    //     returns (
    //         address,
    //         address,
    //         string memory,
    //         string memory,
    //         uint,
    //         address[] memory,
    //         uint
    //     )
    // {
    //     DistributionCenter memory distributionCenter = distributionCenters[
    //         _distributionCenterAddress
    //     ];
    //     return (
    //         distributionCenter.distributionCenterAddress,
    //         distributionCenter.distributionCenterOwner,
    //         distributionCenter.distributionCenterName,
    //         distributionCenter.distributionCenterLocation,
    //         distributionCenter.distributionCenterOperatingYears,
    //         distributionCenter.distributors,
    //         distributionCenter.lastPassingDate
    //     );
    // }

		// Get all distribution center addresses
		function getDistributionCenterAddresses() external view returns (address[] memory) {
			return distributionCenterAddresses;
			// DistributionCenter[] memory distributionCenter = new DistributionCenter[](distributionCenterAddresses.length);
			// for (uint i = 0; i < distributionCenterAddresses.length; i++) {
			// 	distributionCenter[i] = distributionCenters[distributionCenterAddresses[i]];
			// }
			// return (distributionCenter);
		}

    // -------------------------------------------------------------
    // |                     Retailer function                     |
    // -------------------------------------------------------------
    // Get retailer information
    // function getRetailerInfo(
    //     address _retailerAddress
    // )
    //     external
    //     view
    //     onlyRetailer
    //     returns (address, string memory, string memory, uint, uint)
    // {
    //     Retailer memory retailer = retailers[_retailerAddress];
    //     return (
    //         retailer.retailerAddress,
    //         retailer.retailerName,
    //         retailer.retailerLocation,
    //         retailer.retailerOperatingYears,
    //         retailer.lastPassingDate
    //     );
    // }

    // Update retailer information (location and operating years)
    function updateRetailerInfo(
        address _retailerAddress,
        string memory _location,
        uint _operatingYears
    ) external onlyRetailer {
        retailers[_retailerAddress].retailerLocation = _location;
        retailers[_retailerAddress].retailerOperatingYears = _operatingYears;
    }

    // -------------------------------------------------------------
    // |                     Consumer function                     |
    // -------------------------------------------------------------
    // Get consumer information
    // function getConsumerInfo(
    //     address _consumerAddress
    // )
    //     external
    //     view
    //     onlyConsumer
    //     returns (address, string memory, string memory)
    // {
    //     Consumer memory consumer = consumers[_consumerAddress];
    //     return (
    //         consumer.consumerAddress,
    //         consumer.consumerName,
    //         consumer.consumerLocation
    //     );
    // }
}
