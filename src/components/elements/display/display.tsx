import "./display.scss";
import classNames from "classnames";
import { useCalculatorSlice } from "../../../utils/redux/interface-hooks";

const Display = () => {
  const { calculatorDisplay } = useCalculatorSlice();
  const valueLength = calculatorDisplay.length;
  const smallerSizeThreshold = 10;
  const smallestSizeThreshold = 13;

  const dynamicClassName = classNames("display-element", {
    smallest: valueLength >= smallestSizeThreshold,
    smaller:
      valueLength >= smallerSizeThreshold &&
      valueLength < smallestSizeThreshold,
  });

  return <span className={dynamicClassName}>{calculatorDisplay}</span>;
};

export default Display;
