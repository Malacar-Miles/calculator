import "./toolkit.scss";
import ModuleConstructor from "../../module-constructor/module-constructor";
import { allDraggableModuleTypes } from "../../../utils/types/types";
import { useSelector } from "react-redux";
import { selectMode } from "../../../utils/redux/mode-slice";

const Toolkit = () => {
  const currentMode = useSelector(selectMode);

  const allModules = [...allDraggableModuleTypes];
  allModules.pop();

  return (
    <aside className="toolkit-pane">
      {currentMode === "constructor" &&
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
