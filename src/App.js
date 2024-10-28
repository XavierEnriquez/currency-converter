import { useEffect, useState } from "react";

function App() {
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
          <input
            name="number-input"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => handleAmount(e.target.value)}
          />
          <select
            name="from-select"
            value={from}
            onChange={(e) => handleFrom(e.target.value)}
          >
            {currencies.map((el, i) => (
              <option key={el.key} value={el.key}>
                {el.value} ({el.key})
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>To</div>
          <select
            name="to-select"
            value={to}
            onChange={(e) => handleTo(e.target.value)}
          >
            {currencies
              .filter((el) => el.key !== from)
              .map((el, i) => (
                <option key={el.key} value={el.key}>
                  {el.value} ({el.key})
                </option>
              ))}
          </select>
        </div>
        <p>
          {output} {to}
        </p>
      </form>
    </div>
  );
}

export default App;
