import React from "react";

interface InputProps {
  name: string;
  title: string;
  placeholder: string;
  required?: boolean;
  labelWidth?: string;
  className?: string;
}

function Input({
  name,
  placeholder,
  labelWidth,
  title,
  required,
  className,
}: InputProps): JSX.Element {
  return (
    <label htmlFor={name} className={`${className ?? ""} flex items-center`}>
      <p className={`${labelWidth ?? ""} relative`}>
        {title}
        {required !== undefined && (
          <span className=" absolute -top-1 -left-3 text-lg text-[#ff4d4f]">
            *
          </span>
        )}
      </p>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className="border-2 outline-none"
      />
    </label>
  );
}

export default Input;
