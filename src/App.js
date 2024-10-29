import { useState, useEffect } from "react";
import AmountInput from "./utils/amount-input";
import CurrencySelect from "./utils/currency-select";
import CurrencyOption from "./utils/currency-option";
import Output from "./utils/output";

export function App() {
  const [currencies, setCurrencies] = useState([]);
  const [output, setOutput] = useState("");
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  function handleAmount(amount) {
    setAmount(amount);
  }

  function handleFrom(from) {
    setFrom(from);
  }
  function handleTo(to) {
    setTo(to);
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
          `https://api.frankfurter.app/latest?amount=${amount}&base=${from}&symbols=${to}`
        );
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setOutput(data.rates[to].toFixed(2));
      } catch (error) {
        console.log(error.message);
      }
    }
    currData();
  }, [amount, from, to]);

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
            onValue={from}
            onHandle={(e) => handleFrom(e.target.value)}
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
            onValue={to}
            onHandle={(e) => handleTo(e.target.value)}
            children
          >
            {currencies
              .filter((el) => el.key !== from)
              .map((el, i) => (
                <CurrencyOption key={el.key} onValue={el.key} children>
                  {el.value}({el.key})
                </CurrencyOption>
              ))}
          </CurrencySelect>
        </div>
        <Output output={output} to={to} />
      </form>
    </div>
  );
}

export default App;
