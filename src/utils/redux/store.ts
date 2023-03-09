import { configureStore } from "@reduxjs/toolkit";
import mainPaneModeReducer from "./mode-slice";
import mainPaneContentReducer from "./content-slice";

export const store = configureStore({
  reducer: {
    mainPaneMode: mainPaneModeReducer,
    mainPaneContent: mainPaneContentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;