interface NumberFieldProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export function NumberField({
  value,
  onDecrement,
  onIncrement,
}: NumberFieldProps) {
  return (
    <div className="number-field">
      <button className="button" onClick={onDecrement}>
        -
      </button>
      <input className="input" type="text" value={value} disabled />

      <button className="button" onClick={onIncrement}>
        +
      </button>
    </div>
  );
}
