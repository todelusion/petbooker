import React, { useState } from "react";
// import { string } from "zod"
import axios from "axios";
import UserInput from "../../components/Input";
import InputRegex from "../../components/Input/data";

interface typpingValue {
  [key: string]: any;
}
export default function UserForgetPassword(): JSX.Element {
  const [inputValue, setInputValue] = useState<typpingValue>({});
  const [identity, setIdentity] = useState<string>("");
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;

    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
  };
  console.log(identity, inputValue);
  const setidentity = (event: React.FormEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setIdentity(value);
  };
  const sendForget = (): void => {
    if (Object.keys(inputValue).length < 1) {
      alert("請填寫帳號密碼");
      return;
    }
    const { email } = inputValue;
    if (email === "") {
      alert("帳號密碼不能為空");
      return;
    }
    if (!InputRegex.email.regex.test(email)) {
      alert("帳號格式錯誤");
      return;
    }

    if (identity === "") {
      alert("請填寫會員身分");
      return;
    }
    axios
      .post(
        `https://petcity.rocket-coding.com/${
          identity === "customer" ? "user" : "hotel"
        }/forgetpassword`,
        {
          UserAccount: email,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
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
        <div>
          <h2 className="mb-2 mt-4">會員身份</h2>
          <span>
            <label htmlFor="petOwner">
              <input
                type="radio"
                name="identify"
                id="customer"
                value="customer"
                onChange={setidentity}
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是飼主
            </label>
            <label htmlFor="Owner" className="ml-10">
              <input
                type="radio"
                name="identify"
                id="hotel"
                value="hotel"
                onChange={setidentity}
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是寵物旅館業者
            </label>
          </span>
        </div>

        <button
          type="button"
          className="mt-8 rounded-full bg-second py-2 text-white"
          onClick={sendForget}
        >
          送出
        </button>
      </form>
    </div>
  );
}
