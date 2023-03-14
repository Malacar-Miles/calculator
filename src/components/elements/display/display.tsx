import "./display.scss";
import { useSelector } from "react-redux";
import { selectCalculatorDisplay } from "../../../utils/redux/calculator-slice";

const Display = () => {
  const displayValue = useSelector(selectCalculatorDisplay);
  const valueLength = displayValue.length;
  const smallerSizeThreshold = 10;
  const smallestSizeThreshold = 13;

  let dynamicClassName = "display-element";
  if (valueLength >= smallestSizeThreshold) dynamicClassName += " smallest";
  else if (valueLength >= smallerSizeThreshold) dynamicClassName += " smaller";

  return <span className={dynamicClassName}>{displayValue}</span>;
};

export default Display;
