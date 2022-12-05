import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSearchBar from "../../hooks/useSearchBar";
import buttonStyle from "./style";

type ButtonPropsType = "Primary" | "Secondary" | "Transparent";

interface ButtonProps {
  type: ButtonPropsType;
  text: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
  const { selection } = useSearchBar();
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
      onClick={(e) => {
        if (onClick === undefined) return;
        onClick(e);
        if (selection.startDate.getTime() === selection.endDate.getTime())
          return;

        onNavigate();

        console.log("test");
      }}
      className={`${renderButtonPropsType()} ${className} flex-center h-max rounded-full`}
    >
      {icon !== undefined && <img src={icon} alt="icon" className="mr-2" />}
      <span className={textSize}>{text}</span>
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
