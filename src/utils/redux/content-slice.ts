import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { MainPaneContent, DraggableModuleType } from "../types/types";
import { RootState } from "./store";

export type ContentState = {
  value: MainPaneContent;
};

const initialState: ContentState = {
  value: [],
};

export const contentSlice = createSlice({
  name: "mainPaneContent",
  initialState,
  reducers: {
    // Add a specified module name to the back of the array
    append: (state, action: PayloadAction<DraggableModuleType>) => {
      const modulesArray = state.value;
      const moduleToAdd = action.payload;
      if (modulesArray.indexOf(moduleToAdd) === -1)
        modulesArray.push(action.payload);
    },

    // Remove a specified module name from the array
    remove: (state, action: PayloadAction<DraggableModuleType>) => {
      const modulesArray = state.value;
      const moduleToAdd = action.payload;
      state.value = modulesArray.filter(
        (moduleName) => moduleName !== moduleToAdd
      );
    },

    // Add a specified module name before a specified 'targetModule' of the array
    insert: (
      state,
      action: PayloadAction<{
        moduleToInsert: DraggableModuleType;
        targetModule: DraggableModuleType;
      }>
    ) => {
      const { moduleToInsert, targetModule } = action.payload;
      const modulesArray = state.value;
      const targetIndex = modulesArray.indexOf(targetModule);
      if (targetIndex === -1)
        throw new Error(
          "Insertion failed: target module not found in the array."
        );
      if (modulesArray.indexOf(moduleToInsert) === -1)
        modulesArray.splice(targetIndex, 0, moduleToInsert);
    },
  },
});

export const { append, remove, insert } = contentSlice.actions;
export default contentSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectMainPaneContent = (state: RootState) =>
  state.mainPaneContent.value;
