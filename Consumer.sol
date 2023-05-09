// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Consumer {
    enum Roles {
        Farm,
        Distributor,
        Retailer,
        Consumer
    }
    Roles role;

    struct ConsumerInfo {
        string consumerId;
        string dateReceiveFromRetailer;
    }

    struct Rating {
        uint tasteRating;
        uint fragranceRating;
        uint textureRating;
        uint creaminessRating;
        uint ripenessRating;
        uint gradeRating;
    }

    struct Durian {
        uint durianId;
        string farmName;
        string farmLocation;
        uint treeNumber;
        string dateHarvested;
        string dateArrivedDistributionCenter;
        string dateReceivedRetailer;
        Rating rating;
    }

    mapping(uint => Durian) public durians;

    ConsumerInfo[] public consumerArray;
    Durian[] public durianArray;

    constructor() {
        msg.sender;
    }

    function setConsumer(
        string memory consumerId,
        string memory receiveDate
    ) public {
        bytes memory dateBytes = bytes(receiveDate);
        require(dateBytes.length == 10, "Date should be in dd/mm/yyyy format");
        require(
            dateBytes[2] == bytes1("/") && dateBytes[5] == bytes1("/"),
            "Date should be in dd/mm/yyyy format"
        );
        ConsumerInfo memory _consumer = ConsumerInfo(consumerId, receiveDate);
        consumerArray.push(_consumer);
    }

    function rateDurian(
        uint _durianId,
        uint _tasteRating,
        uint _fragranceRating,
        uint _textureRating,
        uint _creaminessRating,
        uint _ripenessRating,
        uint _gradeRating
    ) public {
        Rating memory _rating = Rating(
            _tasteRating,
            _fragranceRating,
            _textureRating,
            _creaminessRating,
            _ripenessRating,
            _gradeRating
        );
        Durian storage durian = durians[_durianId];
        durian.rating = _rating;
    }
}
