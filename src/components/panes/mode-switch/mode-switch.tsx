import "./mode-switch.scss";
import classNames from "classnames";
import { useModeSlice, useCalculatorSlice } from "../../../utils/redux/interface-hooks";
import { ReactComponent as EyeLogo } from "../../../assets/eye.svg";
import { ReactComponent as AngleBrackets } from "../../../assets/angle-brackets.svg";

const ModeSwitch = () => {
  const { appMode, toggleAppMode } = useModeSlice();
  const { resetCalculatorState } = useCalculatorSlice();

  const runtimeButtonClassName = classNames("mode-button", {
    "active": appMode === "runtime",
  });

  const constructorButtonClassName = classNames("mode-button", {
    "active": appMode === "constructor",
  });

  const handleRuntimeButtonClick = () => {
    if (appMode !== "runtime") toggleAppMode();
  };

  const handleConstructorButtonClick = () => {
    if (appMode !== "constructor") {
      toggleAppMode();
      resetCalculatorState();
    }
  };

  return (
    <div className="mode-switch-pane">
      <button
        className={runtimeButtonClassName}
        onClick={handleRuntimeButtonClick}
      >
        <EyeLogo className="icon"/> <span>Runtime</span>
      </button>
      <button
        className={constructorButtonClassName}
        onClick={handleConstructorButtonClick}
      >
        <AngleBrackets className="icon"/> <span>Constructor</span>
      </button>
    </div>
  );
};

export default ModeSwitch;
