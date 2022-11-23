import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { string } from "zod"
import LoginInput from "../components/UserInput";

export default function UserRegist(): JSX.Element {
  const [inputValue, setInputValue] = useState({});
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;

    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
  };
  console.log(inputValue);
  return (
    <div className=" flex flex-col items-center  py-40">
      <form action="#" className="flex w-1/3 max-w-md flex-col pt-4">
        <h1 className="text-center  text-4xl">註冊</h1>
        <LoginInput
          title="電子信箱"
          inputType="email"
          name="email"
          id="email"
          inputPlaceHolder="請輸入正確的信箱格式"
          inputValueHandler={inputValueHandler}
           inputValue={inputValue}
        />
        <LoginInput
          title="會員姓名"
          inputType="text"
          name="userName"
          id="userName"
          inputPlaceHolder="請輸入您的姓名"
          inputValueHandler={inputValueHandler}
           inputValue={inputValue}
        />
        <LoginInput
          title="密碼"
          inputType="password"
          name="password"
          id="password"
          inputPlaceHolder="請輸入 8 位以上英數字元，且包含各一個大小寫英文的密碼"
          inputValueHandler={inputValueHandler}
           inputValue={inputValue}
        />
        <LoginInput
          title="確認密碼"
          inputType="password"
          name="confirmPassword"
          id="confirmPassword"
          inputPlaceHolder="再次輸入密碼"
          inputValueHandler={inputValueHandler}
           inputValue={inputValue}
        />
        <div>
          <h2 className="mb-2 mt-4">會員身份</h2>
          <span>
            <label htmlFor="petOwner">
              <input
                type="radio"
                name="identify"
                id="petOwner"
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是飼主
            </label>
            <label htmlFor="Owner" className="ml-10">
              <input
                type="radio"
                name="identify"
                id="hotelier"
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是寵物旅館業者
            </label>
          </span>
        </div>
        <button
          type="button"
          className="mt-8 rounded-full bg-second py-2 text-white"
        >
          註冊
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
