// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Betting {
    address payable public owner;
    uint256 public prizeAmount;

    event Add(uint256 amount);
    event BetResult(address indexed player, bool won, uint guess, uint winningNumber);

    constructor(uint256 _prizeAmount) payable {
        owner = payable(msg.sender);
        prizeAmount = _prizeAmount;
    }

    function add() public payable {
        emit Add(msg.value);
    }

    function bet(uint guess, uint256 betAmount) public payable {
        require(guess >= 1 && guess <= 10, "Guess must be between 1 and 10");
        require(msg.value == betAmount, "Bet amount must be equal to the sent value");

        uint winningNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10 + 1;

        if (guess == winningNumber) {
            (bool sent, ) = msg.sender.call{value: betAmount * 2}("");
            require(sent, "Failed to send Ether");
            emit BetResult(msg.sender, true, guess, winningNumber);
        } else {
            emit BetResult(msg.sender, false, guess, winningNumber);
        }
    }

    function clear(uint amount) public {
        require(msg.sender == owner, "You are not the owner of this contract");
        require(address(this).balance >= amount, "Insufficient balance in contract");

        (bool sent, ) = owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
