import { createSlice } from "@reduxjs/toolkit";
import { MainPaneMode } from "../types/types";
import { RootState } from "./store";

export type ModeState = {
  value: MainPaneMode;
};

const initialState: ModeState = {
  value: "constructor"
};

export const modeSlice = createSlice({
  name: "mainPaneMode",
  initialState,
  reducers: {
    toggle: (state) => {
      if (state.value === "constructor")
        state.value = "runtime";
      else state.value = "constructor";
    }
  }
});

export const { toggle } = modeSlice.actions;
export default modeSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectMode = (state: RootState) => state.mainPaneMode.value;