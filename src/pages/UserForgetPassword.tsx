import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { string } from "zod"
import UserInput from "../components/UserInput";

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
        <span className="mt-3 flex justify-center">
          <span>
            已有帳號？{" "}
            <Link to="/login" className="underline">
              登入
            </Link>
          </span>
        </span>
        <div className=" relative text-center">
          <div
            className="after:1/2 my-4 before:absolute before:top-1/2 before:left-4 
          before:h-0.5 before:w-5/12 before:bg-gray-300 before:content-[''] after:absolute after:right-4 
          after:top-1/2 after:h-0.5 after:w-5/12 after:bg-gray-300 after:content-['']"
          >
            或
          </div>
        </div>
      </form>
    </div>
  );
}
