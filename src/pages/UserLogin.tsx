import React from "react";

export default function UserLogin(): JSX.Element {
  return (
    <div className=" flex flex-col items-center  py-60">
      <form
        action="#"
        className="flex w-1/3 flex-col pt-4
"
      >
        <h1 className="text-center  text-4xl">登入</h1>
        <h3 className="mt-4 mb-2  text-base">電子信箱</h3>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="on"
          placeholder="請輸入正確的信箱格式"
          className="h-10 rounded  border border-solid border-black p-2"
        />
        <h3 className="mb-2 mt-4 text-base">密碼</h3>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          placeholder="請輸入密碼"
          className="h-10 rounded  border border-solid border-black p-2"
        />
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
