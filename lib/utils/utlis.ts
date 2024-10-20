export function isFloat(value: number) {
  return (
    typeof value === 'number' && !isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)
  );
}
