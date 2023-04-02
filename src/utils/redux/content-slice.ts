import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { MainPaneContent, DraggableModuleType } from "../types-and-constants/types-and-constants";
import { RootState } from "./store";

type ContentState = {
  value: MainPaneContent;
};

const initialState: ContentState = {
  value: [],
};

const contentSlice = createSlice({
  name: "mainPaneContent",
  initialState,
  reducers: {
    // Remove a specified module name from the array
    remove: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleToRemove = action.payload;
      state.value = state.value.filter(
        (moduleName) => moduleName !== moduleToRemove
      );
    },

    // Add a specified module name to the back of the array
    append: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleToAppend = action.payload;
      // Firstly, remove the module name from the array in case it's contained there
      state.value = state.value.filter(
        (moduleName) => moduleName !== moduleToAppend
      );
      // Then add the module
      state.value.push(moduleToAppend);
    },

    // Add a specified module to the start of the array.
    // Should only be used with the "display" module or
    // its target indicator (blue line).
    prepend: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleToPrepend = action.payload;
      // Firstly, remove the module name from the array in case it's contained there
      state.value = state.value.filter(
        (moduleName) => moduleName !== moduleToPrepend
      );
      // Then add the module
      state.value.splice(0, 0, moduleToPrepend);
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
      let targetIndex = state.value.indexOf(targetModule);
      if (targetIndex === -1)
        throw new Error(
          `Insertion failed: target module "${targetModule}" not found in the array.`
        );
      else {
        // Firstly, check if the module is already contained in the array
        // and memorize its index, then remove the module
        const existingIndex = state.value.indexOf(moduleToInsert);
        if (existingIndex !== -1) {
          state.value.splice(existingIndex, 1);
          // If the removed element comes before targetIndex,
          // decrement targetIndex by 1 to preserve the correct
          // insertion spot.
          if (existingIndex < targetIndex) targetIndex--;
        }
        // Then insert the module
        state.value.splice(targetIndex, 0, moduleToInsert);
      }
    },
  },
});

export const { append, prepend, remove, insert } = contentSlice.actions;
export default contentSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectMainPaneContent = (state: RootState) =>
  state.mainPaneContent.value;
