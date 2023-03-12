export const allDraggableModuleTypes = [
  "display",
  "keypad-operators",
  "keypad-numbers",
  "keypad-equals",
  "drop-indicator-line"
] as const;

export type DraggableModuleType = typeof allDraggableModuleTypes[number];

export type DraggableModuleState =
  | "in-toolkit-and-available"
  | "in-toolkit-and-unavailable"
  | "deployed";

export type MainPaneMode = "runtime" | "constructor";

export type MainPaneContent = DraggableModuleType[];
