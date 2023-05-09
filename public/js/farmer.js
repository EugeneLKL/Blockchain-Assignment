//Connect to metamask
let account;

const accessToMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        document.getElementById("accountArea").innerHTML = account;
        console.log("Accessed");
    }
}

//Connet to smart contract
const accessToContract = async () => {
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_adminAddress",
                    "type": "address"
                }
            ],
            "name": "addAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_distributionCenterAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_userAddress",
                    "type": "address"
                }
            ],
            "name": "addDistributorToDistributionCenter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_userAddress",
                    "type": "address"
                }
            ],
            "name": "addFarmerToFarm",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_treeAddress",
                    "type": "address"
                }
            ],
            "name": "addTreeToFarm",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_userAddress",
                    "type": "address"
                },
                {
                    "internalType": "enum DurianTracing.Roles",
                    "name": "_role",
                    "type": "uint8"
                }
            ],
            "name": "assignRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_operatingYears",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                }
            ],
            "name": "createDistributionCenter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_type",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_treeAddress",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "_harvestDate",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "_harvestTime",
                    "type": "int256"
                }
            ],
            "name": "createDurian",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_operatingYears",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                }
            ],
            "name": "createFarm",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "createUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_adminAddress",
                    "type": "address"
                }
            ],
            "name": "removeAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_lastPassingDate",
                    "type": "uint256"
                }
            ],
            "name": "setLastPassingDate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_operatingYears",
                    "type": "uint256"
                }
            ],
            "name": "setOperatingYears",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "admins",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmerAddress",
                    "type": "address"
                }
            ],
            "name": "checkFarmerBelongsToFarm",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "consumers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "distributionCenters",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "distributionCenterAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "distributionCenterOwner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "distributionCenterName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "distributionCenterLocation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "distributionCenterOperatingYears",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastPassingDate",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "distributionCentersCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "distributors",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "durians",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "durianAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "durianType",
                    "type": "string"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "farmAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "treeAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "int256",
                            "name": "harvestDate",
                            "type": "int256"
                        },
                        {
                            "internalType": "int256",
                            "name": "harvestTime",
                            "type": "int256"
                        },
                        {
                            "internalType": "int256",
                            "name": "datePassToDistributionCenter",
                            "type": "int256"
                        }
                    ],
                    "internalType": "struct DurianTracing.DurianFarm",
                    "name": "durianFarm",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "distributionCenterAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "int256",
                            "name": "dateReceivedFromFarm",
                            "type": "int256"
                        },
                        {
                            "internalType": "int256",
                            "name": "datePassToRetailer",
                            "type": "int256"
                        }
                    ],
                    "internalType": "struct DurianTracing.DurianDistributionCenter",
                    "name": "durianDistributionCenter",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "duriansCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "farmers",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "farms",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "farmAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "farmOwner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "farmName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "farmLocation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "farmOperatingYears",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastPassingDate",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "farmsCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getConsumerAddressList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_distributionCenterAddress",
                    "type": "address"
                }
            ],
            "name": "getDistributionCenterInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDistributorAddressList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_durianAddress",
                    "type": "address"
                }
            ],
            "name": "getDurianInfoForFarmer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getFarmerAddressList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_farmAddress",
                    "type": "address"
                }
            ],
            "name": "getFarmInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRetailerAddressList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRoles",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_treeAddress",
                    "type": "address"
                }
            ],
            "name": "getTreeInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_userAddress",
                    "type": "address"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "retailers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "trees",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "treeAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "treeType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "lastHarvestDate",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "treesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_durianAddress",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "_datePassToDistributionCenter",
                    "type": "int256"
                }
            ],
            "name": "updateDatePassToDistributionCenter",
            "outputs": [],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_durianAddress",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "_datePassToRetailer",
                    "type": "int256"
                }
            ],
            "name": "updateDatePassToRetailer",
            "outputs": [],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_durianAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_distributionCenterAddress",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "_dateReceivedFromFarm",
                    "type": "int256"
                }
            ],
            "name": "updateDurianInfoForDistributor",
            "outputs": [],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "userName",
                    "type": "string"
                },
                {
                    "internalType": "enum DurianTracing.Roles",
                    "name": "userRole",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usersCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const Address = "0xe4032DD87E5e5C32bdBcAF7d700d88C5242c676B";
    window.web3 = await new Web3(window.ethereum); //how to access to smart contract 
    window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address
    document.getElementById("contractArea").innerHTML = "connected to smart contract";
}

//Create Durian
const createDurian = async () => {
    const durianType = document.getElementById("durianType").value;
    const treeAddress = document.getElementById("treeAddress").value;
    const harvestDate = document.getElementById("harvestDate").value;
    const harvestTime = document.getElementById("harvestTime").value;

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.createDurian(0x5beC575a5Ed74BC65a688a28269fcab697c60b8D, durianType, 0x10301934Ce4136F72657FbA1432Beb06fCa1174F, harvestDate, harvestTime).send({ from: account });
        console.log(result);
    }
}


//Display durian
const displayDurian = async () => {
    const data = await window.contract.methods.getDurianInfoForFarmer().call();

    document.getElementById("durianType").innerHTML = data[0];
    document.getElementById("treeAddress").innerHTML = data[1];
    document.getElementById("harvestDate").innerHTML = data[2];
    document.getElementById("harvestTime").innerHTML = data[3];
}