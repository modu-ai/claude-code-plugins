export const maskText = (input: string, visible = 6): string => {
  if (input === '') {
    return '';
  }

  const visiblePart = input.slice(0, visible);
  const maskedPart = '*'.repeat(Math.max(0, input.length - visible));
  return visiblePart + maskedPart;
};
