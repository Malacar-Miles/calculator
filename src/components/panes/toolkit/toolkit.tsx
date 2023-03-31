import "./toolkit.scss";
import ModuleConstructor from "../../module-constructor/module-constructor";
import { allDraggableModuleTypes } from "../../../utils/types/types-and-constants";
import { useModeSlice } from "../../../utils/redux/interface-hooks";

const Toolkit = () => {
  const { appMode } = useModeSlice();

  const allModules = [...allDraggableModuleTypes];
  allModules.pop(); // Removes "drop-indicator-line" module

  return (
    <aside className="toolkit-pane">
      {appMode === "constructor" &&
        allModules.map((moduleType, index) => (
          <ModuleConstructor
            key={index}
            moduleType={moduleType}
            moduleState="in-toolkit"
          />
        ))}
    </aside>
  );
};

export default Toolkit;
