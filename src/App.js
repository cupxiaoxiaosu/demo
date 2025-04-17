import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {}, []);
  const connect = () => {
    window.bitkeep.suiWallet.connect();
  };
  return (
    <div className="App">
      <button onClick={connect}>connected</button>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
