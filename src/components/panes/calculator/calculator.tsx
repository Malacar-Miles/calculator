import "./calculator.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectMainPaneContent } from "../../../utils/redux/content-slice";
import { remove } from "../../../utils/redux/content-slice";
import ModuleConstructor from "../../module-constructor/module-constructor";

const Calculator = () => {
  const dispatch = useDispatch();
  const mainPaneContent = useSelector(selectMainPaneContent);

  return (
    <main className="calculator-pane">
      {mainPaneContent.map((module, index) => (
        <ModuleConstructor
          key={index}
          moduleType={module}
          moduleState={"deployed"}
          clickHandler={() => dispatch(remove(module))}
        />
      ))}
    </main>
  );
};

export default Calculator;
