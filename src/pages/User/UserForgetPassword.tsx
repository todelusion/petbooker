import React, { useState } from "react";
// import { string } from "zod"
import UserInput from "../../components/Input";

export default function UserForgetPassword(): JSX.Element {
  const [inputValue, setInputValue] = useState({});
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;

    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
  };
  return (
    <div className=" flex flex-col items-center  py-40">
      <form action="#" className="flex w-1/3 max-w-md flex-col pt-4">
        <h1 className="text-center  text-4xl">忘記密碼</h1>
        <UserInput
          title="電子信箱"
          inputType="email"
          name="email"
          id="email"
          inputPlaceHolder="請輸入正確的信箱格式"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />

        <button
          type="button"
          className="mt-8 rounded-full bg-second py-2 text-white"
        >
          送出
        </button>
     
      
      </form>
    </div>
  );
}
