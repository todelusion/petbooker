import React from "react";
import { useNavigate } from "react-router-dom";
import buttonStyle from "./style";

type ButtonPropsType = "Primary" | "Secondary" | "Transparent";

interface ButtonProps {
  type: ButtonPropsType;
  text: string;
  className: string;
  onClick?: () => void;
  icon?: string;
  textSize?: string;
  navigatePath?: string;
}
function Button({
  type,
  text,
  icon,
  onClick,
  className,
  textSize,
  navigatePath,
}: ButtonProps): JSX.Element {
  const navigate = useNavigate();
  const renderButtonPropsType = (): string => {
    switch (type) {
      case "Primary":
        return buttonStyle.Primary;
      case "Secondary":
        return buttonStyle.Secondary;
      case "Transparent":
        return buttonStyle.Transparent;
      default:
        return buttonStyle.Primary;
    }
  };

  const onNavigate = (): void => {
    if (navigatePath === undefined) return;
    navigate(navigatePath);
  };

  return (
    <button
      type="button"
      onClick={() => {
        onNavigate();
        if (onClick === undefined) return;
        onClick();
      }}
      className={`${renderButtonPropsType()} ${className} flex-center h-max rounded-full`}
    >
      {icon !== undefined && <img src={icon} alt="icon" className="mr-2" />}
      <span className={`${textSize} whitespace-nowrap`}>{text}</span>
    </button>
  );
}

Button.defaultProps = {
  navigatePath: undefined,
  onClick: () => {},
  icon: undefined,
  textSize: "text-base",
};

export default Button;
