# Project-Function-Frontend

## Description

This project consists of a frontend interface built with React and a backend smart contract developed in Solidity. The application allows users to interact with an Ethereum smart contract to deposit and withdraw ETH using MetaMask.

### Frontend (React)

The frontend interface facilitates interaction with the Ethereum blockchain via MetaMask integration. Users can connect their MetaMask wallets, view account balances, deposit ETH, and withdraw ETH.

#### Features:

- **MetaMask Integration:** Connects user's MetaMask wallet to interact with the Ethereum blockchain.
- **Account Balance Display:** Shows the user's account balance in ETH.
- **Deposit Functionality:** Allows users to deposit ETH into the smart contract.
- **Withdraw Functionality:** Enables users to withdraw ETH from the smart contract.

### Smart Contract (Solidity)

The smart contract is deployed on the Ethereum blockchain and handles ETH deposits and withdrawals securely.

#### Features:

- **Owner Functionality:** Includes a modifier to restrict certain functions to the contract owner.
- **Events:** Emits events for deposit and withdrawal transactions.
- **Modifiers:** Utilizes a `onlyOwner` modifier to restrict access to critical functions.
- **Error Handling:** Uses `require` statements to ensure sufficient balance for withdrawals.

## Project Structure

### Frontend (React)

- Describe the frontend architecture and components.
- Explain how the React app interacts with MetaMask and the Ethereum blockchain.

### Smart Contract (Solidity)

- Describe the structure and key functions of the Solidity smart contract.
- Explain the purpose of events, modifiers, and error handling in the contract.

## Getting Started

### Prerequisites

- **MetaMask:** Install MetaMask extension for your browser.

### Running the Application

1. **Frontend (React):**
   - Clone the repository and navigate to the frontend directory.
   - Install dependencies: `npm install`.
   - Start the development server: `npm start`.
   - Open http://localhost:3000 in your browser.

2. **Smart Contract (Solidity):**
   - Deploy the `Assessment` contract on a test network (e.g., Rinkeby).
   - Use Remix or Truffle for deployment and testing.

## Authors

Christian Benjamin ([@_cbso](https://x.com/cbso_)) - Metacrafter Student

## License

This project is licensed under the Christian Benjamin License. See the LICENSE.md file for details.

