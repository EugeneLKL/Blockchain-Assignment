let account;
let noOfAccount = 0;

//Access to Metamask
const accessToMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
        account = accounts[0];
        document.getElementById("accountArea").innerHTML = account;
        console.log("Accessed");
    }
}

//Connect to smart contract
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
            "inputs": [],
            "name": "createOwner",
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
                    "name": "_retailerAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_operatingYears",
                    "type": "uint256"
                }
            ],
            "name": "updateRetailerInfo",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "consumers",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "consumerAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "consumerName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "consumerLocation",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "consumersCount",
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
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "retailerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "int256",
                            "name": "dateReceivedFromDistributionCenter",
                            "type": "int256"
                        },
                        {
                            "internalType": "int256",
                            "name": "datePassToConsumer",
                            "type": "int256"
                        }
                    ],
                    "internalType": "struct DurianTracing.DurianRetailer",
                    "name": "durianRetailer",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "consumerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "int256",
                            "name": "dateReceivedFromRetailer",
                            "type": "int256"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "enum DurianTracing.RatingScale",
                                    "name": "taste",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "enum DurianTracing.RatingScale",
                                    "name": "fragrance",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "enum DurianTracing.RatingScale",
                                    "name": "texture",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "enum DurianTracing.RatingScale",
                                    "name": "creaminess",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "enum DurianTracing.RatingScale",
                                    "name": "ripeness",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "string",
                                    "name": "gradeRating",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "comment",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct DurianTracing.Rating",
                            "name": "rating",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct DurianTracing.DurianConsumer",
                    "name": "durianConsumer",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_consumerAddress",
                    "type": "address"
                }
            ],
            "name": "getConsumerInfo",
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
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_distributorAddress",
                    "type": "address"
                }
            ],
            "name": "getDistributorDistributionCenter",
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
                    "name": "_durianAddress",
                    "type": "address"
                }
            ],
            "name": "getDurianInfoForConsumer",
            "outputs": [
                {
                    "components": [
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
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "retailerAddress",
                                    "type": "address"
                                },
                                {
                                    "internalType": "int256",
                                    "name": "dateReceivedFromDistributionCenter",
                                    "type": "int256"
                                },
                                {
                                    "internalType": "int256",
                                    "name": "datePassToConsumer",
                                    "type": "int256"
                                }
                            ],
                            "internalType": "struct DurianTracing.DurianRetailer",
                            "name": "durianRetailer",
                            "type": "tuple"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "consumerAddress",
                                    "type": "address"
                                },
                                {
                                    "internalType": "int256",
                                    "name": "dateReceivedFromRetailer",
                                    "type": "int256"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "enum DurianTracing.RatingScale",
                                            "name": "taste",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "enum DurianTracing.RatingScale",
                                            "name": "fragrance",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "enum DurianTracing.RatingScale",
                                            "name": "texture",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "enum DurianTracing.RatingScale",
                                            "name": "creaminess",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "enum DurianTracing.RatingScale",
                                            "name": "ripeness",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "gradeRating",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "comment",
                                            "type": "string"
                                        }
                                    ],
                                    "internalType": "struct DurianTracing.Rating",
                                    "name": "rating",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DurianTracing.DurianConsumer",
                            "name": "durianConsumer",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct DurianTracing.Durian",
                    "name": "",
                    "type": "tuple"
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
            "name": "getFarmerFarm",
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
            "name": "getOwner",
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
                    "name": "_retailerAddress",
                    "type": "address"
                }
            ],
            "name": "getRetailerInfo",
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
            "name": "getRoleList",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
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
                    "name": "_userAddress",
                    "type": "address"
                }
            ],
            "name": "getUserRole",
            "outputs": [
                {
                    "internalType": "enum DurianTracing.Roles",
                    "name": "",
                    "type": "uint8"
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
                    "internalType": "address",
                    "name": "retailerAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "retailerName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "retailerLocation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "retailerOperatingYears",
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
            "name": "retailersCount",
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
                    "name": "_datePassToConsumer",
                    "type": "int256"
                }
            ],
            "name": "updateDatePassToConsumer",
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
                    "internalType": "int256",
                    "name": "_dateReceivedFromRetailer",
                    "type": "int256"
                }
            ],
            "name": "updateDurianInfoForConsumer",
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
                    "internalType": "address",
                    "name": "_durianAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_retailerAddress",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "_dateReceivedFromDistributionCenter",
                    "type": "int256"
                }
            ],
            "name": "updateDurianInfoForRetailer",
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
                    "internalType": "uint256",
                    "name": "_taste",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_fragrance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_texture",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_creaminess",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_ripeness",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_gradeRating",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_comment",
                    "type": "string"
                }
            ],
            "name": "updateDurianRating",
            "outputs": [],
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

    const Address = "0x63009764D253b58eE1716023aFeca0F69C95e7F0";
    window.web3 = await new Web3(window.ethereum); //how to access to smart contract 
    window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address
    document.getElementById("contractArea").innerHTML = "connected to smart contract";
    const owner = await getOwner();
    if (owner == 0x0000000000000000000000000000000000000000) {
        createOwner();
    }
}

//Create owner when connect to smart contract (First user)
const createOwner = async () => {
    console.log("createOwner")
    if (window.ethereum !== "undefined") {
        const result = await window.contract.methods.createOwner().send({ from: account });
        console.log(result);
    }
}

const getOwner = async () => {
    if (window.ethereum !== "undefined") {
        const data = await window.contract.methods.getOwner().call();
        console.log(data);
        return data;
    }
}

// Create user when connect to smart contract (Subsequent users)
const createUser = async () => {
    console.log("createUser2")
    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.createUser("test").send({ from: account });
        console.log(result);
    }
}

//Assign role to user with connection to contract
const assignRole = async () => {
    const userAddress = document.getElementById("userAddress").value;
    const userRole = document.getElementById("userRole").value;
    const userRole2 = await getUserRole();
    console.log(account);
    console.log(userRole2);

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.assignRole(userAddress, userRole).send({ from: account });
        console.log(result);
    }
}

//Create farm with connection to contract
const createFarm = async () => {
    const farmOwner = document.getElementById("farmOwner").value;
    const farmName = document.getElementById("farmName").value;
    const farmOperatingYears = document.getElementById("farmOperatingYears").value;
    const farmLocation = document.getElementById("farmLocation").value;

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.createFarm(farmOwner, farmName, farmOperatingYears, farmLocation).send({ from: account });
        console.log(result);
    }
}

// Get farm
const getFarmInfo = async () => {

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.getFarmInfo(farmAddress).call();
        console.log(result);
    }
}

// Create distribution center
const createDistributionCenter = async () => {
    const distributionCenterOwner = document.getElementById("distributionCenterOwner").value;
    const distributionCenterName = document.getElementById("distributionCenterName").value;
    const distributionCenterOperatingYears = document.getElementById("distributionCenterOperatingYears").value;
    const distributionCenterLocation = document.getElementById("distributionCenterLocation").value;

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.createDistributionCenter(distributionCenterOwner, distributionCenterName, distributionCenterOperatingYears, distributionCenterLocation).send({ from: account });
        console.log(result);
    }
}

// Get roles
const getUserRole = async () => {
    const userAddress = document.getElementById("userAddress").value;

    if (window.ethereum !== "undefined") {
        console.log(window.contract.methods);
        const result = await window.contract.methods.getUserRole(userAddress).call();
        console.log(result);
    }
}

