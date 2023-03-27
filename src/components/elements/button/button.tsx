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
  allOperators,
  allKeypadNumericInputs,
} from "../../../utils/types/types-and-constants";

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

    if (allKeypadNumericInputs.includes(buttonName as KeypadNumericInput))
      dispatch(numericInput(buttonName as KeypadNumericInput));

    if (allOperators.includes(buttonName as KeypadOperatorInput))
      dispatch(operatorInput(buttonName as KeypadOperatorInput));
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
