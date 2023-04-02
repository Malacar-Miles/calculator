import "./module-constructor.scss";
import {
  DraggableModuleState,
  DraggableModuleType,
  allKeypadNumericInputs,
  mathOperators,
  operatorEquals,
} from "../../utils/types-and-constants/types-and-constants";
import classNames from "classnames";
import { useContentSlice, useModeSlice, useDragStateSlice } from "../../utils/redux/interface-hooks";
import Button from "../elements/button/button";
import Display from "../elements/display/display";

/* This function constructs one of five draggable modules:
   a display, a keypad with numbers and a decimal comma,
   a keypad with arithmetic operators, a keypad with
   just the "equals" button, or a drop indicator line
   (depending on the value of moduleType).
   Meanwhile moduleState specifies whether the module
   is currently being rendered in the left or the right pane
   and whether or not it has been added to the right pane.
   The prop "moduleState" controls both the CSS and behavior
   of the module.
*/
const ModuleConstructor = ({
  moduleType,
  moduleState,
}: {
  moduleType: DraggableModuleType;
  moduleState: DraggableModuleState;
}) => {
  const { mainPaneContent } = useContentSlice();
  const { appMode } = useModeSlice();
  const { startModuleDrag, endModuleDrag } = useDragStateSlice();

  const isDeployed = mainPaneContent.includes(moduleType);
  const shouldBeGreyedOut = isDeployed && moduleState === "in-toolkit";
  const shouldBeDraggable =
    !shouldBeGreyedOut &&
    appMode === "constructor" &&
    !(moduleType === "display" && moduleState === "in-calculator");

  const moduleContent = () => {
    switch (moduleType) {
      case "keypad-operators":
        return (
          <>
            {mathOperators.map((operator, index) => (
              <Button key={index} buttonName={operator} />
            ))}
          </>
        );

      case "keypad-equals":
        return (
          <>
            <Button buttonName={operatorEquals} buttonType="equals-button" />
          </>
        );

      case "keypad-numbers":
        return (
          <>
            {allKeypadNumericInputs.map((symbol, index) => (
              <Button buttonName={symbol} key={index} />
            ))}
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

  const dynamicClassName = classNames(
    "draggable-module",
    moduleType,
    moduleState,
    {
      "greyed-out": shouldBeGreyedOut,
    }
  );

  const handleDragStart = () => {
    startModuleDrag(moduleType);
  };

  const handleDragEnd = () => {
    endModuleDrag();
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
