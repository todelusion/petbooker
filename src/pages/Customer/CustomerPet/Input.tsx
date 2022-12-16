import React from "react";

interface InputProps {
  name: string;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  labelWidth?: string;
  className?: string;
  classNames?: {
    p: string;
  };
}

function Input({
  onChange,
  defaultValue,
  name,
  placeholder,
  labelWidth,
  title,
  required,
  className,
  classNames,
}: InputProps): JSX.Element {
  return (
    <label htmlFor={name} className={`${className ?? ""} flex items-center`}>
      <p
        className={`${labelWidth ?? ""} ${
          classNames?.p ?? "font-normal"
        } relative`}
      >
        {title}
        {required !== undefined && (
          <span className=" absolute -top-1 -left-3 text-lg text-[#ff4d4f]">
            *
          </span>
        )}
      </p>
      <input
        onChange={(e) => {
          if (onChange === undefined) return;
          onChange(e);
        }}
        id={name}
        name={name}
        defaultValue={defaultValue}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border-[1px] border-black px-2 py-1 outline-none"
      />
    </label>
  );
}

export default Input;
