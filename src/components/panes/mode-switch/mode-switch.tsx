import "./mode-switch.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggle, selectMode } from "../../../utils/redux/mode-slice";
import { ReactComponent as EyeLogo } from "../../../assets/eye.svg";
import { ReactComponent as AngleBrackets } from "../../../assets/angle-brackets.svg";

const ModeSwitch = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode);

  const runtimeButtonClassName =
    currentMode === "runtime" ? "mode-button active" : "mode-button";

  const constructorButtonClassName =
    currentMode === "constructor" ? "mode-button active" : "mode-button";

  const handleRuntimeButtonClick = () => {
    if (currentMode !== "runtime") dispatch(toggle());
  };

  const handleConstructorButtonClick = () => {
    if (currentMode !== "constructor") dispatch(toggle());
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
