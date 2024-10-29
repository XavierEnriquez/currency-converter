export default function AmountInput({
  isDisabled,
  isName,
  isValue,
  onHandleAmount,
}) {
  return (
    <input
      disabled={isDisabled}
      value={isValue}
      name={isName}
      type="number"
      min="1"
      onChange={(e) => onHandleAmount(e.target.value)}
    />
  );
}
