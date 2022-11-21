import React, { useState } from "react";
import { string } from "zod";
import LoginInput from "../components/LoginInput";

export default function UserLogin(): JSX.Element {
  const [inputValue, setInputValue] = useState({});
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;
    console.log(name, value);
    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
    // if (name === "email") {
    //   setInputValue({ email: value });
    // }
  };
  console.log(inputValue);

  return (
    <div className=" flex flex-col items-center  py-60">
      <form action="#" className="flex w-1/3 flex-col pt-4">
        <h1 className="text-center  text-4xl">登入</h1>
        <LoginInput
          title="帳號"
          inputType="email"
          name="email"
          id="email"
          inputPlaceHolder="請輸入正確的信箱格式"
          setInputValue={setInputValue}
        />
        <LoginInput
          title="密碼"
          inputType="password"
          name="password"
          id="password"
          inputPlaceHolder="請輸入密碼"
          setInputValue={setInputValue}
        />
        <input
          type="eamil"
          name="email"
          id="email"
          autoComplete="on"
          placeholder=""
          className="mt-2 h-10  rounded  border border-solid border-black p-2"
          onChange={inputValueHandler}
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          placeholder=""
          className="mt-2 h-10  rounded  border border-solid border-black p-2"
          onChange={inputValueHandler}
        />
        ;
        <button
          type="button"
          className="mt-8 rounded-full bg-second py-2 text-white"
        >
          登入
        </button>
        <span className="mt-3 flex justify-between">
          <span>
            還沒有帳號？{" "}
            <a href="#1234" className="underline">
              註冊
            </a>
          </span>
          <span>忘記密碼？</span>
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
