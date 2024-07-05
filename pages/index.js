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
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async(amount) => {
    if (atm) {
      let tx = await atm.deposit(amount);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async(amount) => {
    if (atm) {
      let tx = await atm.withdraw(amount);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Account Number: {account}</p>
        <p>Account Balance (ETH): {balance}</p>
        <div className="button-container">
          <div className="column">
            <h2>Deposit</h2>
            <button className="btn" onClick={() => deposit(1)}>1 ETH</button>
            <button className="btn" onClick={() => deposit(5)}>5 ETH</button>
            <button className="btn" onClick={() => deposit(25)}>25 ETH</button>
            <button className="btn" onClick={() => deposit(50)}>50 ETH</button>
            <button className="btn" onClick={() => deposit(100)}>100 ETH</button>
            <label htmlFor="customDeposit">Input Custom Amount For Deposit: </label>
            <input type="text" id="customDeposit" name="customDeposit" value={customDepositAmount} onChange={(e) => setCustomDepositAmount(e.target.value)}/>
            <button className="btn1" onClick={() => deposit(customDepositAmount)}>DEPOSIT</button>
          </div>
          <div className="column">
            <h2>Withdraw</h2>
            <button className="btn" onClick={() => withdraw(1)}>1 ETH</button>
            <button className="btn" onClick={() => withdraw(5)}>5 ETH</button>
            <button className="btn" onClick={() => withdraw(25)}>25 ETH</button>
            <button className="btn" onClick={() => withdraw(50)}>50 ETH</button>
            <button className="btn" onClick={() => withdraw(100)}>100 ETH</button>
            <label htmlFor="customWithdraw">Input Custom Amount For Withdrawal: </label>
            <input type="text" id="customWithdraw" name="customWithdraw" value={customWithdrawAmount} onChange={(e) => setCustomWithdrawAmount(e.target.value)}/>
            <button className="btn1" onClick={() => withdraw(customWithdrawAmount)}>WITHDRAW</button>
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
            margin-left: 10px
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
            margin-bottom: 10px;\
            font-family: Monospace;
          }
          p {
            font-size: 30px;
          }
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