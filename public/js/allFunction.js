let account;
let noOfAccount = 0;

const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_adminAddress',
        type: 'address',
      },
    ],
    name: 'addAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_distributionCenterAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'addDistributorToDistributionCenter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'addFarmerToFarm',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_treeID',
        type: 'string',
      },
    ],
    name: 'addTreeToFarm',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'admins',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
      {
        internalType: 'enum DurianTracing.Roles',
        name: '_role',
        type: 'uint8',
      },
    ],
    name: 'assignRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'consumers',
    outputs: [
      {
        internalType: 'address',
        name: 'consumerAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'consumerName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'consumerLocation',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'consumersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_operatingYears',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
    ],
    name: 'createDistributionCenter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_type',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_treeAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_harvestDate',
        type: 'int256',
      },
      {
        internalType: 'int256',
        name: '_harvestTime',
        type: 'int256',
      },
    ],
    name: 'createDurian',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_operatingYears',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
    ],
    name: 'createFarm',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'createOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'createUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'distributionCenters',
    outputs: [
      {
        internalType: 'address',
        name: 'distributionCenterAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'distributionCenterOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'distributionCenterName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'distributionCenterLocation',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'distributionCenterOperatingYears',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastPassingDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'distributionCentersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'distributors',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'durians',
    outputs: [
      {
        internalType: 'address',
        name: 'durianAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'durianType',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'farmID',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'treeAddress',
            type: 'address',
          },
          {
            internalType: 'int256',
            name: 'harvestDate',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'harvestTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'datePassToDistributionCenter',
            type: 'int256',
          },
          {
            internalType: 'address',
            name: 'distributionCenterAddress',
            type: 'address',
          },
        ],
        internalType: 'struct DurianTracing.DurianFarm',
        name: 'durianFarm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int256',
            name: 'dateReceivedFromFarm',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'datePassToRetailer',
            type: 'int256',
          },
          {
            internalType: 'address',
            name: 'retailerAddress',
            type: 'address',
          },
        ],
        internalType: 'struct DurianTracing.DurianDistributionCenter',
        name: 'durianDistributionCenter',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int256',
            name: 'dateReceivedFromDistributionCenter',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'datePassToConsumer',
            type: 'int256',
          },
          {
            internalType: 'address',
            name: 'consumerAddress',
            type: 'address',
          },
        ],
        internalType: 'struct DurianTracing.DurianRetailer',
        name: 'durianRetailer',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int256',
            name: 'dateReceivedFromRetailer',
            type: 'int256',
          },
          {
            components: [
              {
                internalType: 'enum DurianTracing.RatingScale',
                name: 'taste',
                type: 'uint8',
              },
              {
                internalType: 'enum DurianTracing.RatingScale',
                name: 'fragrance',
                type: 'uint8',
              },
              {
                internalType: 'enum DurianTracing.RatingScale',
                name: 'texture',
                type: 'uint8',
              },
              {
                internalType: 'enum DurianTracing.RatingScale',
                name: 'creaminess',
                type: 'uint8',
              },
              {
                internalType: 'enum DurianTracing.RatingScale',
                name: 'ripeness',
                type: 'uint8',
              },
              {
                internalType: 'string',
                name: 'gradeRating',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'comment',
                type: 'string',
              },
            ],
            internalType: 'struct DurianTracing.Rating',
            name: 'rating',
            type: 'tuple',
          },
        ],
        internalType: 'struct DurianTracing.DurianConsumer',
        name: 'durianConsumer',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'duriansCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'farmers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'farms',
    outputs: [
      {
        internalType: 'uint256',
        name: 'farmID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'farmOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'farmName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'farmLocation',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'farmOperatingYears',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastPassingDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'farmsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDistributionCenterAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_distributionCenterAddress',
        type: 'address',
      },
    ],
    name: 'getDistributionCenterOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_distributorAddress',
        type: 'address',
      },
    ],
    name: 'getDistributorDistributionCenter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
    ],
    name: 'getDurianInfoForConsumer',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'durianAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'durianType',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'farmID',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'treeAddress',
                type: 'address',
              },
              {
                internalType: 'int256',
                name: 'harvestDate',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'harvestTime',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'datePassToDistributionCenter',
                type: 'int256',
              },
              {
                internalType: 'address',
                name: 'distributionCenterAddress',
                type: 'address',
              },
            ],
            internalType: 'struct DurianTracing.DurianFarm',
            name: 'durianFarm',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int256',
                name: 'dateReceivedFromFarm',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'datePassToRetailer',
                type: 'int256',
              },
              {
                internalType: 'address',
                name: 'retailerAddress',
                type: 'address',
              },
            ],
            internalType: 'struct DurianTracing.DurianDistributionCenter',
            name: 'durianDistributionCenter',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int256',
                name: 'dateReceivedFromDistributionCenter',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'datePassToConsumer',
                type: 'int256',
              },
              {
                internalType: 'address',
                name: 'consumerAddress',
                type: 'address',
              },
            ],
            internalType: 'struct DurianTracing.DurianRetailer',
            name: 'durianRetailer',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'int256',
                name: 'dateReceivedFromRetailer',
                type: 'int256',
              },
              {
                components: [
                  {
                    internalType: 'enum DurianTracing.RatingScale',
                    name: 'taste',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DurianTracing.RatingScale',
                    name: 'fragrance',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DurianTracing.RatingScale',
                    name: 'texture',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DurianTracing.RatingScale',
                    name: 'creaminess',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DurianTracing.RatingScale',
                    name: 'ripeness',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'gradeRating',
                    type: 'string',
                  },
                  {
                    internalType: 'string',
                    name: 'comment',
                    type: 'string',
                  },
                ],
                internalType: 'struct DurianTracing.Rating',
                name: 'rating',
                type: 'tuple',
              },
            ],
            internalType: 'struct DurianTracing.DurianConsumer',
            name: 'durianConsumer',
            type: 'tuple',
          },
        ],
        internalType: 'struct DurianTracing.Durian',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
    ],
    name: 'getFarmOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_farmerAddress',
        type: 'address',
      },
    ],
    name: 'getFarmerFarm',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRoleList',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'getUserRole',
    outputs: [
      {
        internalType: 'enum DurianTracing.Roles',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'isUser',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_adminAddress',
        type: 'address',
      },
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'retailers',
    outputs: [
      {
        internalType: 'address',
        name: 'retailerAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'retailerName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'retailerLocation',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'retailerOperatingYears',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastPassingDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retailersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lastPassingDate',
        type: 'uint256',
      },
    ],
    name: 'setLastPassingDate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_farmID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_operatingYears',
        type: 'uint256',
      },
    ],
    name: 'setOperatingYears',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'trees',
    outputs: [
      {
        internalType: 'string',
        name: 'treeAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'treeType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'lastHarvestDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_datePassToConsumer',
        type: 'int256',
      },
      {
        internalType: 'address',
        name: '_consumerAddress',
        type: 'address',
      },
    ],
    name: 'updateDatePassToConsumer',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_datePassToDistributionCenter',
        type: 'int256',
      },
      {
        internalType: 'address',
        name: '_distributionCenterAddress',
        type: 'address',
      },
    ],
    name: 'updateDatePassToDistributionCenter',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_datePassToRetailer',
        type: 'int256',
      },
      {
        internalType: 'address',
        name: '_retailerAddress',
        type: 'address',
      },
    ],
    name: 'updateDatePassToRetailer',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_dateReceivedFromRetailer',
        type: 'int256',
      },
    ],
    name: 'updateDurianInfoForConsumer',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_dateReceivedFromFarm',
        type: 'int256',
      },
    ],
    name: 'updateDurianInfoForDistributor',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'int256',
        name: '_dateReceivedFromDistributionCenter',
        type: 'int256',
      },
    ],
    name: 'updateDurianInfoForRetailer',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_durianAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_taste',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fragrance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_texture',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_creaminess',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_ripeness',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_gradeRating',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_comment',
        type: 'string',
      },
    ],
    name: 'updateDurianRating',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_retailerAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_operatingYears',
        type: 'uint256',
      },
    ],
    name: 'updateRetailerInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'userName',
        type: 'string',
      },
      {
        internalType: 'enum DurianTracing.Roles',
        name: 'userRole',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const Address = '0x4f4fd4Bd322EBA3520F18139DD742a38827211C6';

const firstAccessToMetamask = async () => {
  if (window.ethereum !== 'undefined') {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById('accountArea').innerHTML = account;
    console.log('Accessed');
  }
};

const firstAccessToContract = async () => {
  window.web3 = await new Web3(window.ethereum); //how to access to smart contract
  window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address
  document.getElementById('contractArea').innerHTML =
    'Connected to smart contract';
  const owner = await getOwner();
  if (owner == 0x0000000000000000000000000000000000000000) {
    await createOwner();
    return true;
  }
  return false;
};

//Access to Metamask
const accessToMetamask = async () => {
  if (window.ethereum !== 'undefined') {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    console.log('Accessed');
  }
};

//Connect to smart contract
const accessToContract = async () => {
  window.web3 = await new Web3(window.ethereum); //how to access to smart contract
  window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address
  const owner = await getOwner();
  if (owner == 0x0000000000000000000000000000000000000000) {
    await createOwner();
  }
};

//Create owner when connect to smart contract (First user)
const createOwner = async () => {
  console.log('createOwner');
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .createOwner()
      .send({ from: account });
  }
};

const getOwner = async () => {
  if (window.ethereum !== 'undefined') {
    const data = await window.contract.methods.getOwner().call();
    return data;
  }
};

// Create user when connect to smart contract (Subsequent users)
const createUser = async () => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .createUser('test')
      .send({ from: account });
  }
};

const isUser = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods.isUser(address).call();
    return result;
  }
};

/////////////////////////////////////////////////////////////
// ADMIN
/////////////////////////////////////////////////////////////

//Assign role to user with connection to contract
const assignRole = async () => {
  const userAddress = document.getElementById('userAddress').value;
  const userRole = document.getElementById('userRole').value;
  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .assignRole(userAddress, userRole)
      .send({ from: account });
    console.log(result);
  }
};

// Get user roles
const getUserRole = async () => {
  const userAddress = document.getElementById('userAddress').value;
  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .getUserRole(userAddress)
      .call();
    let roleName;
    if (result == 0) {
      roleName = 'Owner';
    } else if (result == 1) {
      roleName = 'Farmer';
    } else if (result == 2) {
      roleName = 'Distributor';
    } else if (result == 3) {
      roleName = 'Retailer';
    } else if (result == 4) {
      roleName = 'Consumer';
    }
    return roleName;
  }
};

const getRole = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods.getUserRole(address).call();
    let roleName;
    if (result == 0) {
      roleName = 'Owner';
    } else if (result == 1) {
      roleName = 'Farmer';
    } else if (result == 2) {
      roleName = 'Distributor';
    } else if (result == 3) {
      roleName = 'Retailer';
    } else if (result == 4) {
      roleName = 'Consumer';
    }
    return roleName;
  }
};

//Create farm with connection to contract
const createFarm = async () => {
  const farmID = document.getElementById('farmID').value;
  const farmOwner = document.getElementById('farmOwner').value;
  const farmName = document.getElementById('farmName').value;
  const farmOperatingYears =
    document.getElementById('farmOperatingYears').value;
  const farmLocation = document.getElementById('farmLocation').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .createFarm(farmID, farmOwner, farmName, farmOperatingYears, farmLocation)
      .send({ from: account });
    console.log(result);
  }
};

// Get farm
const getFarmInfo = async () => {
  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .getFarmInfo(farmAddress)
      .call();
    console.log(result);
  }
};

// Create distribution center
const createDistributionCenter = async () => {
  const distributionCenterOwner = document.getElementById('dcOwner').value;
  const distributionCenterName = document.getElementById('dcName').value;
  const distributionCenterOperatingYears =
    document.getElementById('dcOperatingYears').value;
  const distributionCenterLocation =
    document.getElementById('dcLocation').value;

  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .createDistributionCenter(
        distributionCenterOwner,
        distributionCenterName,
        distributionCenterOperatingYears,
        distributionCenterLocation,
      )
      .send({ from: account });
    console.log(result);
  }
};

// Get distribution center
const getDistributionCenterInfo = async () => {
  const distributionCenterAddress = document.getElementById(
    'distributionCenterAddress',
  ).value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .getDistributionCenterInfo(distributionCenterAddress)
      .call();
    console.log(result);
  }
};

/////////////////////////////////////////////////////////////
// FARM
/////////////////////////////////////////////////////////////
// Get all distibution centers address
const getDistributionCenterAddresses = async () => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .getDistributionCenterAddresses()
      .call();
    console.log(result);
    return result;
  }
};

// Get farmer's farm
const getFarmerFarm = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods.getFarmerFarm(address).call();
    console.log(result);
    return result;
  }
};

// Get farm owner
const getFarmOwner = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods.getFarmOwner(address).call();
    console.log(result);
    return result;
  }
};

// Add farmer to farm
const addFarmerToFarm = async () => {
  const farmAddress = document.getElementById('addFarmerFarmAddress').value;
  const farmerAddress = document.getElementById('addFarmerUserAddress').value;

  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .addFarmerToFarm(farmAddress, farmerAddress)
      .send({ from: account });
    console.log(result);
  }
};

// Add tree to farm
const addTreeToFarm = async () => {
  const farmAddress = document.getElementById('addTreeFarmAddress').value;
  const treeId = document.getElementById('addTreeTreeId').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .addTreeToFarm(farmAddress, treeId)
      .send({ from: account });
    console.log(result);
  }
};

// Create Durian
const createDurian = async () => {
  const durianType = document.getElementById('durianType').value;
  const farmAddress = document.getElementById('farmAddress').value;
  const treeAddress = document.getElementById('treeAddress').value;
  const harvestDate = document.getElementById('harvestDate').value;
  const harvestTime = document.getElementById('harvestTime').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .createDurian(
        durianType,
        farmAddress,
        treeAddress,
        harvestDate,
        harvestTime,
      )
      .send({ from: account });
    console.log(result);
  }
};

/////////////////////////////////////////////////////////////
// DISTRIBUTOR
/////////////////////////////////////////////////////////////
// Get distributor's distribution center
const getDistributorDistributionCenter = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .getDistributorDistributionCenter(address)
      .call();
    console.log(result);
    return result;
  }
};

// Get distribution center owner
const getDistributionCenterOwner = async (address) => {
  if (window.ethereum !== 'undefined') {
    const result = await window.contract.methods
      .getDistributionCenterOwner(address)
      .call();
    console.log(result);
    return result;
  }
};

// Add distributor to distribution center
const addDistributorToDistributionCenter = async () => {
  const distributionCenterAddress = document.getElementById(
    'distributionCenterAddress',
  ).value;
  const distributorAddress =
    document.getElementById('distributorAddress').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .addDistributorToDistributionCenter(
        distributionCenterAddress,
        distributorAddress,
      )
      .send({ from: account });
    console.log(result);
  }
};

// Update durian info for distribution center
const updateDurianInfoForDistributor = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const distributionCenterAddress = document.getElementById(
    'distributionCenterAddress',
  ).value;
  const dateReceivedFromFarm = document.getElementById(
    'dateReceivedFromFarm',
  ).value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDurianInfoForDistributor(
        durianAddress,
        distributionCenterAddress,
        dateReceivedFromFarm,
      )
      .send({ from: account });
    console.log(result);
  }
};

// Update date pass to retailer
const updateDatePassToRetailer = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const datePassToRetailer =
    document.getElementById('datePassToRetailer').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDatePassToRetailer(durianAddress, datePassToRetailer)
      .send({ from: account });
    console.log(result);
  }
};

/////////////////////////////////////////////////////////////
// RETAILER
/////////////////////////////////////////////////////////////

// Update durian info for retailer
const updateDurianInfoForRetailer = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const retailerAddress = document.getElementById('retailerAddress').value;
  const dateReceivedFromDistributionCenter = document.getElementById(
    'dateReceivedFromDistributionCenter',
  ).value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDurianInfoForRetailer(
        durianAddress,
        retailerAddress,
        dateReceivedFromDistributionCenter,
      )
      .send({ from: account });
    console.log(result);
  }
};

// Update retailer info
const updateRetailerInfo = async () => {
  const retailerAddress = document.getElementById('retailerAddress').value;
  const retailerName = document.getElementById('retailerName').value;
  const retailerLocation = document.getElementById('retailerLocation').value;
  const retailerOperatingYears = document.getElementById(
    'retailerOperatingYears',
  ).value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateRetailerInfo(
        retailerAddress,
        retailerName,
        retailerLocation,
        retailerOperatingYears,
      )
      .send({ from: account });
    console.log(result);
  }
};

// Update date pass to consumer
const updateDatePassToConsumer = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const datePassToConsumer =
    document.getElementById('datePassToConsumer').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDatePassToConsumer(durianAddress, datePassToConsumer)
      .send({ from: account });
    console.log(result);
  }
};

/////////////////////////////////////////////////////////////
// CONSUMER
/////////////////////////////////////////////////////////////

// Update durian info for consumer
const updateDurianInfoForConsumer = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const datePassToConsumer =
    document.getElementById('datePassToConsumer').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDurianInfoForConsumer(durianAddress, datePassToConsumer)
      .send({ from: account });
    console.log(result);
  }
};

// Update durian rating
const updateDurianRating = async () => {
  const durianAddress = document.getElementById('durianAddress').value;
  const taste = document.getElementById('taste').value;
  const fragrance = document.getElementById('fragrance').value;
  const texture = document.getElementById('texture').value;
  const creaminess = document.getElementById('creaminess').value;
  const ripeness = document.getElementById('ripeness').value;
  const gradeRating = document.getElementById('gradeRating').value;
  const comment = document.getElementById('comment').value;

  if (window.ethereum !== 'undefined') {
    console.log(window.contract.methods);
    const result = await window.contract.methods
      .updateDurianRating(
        durianAddress,
        taste,
        fragrance,
        texture,
        creaminess,
        ripeness,
        gradeRating,
        comment,
      )
      .send({ from: account });
    console.log(result);
  }
};

/////////////////////////////////////////////////////////////
// UTILITY
/////////////////////////////////////////////////////////////

function snackbar() {
  var x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}

function disconnect() {
  window.ethereum.selectedAddress = null;
  account = null;
  window.location.href = 'index.html';
}
