import "./button.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectMode } from "../../../utils/redux/mode-slice";
import {
  numericInput,
  operatorInput,
} from "../../../utils/redux/calculator-slice";
import {
  KeypadNumericInput,
  KeypadOperatorInput,
} from "../../../utils/types/types";

const Button = ({
  buttonName,
  buttonType,
}: {
  buttonName: string;
  buttonType?: string;
}) => {
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode);

  const handleClick = () => {
    if (currentMode !== "runtime") return;

    // If buttonName is "x", use "*" instead
    const buttonId = buttonName === "x" ? "*" : buttonName;

    if (buttonId === "," || (buttonId >= "0" && buttonId <= "9"))
      dispatch(numericInput(buttonId as KeypadNumericInput));

    const allOperators = "+-*/=";
    if (allOperators.includes(buttonId))
      dispatch(operatorInput(buttonId as KeypadOperatorInput));
  };

  let dynamicClassName = "button-element";
  if (buttonType === "equals-button") dynamicClassName += " equals-button";
  if (currentMode === "runtime") dynamicClassName += " clickable";

  return (
    <button className={dynamicClassName} onClick={handleClick}>
      {buttonName}
    </button>
  );
};

export default Button;
