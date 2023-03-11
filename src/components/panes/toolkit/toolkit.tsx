import "./toolkit.scss";
import ModuleConstructor from "../../module-constructor/module-constructor";
import { DraggableModuleType } from "../../../utils/types/types";
const Toolkit = () => {
  const allModules: DraggableModuleType[] = [
    "display",
    "keypad-operators",
    "keypad-numbers",
    "keypad-equals",
  ];

  return (
    <aside className="toolkit-pane">
      {allModules.map((moduleType, index) => (
        <ModuleConstructor key={index} moduleType={moduleType} />
      ))}
    </aside>
  );
};

export default Toolkit;
