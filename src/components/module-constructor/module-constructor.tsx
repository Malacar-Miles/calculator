import "./module-constructor.scss";
import {
  DraggableModuleState,
  DraggableModuleType,
} from "../../utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { selectMainPaneContent } from "../../utils/redux/content-slice";
import { selectMode } from "../../utils/redux/mode-slice";
import { startDrag, endDrag } from "../../utils/redux/drag-state-slice";
import Button from "../elements/button/button";
import Display from "../elements/display/display";

/* This function constructs one of four draggable modules:
   a display, a keypad with numbers and a decimal comma,
   a keypad with arithmetic operators or a keypad with
   just the "equals" button, depending on the value of
   the moduleType prop. Meanwhile the moduleState prop
   specifies whether the module is currently being rendered
   in the left or the right pane, and whether or not it has
   been added to the right pane. The moduleState prop controls
   both the CSS and behavior of the module.
*/
const ModuleConstructor = ({
  moduleType,
  moduleState,
}: {
  moduleType: DraggableModuleType;
  moduleState: DraggableModuleState;
}) => {
  const dispatch = useDispatch();
  const mainPaneContent = useSelector(selectMainPaneContent);
  const currentMode = useSelector(selectMode);

  const isDeployed = mainPaneContent.includes(moduleType);
  const shouldBeGreyedOut = isDeployed && moduleState === "in-toolkit";
  const shouldBeDraggable =
    !shouldBeGreyedOut &&
    currentMode === "constructor" &&
    !(moduleType === "display" && moduleState === "in-calculator");

  const moduleContent = () => {
    switch (moduleType) {
      case "keypad-operators":
        return (
          <>
            {["/", "x", "-", "+"].map((operator, index) => (
              <Button key={index} buttonName={operator} />
            ))}
          </>
        );

      case "keypad-equals":
        return (
          <>
            <Button buttonName="=" buttonType="equals-button" />
          </>
        );

      case "keypad-numbers":
        return (
          <>
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","].map(
              (symbol, index) => (
                <Button buttonName={symbol} key={index} />
              )
            )}
          </>
        );

      case "display":
        return (
          <>
            <Display />
          </>
        );

      case "drop-indicator-line":
        return (
          <>
            <div className="decorator-rhombus left"></div>
            <div className="decorator-rhombus right"></div>
          </>
        );

      default:
        throw new Error(
          "Invalid moduleType prop of ModuleConstructor component."
        );
    }
  };

  let dynamicClassName = "draggable-module " + moduleType + " " + moduleState;
  if (shouldBeGreyedOut) dynamicClassName += " greyed-out";

  const handleDragStart = () => {
    dispatch(startDrag(moduleType));
  };

  const handleDragEnd = () => {
    dispatch(endDrag());
  };

  return (
    <div
      className={dynamicClassName}
      draggable={shouldBeDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {moduleContent()}
    </div>
  );
};

export default ModuleConstructor;
