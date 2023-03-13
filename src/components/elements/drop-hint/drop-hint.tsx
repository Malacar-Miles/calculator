import "./drop-hint.scss";
import { ReactComponent as AddIcon } from "../../../assets/add-icon.svg";

const DropHint = () => {
  return (
    <div className="drop-hint-element">
      <AddIcon className="icon" />
      <span className="blue-text">Перетащите сюда</span>
      <span className="grey-text">любой элемент<br />из левой панели</span>
    </div>
  );
};

export default DropHint;
