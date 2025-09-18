// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./AuctionController.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AuctionFactory {
    mapping(uint256 => AuctionController) public deployedAuctions;
    address public owner;

    mapping(address => mapping(uint256 => address)) public auctionContracts; // nftContract => tokenId => auctionContract

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createAuction(
        uint256 auctionId,
        address nftContract,
        uint256 tokenId,
        address bidToken,
        address priceFeed,
        uint256 startTime,
        uint256 endTime,
        address _router
    ) external returns (address auctionAddress) {
        require(auctionContracts[nftContract][tokenId] == address(0), "Auction already exists for this NFT");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");
        AuctionController newAuction = new AuctionController(
            auctionId, nftContract, tokenId, msg.sender, bidToken, priceFeed, startTime, endTime, _router
        );

        auctionAddress = address(newAuction);

        IERC721(nftContract).approve(auctionAddress, tokenId);

        deployedAuctions[auctionId] = newAuction;

        auctionContracts[nftContract][tokenId] = auctionAddress;

        // Transfer the NFT to the auction contract
        IERC721(nftContract).safeTransferFrom(msg.sender, auctionAddress, tokenId);
    }

    function getDeployedById(uint256 auctionId) external view returns (AuctionController) {
        return deployedAuctions[auctionId];
    }

    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
