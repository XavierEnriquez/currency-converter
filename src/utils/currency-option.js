export default function CurrencyOption({ onValue, children }) {
  return <option value={onValue}>{children}</option>;
}
