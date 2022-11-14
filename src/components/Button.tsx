import React from "react";
import { useNavigate } from "react-router-dom";

type ButtonPropsType = "Primary" | "Secondary";

interface ButtonProps {
  type: ButtonPropsType;
  text: string;
  className?: string;
  navigatePath?: string;
}
function Button({
  type,
  text,
  className,
  navigatePath,
}: ButtonProps): JSX.Element {
  const navigate = useNavigate();
  const renderButtonPropsType = (): string => {
    switch (type) {
      case "Primary":
        return "border-2 border-primary text-black";
      case "Secondary":
        return "bg-second text-white";
      default:
        return "border-2 border-primary text-black";
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (navigatePath === undefined) return;
        navigate(navigatePath);
      }}
      className={`${renderButtonPropsType()} ${
        className as string
      } rounded-full px-5 py-2`}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  navigatePath: undefined,
};

export default Button;
