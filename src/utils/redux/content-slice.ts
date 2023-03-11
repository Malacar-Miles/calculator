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
    // Remove a specified module name from the array
    remove: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleToAdd = action.payload;
      state.value = state.value.filter(
        (moduleName) => moduleName !== moduleToAdd
      );
    },

    // Add a specified module name to the back of the array
    append: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleToAdd = action.payload;
      // Firstly, remove the module name from the array in case it's contained there
      state.value = state.value.filter(
        (moduleName) => moduleName !== moduleToAdd
      );
      // Then add the module
      state.value.push(moduleToAdd);
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
      const targetIndex = state.value.indexOf(targetModule);
      if (targetIndex === -1)
        throw new Error(
          `Insertion failed: target module "${targetModule}" not found in the array.`
        );
      else {
        // Firstly, remove the module name from the array in case it's contained there
        state.value = state.value.filter(
          (moduleName) => moduleName !== moduleToInsert
        );
        // Then insert the module
        state.value.splice(targetIndex, 0, moduleToInsert);
      }
    },
  },
});

export const { append, remove, insert } = contentSlice.actions;
export default contentSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectMainPaneContent = (state: RootState) =>
  state.mainPaneContent.value;
