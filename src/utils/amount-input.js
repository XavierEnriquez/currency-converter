export default function AmountInput({ onName, onValue, onHandleAmount }) {
  return (
    <input
      value={onValue}
      name={onName}
      type="number"
      min="1"
      onChange={(e) => onHandleAmount(e.target.value)}
    />
  );
}
