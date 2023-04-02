import { MathOperator } from "../types-and-constants/types-and-constants";

export const calculate = (a: number, operator: MathOperator, b: number) => {
  switch (operator) {
    case "x":
      return a * b;
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      if (b !== 0) return a / b;
      else return null;
  }
};

// This helper function converts a numeric value to a string
// and formats this string so it fits the display.
export const toDisplayValue = (numericValue: number): string => {
  const maxDisplayLength = 17;
  const stringValue = numericValue.toString();
  const numDigits = stringValue.length;

  const truncateNumericValue = (longNumber: number) => {
    // We truncate differently depending on whether the
    // number is very big or just has a long decimal part
    if (longNumber > -1 && longNumber < 1)
      return longNumber.toFixed(maxDisplayLength - 1);
    else {
      const truncatedString = longNumber.toPrecision(maxDisplayLength - 1);
      const isExponential = truncatedString.includes("e");
      if (!isExponential) return truncatedString;
        else return longNumber.toPrecision(3);
    }
  };

  const result =
    numDigits <= maxDisplayLength
      ? stringValue
      : truncateNumericValue(numericValue);
  return result;
};

export const toNumericValue = (stringValue: string): number => {
  return Number(stringValue);
};
