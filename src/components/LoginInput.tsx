import React from "react";

interface Props {
  title: string;
  inputType: string;
  name: string;
  id: string;
  inputPlaceHolder: string | undefined;
  inputValueHandler: (e: React.FormEvent) => void;
}

function Input(props: Props): JSX.Element {
  const { inputType, name, id, inputPlaceHolder, title, inputValueHandler } =
    props;
  return (
    <label className="mb-2 mt-4 flex flex-col text-base " htmlFor={id}>
      {title}
      <input
        onChange={inputValueHandler}
        type={inputType}
        name={name}
        id={id}
        autoComplete="on"
        placeholder={inputPlaceHolder}
        className="mt-2 h-10  rounded  border border-solid border-black p-2"
      />
    </label>
  );
}

export default Input;
