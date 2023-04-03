import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { toDisplayValue, toNumericValue, calculate } from "./helper-functions";
import {
  KeypadNumericInput,
  KeypadOperatorInput,
  MathOperator,
  decimalSeparator,
} from "../types-and-constants/types-and-constants";

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
      const inputIsADecimalSeparator = inputKey === decimalSeparator;

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
        if (inputIsADecimalSeparator)
          state.currentNumericInput = "0" + decimalSeparator; // should be "0."
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
            !state.currentNumericInput.includes(decimalSeparator)
          )
            state.currentNumericInput += inputKey;
        }
      }
      state.displayValue = state.currentNumericInput;
    },

    operatorInput: (state, action: PayloadAction<KeypadOperatorInput>) => {
      const currentOperatorInput = action.payload;
      const currentOperatorIsEquals = currentOperatorInput === "=";

      // This helper function will be used whenever we need to display
      // calculation results.
      const updateDisplay = () => {
        console.log(state.storedValue);
        if (state.storedValue === null) state.displayValue = "Div by zero";
        else state.displayValue = toDisplayValue(state.storedValue);
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
