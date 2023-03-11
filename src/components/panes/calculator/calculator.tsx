import "./calculator.scss";
import { useDispatch, useSelector } from "react-redux";
import { DragEvent } from "react";
import { selectMainPaneContent } from "../../../utils/redux/content-slice";
import { append, remove, insert } from "../../../utils/redux/content-slice";
import { DraggableModuleType } from "../../../utils/types/types";
import ModuleConstructor from "../../module-constructor/module-constructor";

const Calculator = () => {
  const dispatch = useDispatch();
  const mainPaneContent = useSelector(selectMainPaneContent);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    const droppedModuleType = event.dataTransfer.getData(
      "text"
    ) as DraggableModuleType;

    /* Drop target can be either the calculator pane, a
       draggable module or a button contained in that module.
       If it's a button, we want to get its parent module */
    const eventTarget = event.target as HTMLElement;
    const dropTarget = (
      eventTarget.nodeName === "BUTTON" ? eventTarget.parentNode : eventTarget
    ) as HTMLElement;

    if (dropTarget.nodeName === "MAIN") dispatch(append(droppedModuleType));
    else {
      // Get module type from dropTarget's class list, it should be the second entry
      const dropTargetModuleType = dropTarget.classList[1] as DraggableModuleType;
      dispatch(insert({
        moduleToInsert: droppedModuleType,
        targetModule: dropTargetModuleType
      }));
    }
  };

  return (
    <main
      className="calculator-pane"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {mainPaneContent.map((module, index) => (
        <ModuleConstructor
          key={index}
          moduleType={module}
          moduleState={"deployed"}
        />
      ))}
    </main>
  );
};

export default Calculator;
