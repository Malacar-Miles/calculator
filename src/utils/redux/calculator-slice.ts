import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  KeypadNumericInput,
  KeypadOperatorInput,
  MathOperator,
} from "../types/types-and-constants";

type CalculatorState = {
  currentNumericInput: string | null;
  storedOperator: MathOperator | null;
  storedValue: number | null;
  displayValue: string;
};

const initialState: CalculatorState = {
  currentNumericInput: null,
  storedOperator: null,
  storedValue: null,
  displayValue: "0",
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    reset: (state) => initialState,

    numericInput: (state, action: PayloadAction<KeypadNumericInput>) => {
      const maxInputLength = 12;
      const inputKey = action.payload;
      const inputIsADecimalSeparator = inputKey === ",";

      // Firstly, if we have a stored value but no stored operator,
      // we reset the stored value. It means the user pressed a numeric
      // key after hitting "=".
      if (state.storedValue !== null && state.storedOperator === null)
        state.storedValue = null;

      // Now the main logic
      if (
        state.currentNumericInput === null ||
        state.currentNumericInput === "0"
      ) {
        // This is either the very first input key, or the second
        // key which follows "0".
        if (inputIsADecimalSeparator) state.currentNumericInput = "0,";
        else state.currentNumericInput = inputKey;
      } else {
        // This key continues the input sequence.
        // Ignore the input if maxInputLength has been reached.
        if (state.currentNumericInput.length < maxInputLength) {
          // Ignore the input if it's a decimal comma but another decimal
          // comma is already contained in the string. Otherwise add
          // the input key to the string.
          if (
            !inputIsADecimalSeparator ||
            !state.currentNumericInput.includes(",")
          )
            state.currentNumericInput += inputKey;
        }
      }
      state.displayValue = state.currentNumericInput;
    },

    operatorInput: (state, action: PayloadAction<KeypadOperatorInput>) => {
      const currentOperatorInput = action.payload;
      const currentOperatorIsEquals = currentOperatorInput === "=";

      const calculate = (a: number, operator: MathOperator, b: number) => {
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

      // This helper function will be used whenever we need to display
      // calculation results.
      const updateDisplay = () => {
        if (state.storedValue === null) state.displayValue = "Не определено";
        else state.displayValue = toDisplayValue(state.storedValue);
      };

      // This helper function converts a numeric value to a string
      // and formats this string so it fits the display.
      const toDisplayValue = (numericValue: number): string => {
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
        return result.replace(".", ",");
      };

      const toNumericValue = (stringValue: string): number => {
        const localizedString = stringValue.replace(",", ".");
        return Number(localizedString);
      };

      // If state.currentNumericInput isn't null, convert it to a number
      // and store it as currentValue. Otherwise assign null to currentValue
      const currentValue =
        state.currentNumericInput !== null
          ? toNumericValue(state.currentNumericInput)
          : null;

      // No matter what happens next, we reset state.currentNumericInput
      // so that any further numeric input starts from scratch.
      state.currentNumericInput = null;

      // If no prior value is stored
      if (state.storedValue === null) {
        // If the user pressed "=", we reset the stored operator
        // and store current value but don't do any math.
        if (currentOperatorIsEquals) {
          state.storedOperator = null;
          state.storedValue = currentValue;
        } else {
          // Else we save current value and operator as stored values
          state.storedValue = currentValue;
          state.storedOperator = currentOperatorInput;
        }
      } else if (state.storedOperator === null) {
        // If there is a stored prior value but no stored operator

        // If the current operator isn't "=" we store it
        if (!currentOperatorIsEquals)
          state.storedOperator = currentOperatorInput;
      } else if (currentValue === null) {
        // At this point we have a stored value and
        // a stored operator, but no current value.

        // If the current operator isn't "=", we replace the stored
        // operator with the current one and do nothing else.
        if (!currentOperatorIsEquals)
          state.storedOperator = currentOperatorInput;
        else {
          // We have a stored value, a stored operator but no current value,
          // and the user pressed "=". So we do the math by using the stored
          // number as both the first and the second argument, to mimic the
          // behavior of the native Windows calculator.
          state.storedValue = calculate(
            state.storedValue,
            state.storedOperator,
            state.storedValue
          );
          updateDisplay();
          // And reset the stored operator
          state.storedOperator = null;
        }
      } else {
        // We have a stored value, a stored operator and a current value.
        // So we do the math.
        state.storedValue = calculate(
          state.storedValue,
          state.storedOperator,
          currentValue
        );
        updateDisplay();
        // If the current operator is anything but "=", we store it, otherwise
        // reset the stored operator
        state.storedOperator = !currentOperatorIsEquals
          ? currentOperatorInput
          : null;
      }
    },
  },
});

export const { numericInput, operatorInput, reset } = calculatorSlice.actions;
export default calculatorSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectCalculatorDisplay = (state: RootState) =>
  state.calculator.displayValue;
