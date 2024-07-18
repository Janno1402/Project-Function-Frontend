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

  // Function to fetch bet history
  const fetchBetHistory = async () => {
    if (bettingContract) {
      const filter = bettingContract.filters.BetResult(null, null, null, null);
      const events = await bettingContract.queryFilter(filter);
      const formattedHistory = events.map(event => ({
        player: event.args.player,
        won: event.args.won,
        guess: event.args.guess.toNumber(),
        winningNumber: event.args.winningNumber.toNumber()
      }));
      // Reverse the order of events to show the most recent bet on top
      const reversedHistory = formattedHistory.reverse();
      setBetHistory(reversedHistory);
    }
  };

  // Function to handle update history button click
  const handleUpdateHistory = async () => {
    setUpdateHistory(true); // Set flag to trigger history update
  };

  // Function to clear bet history
  const clearBetHistory = () => {
    setBetHistory([]);
  };

  // Function to initialize user connection and contract
  const initUser = () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      getAccount();
    }
  };

  // Function to get current account
  const getAccount = async () => {
    const accounts = await ethWallet.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getBettingContract();
    }
  };

  // Function to connect Metamask account
  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    getBettingContract();
  };

  // Function to get the Ethereum provider and signer
  const getBettingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const bettingContract = new ethers.Contract(contractAddress, bettingABI, signer);
    setBettingContract(bettingContract);
  };

  // Function to get balance from the smart contract
  const getBalance = async () => {
    if (bettingContract) {
      const balanceInWei = await bettingContract.getBalance();
      const balanceInEth = ethers.utils.formatEther(balanceInWei);
      setBalance(balanceInEth);
    }
  };

  // Function to place a bet
  const placeBet = async () => {
    if (bettingContract) {
      const tx = await bettingContract.bet(guess, ethers.utils.parseEther(betAmount), { value: ethers.utils.parseEther(betAmount) });
      await tx.wait();
      getBalance();
      const receipt = await tx.wait();
      const events = receipt.events;
      const betResult = events.find(event => event.event === "BetResult");
      if (betResult) {
        const winningNumber = betResult.args.winningNumber.toNumber();
        const difference = Math.abs(guess - winningNumber);

        let resultText = "";
        switch (difference) {
          case 0:
            resultText = "PERFECT";
            break;
          case 1:
            resultText = `You are ONE Digit away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          case 2:
            resultText = `You are TWO Digits away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          case 3:
            resultText = `You are THREE Digits away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          case 4:
            resultText = `You are FOUR Digits away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          case 5:
            resultText = `You are FIVE Digits away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          case 6:
            resultText = `You are SIX Digits away from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
          default:
            resultText = `You are too far from the WINNING Number. The correct number was ${winningNumber}.`;
            break;
        }

        setResult(resultText);
      }
    }
  };

  // Function to deposit funds into the smart contract
  const deposit = async (amount) => {
    if (bettingContract) {
      const tx = await bettingContract.add({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      getBalance();
    }
  };

  // Function to withdraw funds from the smart contract
  const withdraw = async (amount) => {
    if (bettingContract) {
      const tx = await bettingContract.clear(ethers.utils.parseEther(amount));
      await tx.wait();
      getBalance();
    }
  };

  // JSX for initializing user connection and displaying UI
  const renderContent = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask.</p>;
    }

    if (!account) {
      return <button className="btn" onClick={connectAccount}>Connect MetaMask</button>;
    }

    if (!balance) {
      getBalance();
    }

    return (
      <div>
        <p>Account: {account}</p>
        <p>TOTAL AMOUNT WAGERED: {balance} ETH</p>

        {/* Bet placing section */}
        <div className="column">
          <h2>Place a Bet</h2>
          <label htmlFor="betAmount">Bet Amount (ETH): </label>
          <input type="text" id="betAmount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
          <label htmlFor="guess">Guess a number (1-10): </label>
          <input type="number" id="guess" value={guess} onChange={(e) => setGuess(e.target.value)} />
          <button className="btn" onClick={placeBet}>Place Bet</button>
          {result && <p>{result}</p>}
        </div>

        {/* Deposit and withdraw section */}
        <div className="button-container">
          <div className="column">
            <h2>ADD WAGERED AMOUNT</h2>
            <button className="btn" onClick={() => deposit("1")}>1 ETH</button>
            <button className="btn" onClick={() => deposit("5")}>5 ETH</button>
            <button className="btn" onClick={() => deposit("25")}>25 ETH</button>
            <button className="btn" onClick={() => deposit("50")}>50 ETH</button>
            <button className="btn" onClick={() => deposit("100")}>100 ETH</button>
            <label htmlFor="customDeposit">Custom Amount for Adding: </label>
            <input type="text" id="customDeposit" value={customDepositAmount} onChange={(e) => setCustomDepositAmount(e.target.value)} />
            <button className="btn1" onClick={() => deposit(customDepositAmount)}>ADD</button>
          </div>
          <div className="column">
            <h2>CLEAR WAGERED AMOUNT</h2>
            <button className="btn" onClick={() => withdraw("1")}>1 ETH</button>
            <button className="btn" onClick={() => withdraw("5")}>5 ETH</button>
            <button className="btn" onClick={() => withdraw("25")}>25 ETH</button>
            <button className="btn" onClick={() => withdraw("50")}>50 ETH</button>
            <button className="btn" onClick={() => withdraw("100")}>100 ETH</button>
            <label htmlFor="customWithdraw">Custom Amount for Clearing: </label>
            <input type="text" id="customWithdraw" value={customWithdrawAmount} onChange={(e) => setCustomWithdrawAmount(e.target.value)} />
            <button className="btn1" onClick={() => withdraw(customWithdrawAmount)}>CLEAR</button>
          </div>
        </div>

        {/* Bet history section */}
        <div className="column">
          <h2>Bet History</h2>
          <div className="history-controls">
            <button className="btn1" onClick={handleUpdateHistory}>Update History</button>
            <button className="btn1" onClick={clearBetHistory}>Clear History</button>
          </div>
          <div>
            {betHistory.length === 0 && <p>No bet history available.</p>}
            {betHistory.length > 0 && (
              <ul>
                {betHistory.map((bet, index) => (
                  <li key={index}>
                    <strong>Player:</strong> {bet.player}<br />
                    <strong>Guess:</strong> {bet.guess}<br />
                    <strong>Winning Number:</strong> {bet.winningNumber}<br />
                    <strong>Result:</strong> {bet.won ? "Won" : "Lost"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <style jsx>{`
          .btn {
            color: #aaaaaa;
            background-color: #002654;
            cursor: pointer;
            font-family: Monospace;
            font-size: 30px;
            margin-bottom: 10px;
            display: block;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
          }
          .btn1 {
            color: #aaaaaa;
            background-color: #002654;
            cursor: pointer;
            font-family: Monospace;
            font-size: 15px;
            border-radius: 5px;
            margin-left: 10px;
          }
          .button-container {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
          }
          .column {
            flex: 1;
            margin-right: 20px;
          }
          h2 {
            font-size: 30px;
            margin-bottom: 10px;
            font-family: Monospace;
          }
          p {
            font-size: 30px;
          }
          .history-controls {
            margin-bottom: 10px;
          }
        `}
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
      <style jsx global>{`
        body {
          background-color: #f0f0f0; 
          font-family: Monospace;
        }
        .container {
          text-align: center;
          font-size: 20px;
          max-width: 800px;
          margin: 0 auto;
          padding: 10px;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .header-bar {
          width: 100%;
          background-color: #eeb111;
          padding: 20px 0;
          border-radius: 10px 10px 0 0;
        }
        header h1 {
          margin: 0;
          text-align: center;
          font-size: 36px;
        }
        .btn, .btn1 {
          color: #ffffff;
          background-color: #002654;
          cursor: pointer;
          font-family: Monospace;
          font-size: 20px;
          margin-bottom: 10px;
          display: block;
          width: calc(100% - 20px);
          padding: 15px;
          border-radius: 5px;
          border: none;
          transition: background-color 0.3s ease;
        }
        .btn:hover, .btn1:hover {
          background-color: #004080;
        }
        .btn1 {
          font-size: 15px;
          width: auto;
          margin-left: 10px;
          display: inline-block;
          padding: 10px 20px;
        }
        .btn1 {
          margin-top: 10px;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
        .column {
          flex: 1;
          margin: 0 10px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          font-size: 30px;
          margin-bottom: 10px;
          font-family: Monospace;
          color: #333333;
        }
        p {
          font-size: 20px;
          color: #666666;
        }
        label {
          display: block;
          margin-top: 10px;
          font-size: 16px;
        }
        input {
          width: calc(100% - 20px);
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #cccccc;
          font-size: 18px;
          font-family: Monospace;
        }
      `}
      </style>
    </main>
  );
}
