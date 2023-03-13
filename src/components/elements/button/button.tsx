import "./button.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectMode } from "../../../utils/redux/mode-slice";
import { numericInput } from "../../../utils/redux/calculator-slice";
import { KeypadNumericInput } from "../../../utils/types/types";

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

    if (buttonName === "," || (buttonName >= "0" && buttonName <= "9"))
      dispatch(numericInput(buttonName as KeypadNumericInput));
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
