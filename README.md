# Project-Function-Frontend
This JavaScript (Front-End) and Solidity (Smart-Contract) program is a simple project that demonstrates how the front-end of react interacts with smart contracts written in solidity. The purpose of this program is to demonstrate what I've learned so far in taking the Advanced course on ETH from metacrafters.
## Description
This project comprises a solidity-developed smart contract and a React-built front-end interface. It is web application where users can participate in a betting game using Ethereum cryptocurrency. It integrates with MetaMask for secure wallet management and connects to a specific Ethereum smart contract that governs the betting rules and transactions. Users can place bets on numbers, see their total amount wagered, add and clear funds, and view their betting history.
### Frontend (React)
Through connection with MetaMask, the frontend interface makes communicating with the Ethereum network easier. Users are able to see account balances, deposit and withdraw ETH, and link their MetaMask wallets. 
#### Features:
- **MetaMask Integration:** Connects user's MetaMask wallet to interact with the Ethereum blockchain.
- **Account Number Display:** Shows the user's account number in ETH.
- **Total Amount Wagered Display:** Shows the user's Total Wagered Balance in ETH.
- **Add Functionality:** Allows users to deposit ETH into the smart contract.
- **Clear Functionality:** Enables users to withdraw ETH from the smart contract.
- **View Betting History:** Allows the users to see their betting history (Winning numbers and their bets)
### Smart Contract (Solidity)
The smart contract is deployed on the Ethereum blockchain and manages the betting functionality for the application. It facilitates ETH deposits and withdrawals, processes user bets, and determines betting outcomes based on the user's guesses and randomly generated numbers.
#### Features:
- **Owner Functionality:** Ensures only the contract owner can withdraw funds using the clear function, protecting the contract’s balance.
- **Events:** Emits events for deposits (Add) and betting results (BetResult), enabling users to track transactions and outcomes.
- **Access Control:**  Uses require statements to restrict the clear function to the owner and to ensure that bet amounts match the sent value.
- **Error Handling:** Implements require statements to check for valid guesses, adequate contract balance for withdrawals, and successful Ether transfers.
## Project Structure

### Frontend (React)
```javascript
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import betting_abi from "../artifacts/contracts/Assessment.sol/Betting.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [bettingContract, setBettingContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [guess, setGuess] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState("");
  const [customDepositAmount, setCustomDepositAmount] = useState("");
  const [customWithdrawAmount, setCustomWithdrawAmount] = useState("");
  const [betHistory, setBetHistory] = useState([]);
  const [updateHistory, setUpdateHistory] = useState(false); // Flag to trigger history update

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your deployed contract address
  const bettingABI = betting_abi.abi;

  const fetchBetHistory = async () => {
   
  };

  const handleUpdateHistory = async () => {
  };

  const clearBetHistory = () => {
  };

  const initUser = () => {
  };

  const getAccount = async () => {
    const accounts = await ethWallet.request({ method: 'eth_accounts' });
  };

  const connectAccount = async () => {
  };

  const getBettingContract = () => {
  };

  const getBalance = async () => {
  };

  const placeBet = async () => {
  };

  const deposit = async (amount) => {
  };

  const withdraw = async (amount) => {
  };

  const renderContent = () => {
    return (
      <div>
        <p>Account: {account}</p>
        <p>TOTAL AMOUNT WAGERED: {balance} ETH</p>

        {/* Bet placing section */}
        {/* Deposit and withdraw section */}
        {/* Bet history section */}
        <style jsx>{`
        </style>
      </div>
    );
  };

  useEffect(() => {
    initUser();
    if (updateHistory) {
      fetchBetHistory();
      setUpdateHistory(false); // Reset flag after updating history
    }
  }, [updateHistory]);

  return (
    <main className="container">
      <div className="header-bar">
        <header><h1>Welcome to the Christian's Betting App</h1></header>
      </div>
      {renderContent()}
    </main>
  );
}

```
### Smart Contract (Solidity)
```javascript
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Betting {
    address payable public owner;
    uint256 public prizeAmount;

    event Add(uint256 amount);
    event BetResult(address indexed player, bool won, uint guess, uint winningNumber);

    constructor(uint256 _prizeAmount) payable {
    }

    function add() public payable {
    }

    function bet(uint guess, uint256 betAmount) public payable {
    }

    function clear(uint amount) public {
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
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
