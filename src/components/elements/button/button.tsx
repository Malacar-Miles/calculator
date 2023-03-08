import "./button.scss";

const Button = ({ name, action }: { name: string; action: () => void }) => {
  return (
    <button className="button-element" onClick={action}>
      {name}
    </button>
  );
};

export default Button;