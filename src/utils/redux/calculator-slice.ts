import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  KeypadNumericInput,
  KeypadOperatorInput,
  Operator,
} from "../types/types";

export type CalculatorState = {
  currentInput: string | null;
  storedValue: number | null;
  displayValue: number | string;
};

const initialState: CalculatorState = {
  currentInput: null,
  storedValue: null,
  displayValue: 0,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    reset: (state) => initialState,

    numericInput: (state, action: PayloadAction<KeypadNumericInput>) => {
      const maxInputLength = 10;
      const inputKey = action.payload;
      const inputIsADecimalSeparator = inputKey === ",";

      if (state.currentInput === null || state.currentInput === "0") {
        // This is either the very first input key, or the second
        // key which follows "0".
        if (inputIsADecimalSeparator) state.currentInput = "0,";
        else state.currentInput = inputKey;
      } else {
        // This key continues the input sequence.
        // Ignore the input if maxInputLength has been reached.
        if (state.currentInput.length < maxInputLength) {
          // Ignore the input if it's a decimal comma but another decimal
          // comma is already contained in the string. Otherwise add
          // the input key to the string.
          if (!inputIsADecimalSeparator || !state.currentInput.includes(","))
            state.currentInput += inputKey;
        }
      }
      state.displayValue = state.currentInput;
    },
  },
});

export const { numericInput, reset } = calculatorSlice.actions;
export default calculatorSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectCalculatorDisplay = (state: RootState) =>
  state.calculator.displayValue;
