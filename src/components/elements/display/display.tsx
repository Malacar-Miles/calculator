import "./display.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { selectCalculatorDisplay } from "../../../utils/redux/calculator-slice";

const Display = () => {
  const displayValue = useSelector(selectCalculatorDisplay);
  const valueLength = displayValue.length;
  const smallerSizeThreshold = 10;
  const smallestSizeThreshold = 13;

  const dynamicClassName = classNames("display-element", {
    smallest: valueLength >= smallestSizeThreshold,
    smaller:
      valueLength >= smallerSizeThreshold &&
      valueLength < smallestSizeThreshold,
  });

  return <span className={dynamicClassName}>{displayValue}</span>;
};

export default Display;
