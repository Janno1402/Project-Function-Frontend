// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address public owner;
    uint256 public balance;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor(uint256 initBalance) payable {
        owner = msg.sender;
        balance = initBalance;
    }

    function deposit(uint256 _amount) external payable onlyOwner {
        balance += _amount;
        emit Deposit(msg.sender, _amount);
    }

    // custom error
    // error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) external onlyOwner {
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        payable(msg.sender).transfer(_withdrawAmount);
        emit Withdraw(msg.sender, _withdrawAmount);
    }

    function getBalance() external view returns (uint256) {
        return balance;
    }
}
