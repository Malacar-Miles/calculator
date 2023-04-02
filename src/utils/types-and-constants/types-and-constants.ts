export const allDraggableModuleTypes = [
  "display",
  "keypad-operators",
  "keypad-numbers",
  "keypad-equals",
  "drop-indicator-line",
] as const;

export type DraggableModuleType = typeof allDraggableModuleTypes[number];

export type DraggableModuleState = "in-toolkit" | "in-calculator";

export type MainPaneMode = "runtime" | "constructor";

export type MainPaneContent = DraggableModuleType[];

export const decimalSeparator = "." as const;

export const allKeypadNumericInputs = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "0",
  decimalSeparator,
] as const;

export type KeypadNumericInput = typeof allKeypadNumericInputs[number];

export const mathOperators = ["+", "-", "x", "/"] as const;

export type MathOperator = typeof mathOperators[number];

export const operatorEquals = "=" as const;

export type OperatorEquals = typeof operatorEquals;

export const allOperators = [...mathOperators, operatorEquals] as const;

export type KeypadOperatorInput = typeof allOperators[number];

export type KeypadInput = KeypadNumericInput | KeypadOperatorInput;
