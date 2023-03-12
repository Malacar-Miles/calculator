import "./module-constructor.scss";
import {
  DraggableModuleState,
  DraggableModuleType,
} from "../../utils/types/types";
import Button from "../elements/button/button";
import { useDispatch } from "react-redux";
import { startDrag, endDrag } from "../../utils/redux/drag-state-slice";

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
  moduleState?: DraggableModuleState;
}) => {
  const dispatch = useDispatch();
  const numericButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
    ",",
  ];
  const mockAction = () => {};

  const moduleContent = () => {
    switch (moduleType) {
      case "keypad-operators":
        return (
          <>
            {["/", "x", "-", "+"].map((operator, index) => (
              <Button key={index} name={operator} action={mockAction} />
            ))}
          </>
        );
      case "keypad-equals":
        return (
          <>
            <Button name="=" action={mockAction} />
          </>
        );
      case "keypad-numbers":
        return (
          <>
            {numericButtons.map((name, index) => (
              <Button name={name} action={mockAction} key={index} />
            ))}
          </>
        );
      case "display":
        return (
          <>
            <Button name="Display" action={mockAction} />
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

  const dynamicClassName = "draggable-module " + moduleType + " " + moduleState;

  const handleDragStart = () => {
    dispatch(startDrag(moduleType));
  };

  const handleDragEnd = () => {
    dispatch(endDrag());
  };

  return (
    <div
      className={dynamicClassName}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {moduleContent()}
    </div>
  );
};

export default ModuleConstructor;
