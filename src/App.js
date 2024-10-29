import { useState, useEffect } from "react";
import AmountInput from "./utils/amount-input";
import CurrencySelect from "./utils/currency-select";
import CurrencyOption from "./utils/currency-option";
import Output from "./utils/output";
import Loading from "./utils/loading";

export function App() {
  const [currencies, setCurrencies] = useState([]);
  const [output, setOutput] = useState("");
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");

  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        if (!res.ok) throw new Error("Something went wrong! Reload page");
        const data = await res.json();
        const currenciesArr = Object.keys(data).map((key) => ({
          key: key,
          value: data[key],
        }));
        setCurrencies(currenciesArr);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    async function currData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&base=${fromCur}&symbols=${toCur}`
        );
        if (!res.ok) throw new Error("Something went wrong! Reload page");
        const data = await res.json();
        setOutput(data.rates[toCur].toFixed(2));
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
    if (fromCur === toCur) return setOutput(amount);
    currData();
  }, [amount, fromCur, toCur]);

  return (
    <div className="app">
      <form name="converter" className="converter_component">
        <h1>Currency Converter</h1>
        <div>
          <AmountInput
            isDisabled={isLoading}
            isName="amount-input"
            isValue={amount}
            onHandleAmount={handleAmount}
          />
          <CurrencySelect
            isDisabled={isLoading}
            isName="select-from"
            isValue={fromCur}
            onHandle={handleFromCur}
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
            isDisabled={isLoading}
            isName="select-to"
            isValue={toCur}
            onHandle={handleToCur}
            children
          >
            {currencies.map((el, i) => (
              <CurrencyOption key={el.key} onValue={el.key} children>
                {el.value}({el.key})
              </CurrencyOption>
            ))}
          </CurrencySelect>
        </div>
        {isLoading ? <Loading /> : <Output output={output} to={toCur} />}
      </form>
    </div>
  );
}

export default App;
