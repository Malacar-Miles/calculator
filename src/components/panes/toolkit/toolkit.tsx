import "./toolkit.scss";
import ModuleConstructor from "../../module-constructor/module-constructor";
import { allDraggableModuleTypes } from "../../../utils/types/types";
const Toolkit = () => {
  const allModules = [...allDraggableModuleTypes];
  allModules.pop();
  return (
    <aside className="toolkit-pane">
      {allModules.map((moduleType, index) => (
        <ModuleConstructor key={index} moduleType={moduleType} />
      ))}
    </aside>
  );
};

export default Toolkit;
