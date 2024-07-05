# Project-Function-Frontend
This JavaScript (Front-End) and Solidity (Smart-Contract) program is a simple project that demonstrates how the front-end of react interacts with smart contracts written in solidity. The purpose of this program is to demonstrate what I've learned so far in taking the Advanced course on ETH from metacrafters.
## Description
This project comprises a solidity-developed smart contract and a React-built front-end interface. With the help of the application, users may use MetaMask to deposit and withdraw Ethereum by interacting with an Ethereum smart contract. 
### Frontend (React)
Through connection with MetaMask, the frontend interface makes communicating with the Ethereum network easier. Users are able to see account balances, deposit and withdraw ETH, and link their MetaMask wallets. 
#### Features:
- **MetaMask Integration:** Connects user's MetaMask wallet to interact with the Ethereum blockchain.
- **Account Number Display:** Shows the user's account number in ETH.
- **Account Balance Display:** Shows the user's account balance in ETH.
- **Deposit Functionality:** Allows users to deposit ETH into the smart contract.
- **Withdraw Functionality:** Enables users to withdraw ETH from the smart contract.
### Smart Contract (Solidity)
The smart contract is deployed on the Ethereum blockchain and handles ETH deposits and withdrawals for testing purposes.
#### Features:
- **Owner Functionality:** Includes a modifier to restrict certain functions to the contract owner.
- **Events:** Emits events for deposit and withdrawal transactions.
- **Modifiers:** Utilizes a modifier to restrict access to critical functions.
- **Error Handling:** Uses require statements to ensure sufficient balance for withdrawals.
## Project Structure

### Frontend (React)
```javascript
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [customDepositAmount, setCustomDepositAmount] = useState("");
  const [customWithdrawAmount, setCustomWithdrawAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
  }

  const handleAccount = (account) => {
  }

  const connectAccount = async() => {
    }

  const getATMContract = () => {
  }

  const getBalance = async() => {
  }

  const deposit = async(amount) => {
  }

  const withdraw = async(amount) => {
  }

  const initUser = () => {
    }

    return (
      <div>
        <p>Account Number: {account}</p>
        <p>Account Balance (ETH): {balance}</p>
        <div className="button-container">
          <div className="column">
            <h2>Deposit</h2>
          </div>
          <div className="column">
            <h2>Withdraw</h2>
          </div>
        </div>
        <style jsx>{`
        `}
        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <div className="header-bar">
        <header><h1>Welcome to Christian's ATM!</h1></header>
      </div>
      {initUser()}
      <style jsx global>{`
      `}
      </style>
    </main>
  );
}
```
### Smart Contract (Solidity)
```javascript
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract Assessment {
    address public owner;
    uint256 public balance;
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);
    modifier onlyOwner() {
    }
    constructor(uint256 initBalance) payable {
    }
    function deposit(uint256 _amount) external payable onlyOwner {
    }
    function withdraw(uint256 _withdrawAmount) external onlyOwner {
    }
    function getBalance() external view returns (uint256) {
    }
}
```
## Getting Started
### Prerequisites
- **MetaMask:** Install MetaMask extension for your browser.
### Running the Application
1. **Frontend (React):**
   - Clone the repository in GitPod or VSCode and navigate to the frontend directory.
   - Install dependencies: `npm i` in the Task1 Bash.
   - Add two new terminals
   - Input `npx hardhat node` in the first newly created terminal
   - Input `npx hardhat run --network localhost scripts/deploy.js` in the second newly created terminal
   - Start the development server by typing `npm run dev` in the Task1 Bash.
   - Lastly, open `http://localhost:3000` in your browser.
## Authors
Christian Benjamin ([@_cbso](https://x.com/cbso_)) - Metacrafter Student
## License
This project is licensed under the Christian Benjamin License. See the LICENSE.md file for details.
