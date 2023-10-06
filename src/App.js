import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isBusy, setIsBusy] = useState(false);
  const [isInitialized, setIsInitialized] = useState();

  useEffect(() => {
    (async () => {
      console.log("Initializing");

      const initObj = {
        token: "2464|0LxF7U7Hzp0tU1BG0LWTGKOzTUp5OTSqmaQGXHep",
        onSuccess: function (data) {
          console.log("Bank account is successfully connected", data);
        },
        onError: function (error) {
          console.error("Error happened", error);
        },
        onClose: function (data) {
          console.log("Widget closed", data);
        },
      };
      // For showing a loader
      setIsBusy(true);

      const res = await window.grailpay.init(initObj);

      if (res.status === 200) {
        setIsInitialized(true);
      }

      setIsBusy(false);
    })();
  }, []);

  useEffect(() => {
    if (isBusy) {
      // Trigger the loader
    }

    if (isInitialized) {
      window.grailpay.open();
    }
  }, [isInitialized, isBusy]);

  const onClick = () => {
    window.grailpay.open();
  };

  const getAccount = () => {
    window.grailpay.getAccount();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>Open widget</button>
        <button onClick={getAccount}>Get Account</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
