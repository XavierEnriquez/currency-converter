export default function CurrencySelect({
  onName,
  onValue,
  onHandle,
  children,
}) {
  return (
    <select
      name={onName}
      value={onValue}
      onChange={(e) => onHandle(e.target.value)}
    >
      {children}
    </select>
  );
}
