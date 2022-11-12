import React from "react";

type ButtonPropsType = "Primary" | "Secondary";

interface ButtonProps {
  type: ButtonPropsType;
  text: string;
  className?: string;
}
function Button({ type, text, className }: ButtonProps): JSX.Element {
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
    <div
      className={`${renderButtonPropsType()} ${
        className as string
      } rounded-full px-5 py-2`}
    >
      {text}
    </div>
  );
}

Button.defaultProps = {
  className: "",
};

export default Button;
