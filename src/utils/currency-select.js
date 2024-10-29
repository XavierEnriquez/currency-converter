export default function CurrencySelect({
  onName,
  onValue,
  onHandle,
  children,
}) {
  return (
    <select name={onName} value={onValue} onChange={onHandle}>
      {children}
    </select>
  );
}
