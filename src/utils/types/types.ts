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

export type KeypadNumericInput =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | ",";

export type Operator = "+" | "-" | "*" | "/";

export type KeypadOperatorInput = Operator | "=";

// export type CalculatorLogicState = 