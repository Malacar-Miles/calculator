import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { DraggableModuleType } from "../types/types";
import { RootState } from "./store";

export type DragState = {
  isDragActive: boolean;
  moduleBeingDragged: DraggableModuleType | null;
};

const initialState: DragState = {
  isDragActive: false,
  moduleBeingDragged: null,
};

export const dragStateSlice = createSlice({
  name: "dragState",
  initialState,
  reducers: {
    startDrag: (state, action: PayloadAction<DraggableModuleType>) => {
      const moduleName = action.payload;
      state.isDragActive = true;
      state.moduleBeingDragged = moduleName;
    },
    endDrag: (state) => {
      state.isDragActive = false;
      state.moduleBeingDragged = null;
    },
  },
});

export const { startDrag, endDrag } = dragStateSlice.actions;
export default dragStateSlice.reducer;

// This function is to be used as an argument for useSelector
export const selectDragState = (state: RootState) => state.dragState;
