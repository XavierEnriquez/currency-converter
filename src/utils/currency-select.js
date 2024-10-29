export default function CurrencySelect({
  isDisabled,
  isName,
  isValue,
  onHandle,
  children,
}) {
  return (
    <select
      disabled={isDisabled}
      name={isName}
      value={isValue}
      onChange={(e) => onHandle(e.target.value)}
    >
      {children}
    </select>
  );
}
