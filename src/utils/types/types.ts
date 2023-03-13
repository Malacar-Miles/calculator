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
