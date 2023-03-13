import "./button.scss";

const Button = ({
  name,
  buttonType,
}: {
  name: string;
  buttonType?: string;
}) => {
  const dynamicClassName =
    buttonType === "equals-button"
      ? "button-element equals-button"
      : "button-element";

  return <button className={dynamicClassName}>{name}</button>;
};

export default Button;
