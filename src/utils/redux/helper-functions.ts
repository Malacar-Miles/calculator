import {
  MathOperator,
  decimalSeparator,
} from "../types-and-constants/types-and-constants";

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

  if (stringValue.length <= maxDisplayLength) return stringValue;

  const isExponential = (numericString: string) => numericString.includes("e");

  const trimExponentialValue = (expNumber: number) => expNumber.toPrecision(3);

  if (isExponential(stringValue)) return trimExponentialValue(numericValue);

  const removeLastCharacter = (str: string) => {
    return str.slice(0, str.length - 1);
  };

  const trimTruncatedValue = (numericString: string): string => {
    // This function will remove trailing zeros
    // from strings such as "5.34000000000"
    if (isExponential(numericString))
      throw new Error("Exponential argument in trimTruncatedValue function.");

    const isDecimal = numericString.includes(decimalSeparator);
    if (!isDecimal) return numericString;

    const lastCharacter = numericString[numericString.length - 1];
    if (lastCharacter === decimalSeparator)
      if (numericString === "-0" + decimalSeparator)
        return "0"; // if "-0." return "0"
      else return removeLastCharacter(numericString);

    const needsTruncating = lastCharacter === "0";
    if (!needsTruncating) return numericString;

    // If none of the above conditions are met,
    // remove the last digit and call the function
    // again recursively.
    return trimTruncatedValue(removeLastCharacter(numericString));
  };

  const truncateNumericValue = (longNumber: number) => {
    // We truncate differently depending on whether the
    // number is very big or just has a long decimal part
    if (longNumber > -1 && longNumber < 1)
      return trimTruncatedValue(longNumber.toFixed(maxDisplayLength - 1));
    else {
      const truncatedString = longNumber.toPrecision(maxDisplayLength - 1);
      if (!isExponential(truncatedString))
        return trimTruncatedValue(truncatedString);
      else return trimExponentialValue(longNumber);
    }
  };

  return truncateNumericValue(numericValue);
};

export const toNumericValue = (stringValue: string): number => {
  return Number(stringValue);
};
