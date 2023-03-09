export type DraggableModuleType =
  | "display"
  | "keypad-numbers"
  | "keypad-operators"
  | "keypad-equals";

export type DraggableModuleState =
  | "in-toolkit-and-available"
  | "in-toolkit-and-unavailable"
  | "deployed";

export type MainPaneMode = "runtime" | "constructor";

export type MainPaneContent = DraggableModuleType[];