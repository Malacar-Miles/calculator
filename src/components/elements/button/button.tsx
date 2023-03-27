import "./button.scss";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
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

  const dynamicClassName = classNames("button-element", {
    "equals-button": buttonType === "equals-button",
    clickable: currentMode === "runtime",
  });

  return (
    <button className={dynamicClassName} onClick={handleClick}>
      {buttonName}
    </button>
  );
};

export default Button;
