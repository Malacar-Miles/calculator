import "./display.scss";
import { useSelector } from "react-redux";
import { selectCalculatorDisplay } from "../../../utils/redux/calculator-slice";

const Display = () => {
  const displayValue = useSelector(selectCalculatorDisplay);
  return <span className="display-element">{displayValue}</span>;
};

export default Display;
