import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import "./styles.css";

export default function App() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  async function connect() {
    const { accounts } = await window.bitkeep.suiWallet.connect();
    console.log(accounts);
    setFromAddress(accounts[0].address);
  }
  async function send() {
    const tx = new Transaction();
    tx.setSender(fromAddress);
    tx.setGasBudget(100000);
    const [coin] = tx.splitCoins({ GasCoin: true }, [BigInt(amount)]);
    tx.transferObjects([coin], toAddress);
    const res = window.bitkeep.suiWallet.signTransaction({ transaction: tx });
    return res;
  }
  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="App">
      <h1>transfer</h1>
      <div>
        <div className="form-item">
          <label>from</label>
          <span>{fromAddress}</span>
        </div>
        <div className="form-item">
          <label>to</label>
          <input
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
          &nbsp;&nbsp;
          {toAddress}
        </div>
        <div className="form-item">
          <label>amount</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
          &nbsp;&nbsp; {amount / Math.pow(10, 9)}sui
        </div>
        <div className="form-item">
          <button onClick={connect}>
            {fromAddress ? "connected" : "connect"}
          </button>
          &nbsp;&nbsp;
          <button onClick={send}>send</button>
        </div>
      </div>
    </div>
  );
}
