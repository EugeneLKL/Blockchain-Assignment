// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DurianTracking {
  struct Review {
    string taste;
    string fragrance;
    string texture;
    string creaminess;
    string ripeness;
    uint grade;
  }

  struct Durian {
    uint id;
    uint weight;
    uint size;
    string durianType;
    // string harvestTree; // Dk whether address or string
    address harvestFarm;
    uint256 harvestedDate;
    address harvestedBy;
    address owner;
    uint256 datePassToDistributor;
    address distributor;
    uint256 dateReceiveFromFarm;
    uint256 datePassToRetailer;
    address retailer;
    uint256 dateReceiveFromDistributor;
    uint price;
    uint256 datePassToConsumer;
    address consumer;
    uint256 dateReceiveFromRetailer;
    Review reviews;
  }
}