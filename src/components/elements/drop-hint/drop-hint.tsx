import "./drop-hint.scss";
import { ReactComponent as AddIcon } from "../../../assets/add-icon.svg";

const DropHint = () => {
  return (
    <div className="drop-hint-element">
      <AddIcon className="icon" />
      <span className="blue-text">Drag and drop here</span>
      <span className="grey-text">any element from<br />the left pane</span>
    </div>
  );
};

export default DropHint;
