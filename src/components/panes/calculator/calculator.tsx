import "./calculator.scss";
import { useDispatch, useSelector } from "react-redux";
import { DragEvent, useRef } from "react";
import {
  append,
  remove,
  insert,
  selectMainPaneContent,
} from "../../../utils/redux/content-slice";
import { selectDragState } from "../../../utils/redux/drag-state-slice";
import { DraggableModuleType } from "../../../utils/types/types";
import ModuleConstructor from "../../module-constructor/module-constructor";

const Calculator = () => {
  const dispatch = useDispatch();
  const mainPaneContent = useSelector(selectMainPaneContent);
  const dragOverTargetName = useRef<DraggableModuleType | "canvas" | null>(
    null
  );

  const dragState = useSelector(selectDragState);

  const identifyDropTarget = (event: DragEvent) => {
    /* Extract the drop target from the event.
       Drop target can be either the calculator pane, a
       draggable module or a button contained in that module.
       If it's a button, we want to get its parent module */
    const eventTarget = event.target as HTMLElement;
    const dropTarget = (
      eventTarget.nodeName === "BUTTON" ? eventTarget.parentNode : eventTarget
    ) as HTMLElement;
    // Return the second className of dropTarget. It should be
    // either a module name or "canvas" if it's the calculator pane
    return dropTarget.classList[1] as DraggableModuleType | "canvas";
  };

  const insertModule = (
    event: DragEvent,
    moduleToInsert: DraggableModuleType
  ) => {
    const dropTarget = identifyDropTarget(event);
    if (dropTarget === "canvas") dispatch(append(moduleToInsert));
    else
      dispatch(
        insert({
          moduleToInsert: moduleToInsert,
          targetModule: dropTarget,
        })
      );
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!dragState.isDragActive) return;

    /* This code checks the target module name. If it
    has changed, and the target itself isn't the blue line,
    the code removes and re-inserts the indicator
    component (blue line) */
    const dropTarget = identifyDropTarget(event);
    if (
      dragOverTargetName.current !== dropTarget &&
      dropTarget !== "drop-indicator-line"
    ) {
      dragOverTargetName.current = dropTarget;
      dispatch(remove("drop-indicator-line"));
      insertModule(event, "drop-indicator-line");
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const droppedModuleType = dragState.moduleBeingDragged;
    if (!droppedModuleType) return;

    /* Reset the current dragoverTargetName that's used
    in handleDragOver function and remove the drop target
    indicator (blue line) from Redux, then insert the
    module that's being dragged */
    dragOverTargetName.current = null;
    dispatch(remove("drop-indicator-line"));
    insertModule(event, droppedModuleType);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    /* This code ensures that the event only fires
    when leaving the calculator canvas. Otherwise
    it would fire within the canvas unexpectedly,
    when moving between a parent and a child
    of the canvas */
    const exitTarget = event.relatedTarget as HTMLElement;
    if (
      exitTarget.parentElement?.classList[1] !== "canvas" &&
      exitTarget.parentElement?.parentElement?.classList[1] !== "canvas"
    ) {
      dispatch(remove("drop-indicator-line"));
      dragOverTargetName.current = null;
    }
  };

  return (
    <main
      className="calculator-pane canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
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
