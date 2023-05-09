//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract durianFarm {

    enum Roles {Farm, Distributor, Retailer, Consumer}
    Roles role;

    struct Farm{
        string farmID;
        string durianFarm;
    }

    struct Tree{
        Farm farmID;
        string treeID;
        string typeDurian;
    }
    
    struct Durian{
        Tree treeID;
        string durianId;
        string weight;
        string size;
        uint harvestDate;
        uint passingDistributorDate;
    }
    
    Durian[] public durianArray;
    Farm[] public farmArray;
    Tree[] public treeArray;

    constructor (){
        msg.sender;
    }

    function setDurianFarm(string memory id, string memory addressFarm) public {
        Farm memory farm = Farm(id, addressFarm);
        farmArray.push(farm);
    }

    function setDurianTree(Farm memory idFarm, string memory idTree, string memory durianType)public{
        Tree memory tree = Tree(idFarm,idTree, durianType);
        treeArray.push(tree);
    }

    function setDurian(Tree memory idTree, string memory idDurian, string memory weightDurian, string memory sizeDurian, uint _harvestDate, uint _passingDistributorDate) public {
        Durian memory durian = Durian( idTree, idDurian, weightDurian, sizeDurian, _harvestDate, _passingDistributorDate);
        durianArray.push(durian);
    }

   



}
