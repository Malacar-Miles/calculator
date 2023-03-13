import { configureStore } from "@reduxjs/toolkit";
import mainPaneModeReducer from "./mode-slice";
import mainPaneContentReducer from "./content-slice";
import dragStateReducer from "./drag-state-slice";
import calculatorReducer from "./calculator-slice";

export const store = configureStore({
  reducer: {
    mainPaneMode: mainPaneModeReducer,
    mainPaneContent: mainPaneContentReducer,
    dragState: dragStateReducer,
    calculator: calculatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;