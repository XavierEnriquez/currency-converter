import { useState, useEffect } from "react";
import AmountInput from "./utils/amount-input";
import CurrencySelect from "./utils/currency-select";
import CurrencyOption from "./utils/currency-option";
import Output from "./utils/output";

export function App() {
  const [currencies, setCurrencies] = useState([]);
  const [output, setOutput] = useState("");
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");

  function handleAmount(amount) {
    setAmount(amount);
  }

  function handleFromCur(fromCur) {
    setFromCur(fromCur);
  }
  function handleToCur(toCur) {
    setToCur(toCur);
  }

  useEffect(() => {
    async function getCurrencies() {
      try {
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        const currenciesArr = Object.keys(data).map((key) => ({
          key: key,
          value: data[key],
        }));
        setCurrencies(currenciesArr);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    async function currData() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&base=${fromCur}&symbols=${toCur}`
        );
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setOutput(data.rates[toCur].toFixed(2));
      } catch (error) {
        console.log(error.message);
      }
    }
    currData();
  }, [amount, fromCur, toCur]);

  return (
    <div className="app">
      <form name="converter" className="converter_component">
        <h1>Currency Converter</h1>
        <div>
          <AmountInput
            onName="amount-input"
            onValue={amount}
            onHandleAmount={handleAmount}
          />
          <CurrencySelect
            onName="select-from"
            onValue={fromCur}
            onHandle={(e) => handleFromCur(e.target.value)}
            children
          >
            {currencies.map((el, i) => (
              <CurrencyOption key={el.key} onValue={el.key} children>
                {el.value}({el.key})
              </CurrencyOption>
            ))}
          </CurrencySelect>
        </div>
        <div>
          <div>To</div>
          <CurrencySelect
            onName="select-to"
            onValue={toCur}
            onchange={(e) => handleToCur(e.target.value)}
            children
          >
            {currencies
              .filter((el) => el.key !== fromCur)
              .map((el, i) => (
                <CurrencyOption key={el.key} onValue={el.key} children>
                  {el.value}({el.key})
                </CurrencyOption>
              ))}
          </CurrencySelect>
        </div>
        <Output output={output} to={toCur} />
      </form>
    </div>
  );
}

export default App;
