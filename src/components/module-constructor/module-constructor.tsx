import "./module-constructor.scss";
import { DraggableModuleType } from "../../utils/types/types";
import Button from "../elements/button/button";

const ModuleConstructor = ({
  moduleType,
}: {
  moduleType: DraggableModuleType;
}) => {
  const dynamicClassName = "draggable-module " + moduleType;
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

  switch (moduleType) {
    case "keypad-operators":
      return (
        <div className={dynamicClassName}>
          <Button name="/" action={mockAction} />
          <Button name="x" action={mockAction} />
          <Button name="-" action={mockAction} />
          <Button name="+" action={mockAction} />
        </div>
      );
    case "keypad-equals":
      return (
        <div className={dynamicClassName}>
          <Button name="=" action={mockAction} />
        </div>
      );
    case "keypad-numbers":
      return (
        <div className={dynamicClassName}>
          {numericButtons.map((name, index) => (
            <Button name={name} action={mockAction} key={index} />
          ))}
        </div>
      );
    case "display":
      return (
        <div className={dynamicClassName}>
          <Button name="Display" action={mockAction} />
        </div>
      );
    default:
      throw new Error("Invalid 'type' prop of 'ModuleConstructor' component.");
  }
};

export default ModuleConstructor;
