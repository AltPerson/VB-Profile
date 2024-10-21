export function isFloat(value: number) {
  return (
    typeof value === 'number' && !isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)
  );
}

export function declOfNum(number: number, words: string[]) {
  const intPart = Math.floor(Math.abs(number));
  if (number % 1 !== 0) {
    return words[2];
  }

  return words[
    intPart % 100 > 4 && intPart % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][intPart % 10 < 5 ? intPart % 10 : 5]
  ];
}
