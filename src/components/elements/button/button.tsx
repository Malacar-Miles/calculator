import "./button.scss";
import classNames from "classnames";
import { KeypadInput } from "../../../utils/types/types-and-constants";
import {
  useCalculatorSlice,
  useModeSlice,
} from "../../../utils/redux/interface-hooks";

const Button = ({
  buttonName,
  buttonType,
}: {
  buttonName: string;
  buttonType?: string;
}) => {
  const { sendCalculatorInput } = useCalculatorSlice();
  const { appMode } = useModeSlice();

  const handleClick = () => {
    if (appMode === "runtime") sendCalculatorInput(buttonName as KeypadInput);
  };

  const dynamicClassName = classNames("button-element", {
    "equals-button": buttonType === "equals-button",
    clickable: appMode === "runtime",
  });

  return (
    <button className={dynamicClassName} onClick={handleClick}>
      {buttonName}
    </button>
  );
};

export default Button;
