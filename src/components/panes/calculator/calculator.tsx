import "./calculator.scss";
import { useRef, useState } from "react";
import classNames from "classnames";
import {
  useDragStateSlice,
  useModeSlice,
  useContentSlice,
} from "../../../utils/redux/interface-hooks";
import { DraggableModuleType } from "../../../utils/types-and-constants/types-and-constants";
import ModuleConstructor from "../../module-constructor/module-constructor";
import DropHint from "../../elements/drop-hint/drop-hint";

const Calculator = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { mainPaneContent, appendModule, prependModule, insertModule, removeModule } = useContentSlice();
  const filteredMainPaneContent = mainPaneContent.filter(
    (moduleName) => moduleName !== "drop-indicator-line"
  );
  const { appMode } = useModeSlice();
  const { dragState } = useDragStateSlice();
  const dragOverTargetName = useRef<DraggableModuleType | "canvas" | null>(
    null
  );
  const isEmpty = mainPaneContent.length === 0;

  const identifyTarget = (event: React.MouseEvent<HTMLElement>) => {
    /* Extract the second class name from the target
       of the event. It should be either "canvas" or
       a name of the draggable module. */
    const eventTarget = event.target as HTMLElement;
    const eventTargetClass = eventTarget.classList[1];
    return eventTargetClass as DraggableModuleType | "canvas";
  };

  const insertModuleByEvent = (
    event: React.MouseEvent<HTMLElement>,
    moduleToInsert: DraggableModuleType
  ) => {
    const dropTarget = identifyTarget(event);
    if (dropTarget === "display") return;
    if (dropTarget === "canvas") appendModule(moduleToInsert);
    else insertModule(moduleToInsert, dropTarget);
  };

  const handleDragOver = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (appMode === "runtime" || !dragState.moduleBeingDragged) return;

    if (isEmpty) setIsHighlighted(true);
    else {
      /* This code checks the target module name. If it
      has changed, the code removes and re-inserts the indicator
      component (blue line) */
      const dropTarget = identifyTarget(event);
      if (dragOverTargetName.current !== dropTarget) {
        dragOverTargetName.current = dropTarget;
        removeModule("drop-indicator-line");

        /* Do not insert the drop indicator line if
        the any of these conditions is true:
        - dragged module is the same as the target module;
        - target module is the next one in the list after
          the dragged module;
        - target is the canvas and the dragged module
          is the last one in the list.
        In all these cases the order of modules won't change
        when the drop happens, so the indicator should not appear.
        However if we're dragging the display, show the indicator
        regardless of the above conditions.  */

        const condition1 = dragState.moduleBeingDragged === dropTarget;

        const condition2 =
          filteredMainPaneContent.indexOf(dropTarget as DraggableModuleType) -
            filteredMainPaneContent.indexOf(dragState.moduleBeingDragged) ===
          1;

        const condition3 =
          dropTarget === "canvas" &&
          filteredMainPaneContent.lastIndexOf(dragState.moduleBeingDragged) ===
            filteredMainPaneContent.length - 1;

        if (
          !(condition1 || condition2 || condition3) ||
          dragState.moduleBeingDragged === "display"
        )
          if (dragState.moduleBeingDragged === "display")
            // If it's a display, it should be on top
            prependModule("drop-indicator-line");
          else insertModuleByEvent(event, "drop-indicator-line");
      }
    }
  };

  const handleDrop = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const droppedModuleType = dragState.moduleBeingDragged;
    if (appMode === "runtime" || !droppedModuleType) return;

    /* Reset the current dragoverTargetName that's used
    in handleDragOver function and remove the drop target
    indicator (blue line) from Redux, then insert the
    module that's being dragged */
    dragOverTargetName.current = null;
    if (isEmpty) setIsHighlighted(false);
    else removeModule("drop-indicator-line");

    // If it's a display, it should be on top
    if (droppedModuleType === "display") prependModule(droppedModuleType);
    else insertModuleByEvent(event, droppedModuleType);
  };

  const handleDragLeave = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (appMode === "runtime") return;
    /* This code ensures that the event only fires
    when leaving the calculator canvas. Otherwise
    it would fire within the canvas unexpectedly,
    when moving between a parent and a child
    of the canvas. */
    const exitTarget = event.relatedTarget as HTMLElement;
    if (!exitTarget) {
      // This fixes a weird bug where sometimes
      // onDragLeave fires instead of onDrop when
      // I do the drag and drop very quicly.
      handleDrop(event);
      return;
    }
    const exitTargetClass = exitTarget.classList[0];
    if (
      exitTargetClass !== "calculator-pane" &&
      exitTargetClass !== "draggable-module"
    ) {
      if (isEmpty) setIsHighlighted(false);
      else {
        removeModule("drop-indicator-line");
        dragOverTargetName.current = null;
      }
    }
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (appMode === "runtime") return;
    const moduleToRemove = identifyTarget(event);
    if (moduleToRemove !== "canvas") removeModule(moduleToRemove);
  };

  const dynamicClassName = classNames("calculator-pane", "canvas", {
    empty: isEmpty,
    highlighted: isHighlighted,
  });

  return (
    <main
      className={dynamicClassName}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDoubleClick={handleDoubleClick}
    >
      {isEmpty ? (
        <DropHint />
      ) : (
        mainPaneContent.map((module, index) => (
          <ModuleConstructor
            key={index}
            moduleType={module}
            moduleState="in-calculator"
          />
        ))
      )}
    </main>
  );
};

export default Calculator;
