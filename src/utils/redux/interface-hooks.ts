import { useDispatch, useSelector } from "react-redux";
import {
  numericInput,
  operatorInput,
  reset,
  selectCalculatorDisplay,
} from "./calculator-slice";
import {
  append,
  prepend,
  remove,
  insert,
  selectMainPaneContent,
} from "./content-slice";
import { startDrag, endDrag, selectDragState } from "./drag-state-slice";
import { toggle, selectMode } from "./mode-slice";
import {
  KeypadNumericInput,
  KeypadOperatorInput,
  KeypadInput,
  allKeypadNumericInputs,
  allOperators,
  DraggableModuleType,
} from "../types-and-constants/types-and-constants";

export const useCalculatorSlice = () => {
  const dispatch = useDispatch();

  const sendCalculatorInput = (keypadButton: KeypadInput) => {
    if (allKeypadNumericInputs.includes(keypadButton as KeypadNumericInput))
      dispatch(numericInput(keypadButton as KeypadNumericInput));
    else if (allOperators.includes(keypadButton as KeypadOperatorInput))
      dispatch(operatorInput(keypadButton as KeypadOperatorInput));
    else throw new Error("Invalid keypad input.");
  };

  const resetCalculatorState = () => {
    dispatch(reset());
  };

  const calculatorDisplay = useSelector(selectCalculatorDisplay);

  return {
    sendCalculatorInput: sendCalculatorInput,
    resetCalculatorState: resetCalculatorState,
    calculatorDisplay: calculatorDisplay,
  };
};

export const useContentSlice = () => {
  const dispatch = useDispatch();

  const appendModule = (moduleToAppend: DraggableModuleType) => {
    dispatch(append(moduleToAppend));
  };

  const removeModule = (moduleToRemove: DraggableModuleType) => {
    dispatch(remove(moduleToRemove));
  };

  const prependModule = (moduleToPrepend: DraggableModuleType) => {
    dispatch(prepend(moduleToPrepend));
  };

  const insertModule = (
    moduleToInsert: DraggableModuleType,
    targetModule: DraggableModuleType
  ) => {
    dispatch(
      insert({
        moduleToInsert: moduleToInsert,
        targetModule: targetModule,
      })
    );
  };

  const mainPaneContent = useSelector(selectMainPaneContent);

  return {
    appendModule: appendModule,
    removeModule: removeModule,
    prependModule: prependModule,
    insertModule: insertModule,
    mainPaneContent: mainPaneContent,
  };
};

export const useDragStateSlice = () => {
  const dispatch = useDispatch();

  const startModuleDrag = (moduleBeingDragged: DraggableModuleType) => {
    dispatch(startDrag(moduleBeingDragged));
  };

  const endModuleDrag = () => {
    dispatch(endDrag());
  };

  const dragState = useSelector(selectDragState);

  return {
    startModuleDrag: startModuleDrag,
    endModuleDrag: endModuleDrag,
    dragState: dragState,
  };
};

export const useModeSlice = () => {
  const dispatch = useDispatch();

  const toggleAppMode = () => {
    dispatch(toggle());
  };

  const appMode = useSelector(selectMode);

  return {
    toggleAppMode: toggleAppMode,
    appMode: appMode,
  };
};
