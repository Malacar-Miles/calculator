import "./toolkit.scss";
import ModuleConstructor from "../../module-constructor/module-constructor";
import { DraggableModuleType } from "../../../utils/types/types";
import { useDispatch } from "react-redux";
import { append } from "../../../utils/redux/content-slice";

const Toolkit = () => {
  const dispatch = useDispatch();

  const allModules: DraggableModuleType[] = [
    "display",
    "keypad-operators",
    "keypad-numbers",
    "keypad-equals",
  ];

  const appendModule = (module: DraggableModuleType) => {
    dispatch(append(module));
  };

  return (
    <aside className="toolkit-pane">
      {allModules.map((moduleType, index) => (
        <ModuleConstructor key={index} moduleType={moduleType} clickHandler={() => appendModule(moduleType)} />
      ))}
    </aside>
  );
};

export default Toolkit;
