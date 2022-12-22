import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { string } from "zod"
import axios from "axios";
import UserInput from "../../components/Input";
import InputRegex from "../../components/Input/data";
import useModal from "../../hooks/useModal";

export default function UserRegist(): JSX.Element {
  const { dispatchPending } = useModal();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<{ [index: string]: string }>({});
  const [identity, setIdentity] = useState<string>("");
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;
    setInputValue((prventValue) => ({
      ...prventValue,
      [name]: value.replace(/\s*/g, ""),
    }));
  };

  function regist(event: React.FormEvent): void {
    event.preventDefault();

    if (Object.values(inputValue).length < 4) {
      dispatchPending({ type: "IS_ERROR", payload: "有欄位尚未填寫" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    const { email, password, userName, confirmPassword } = inputValue;
    if (email === "" || password === "") {
      dispatchPending({ type: "IS_ERROR", payload: "帳號密碼不能為空" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    if (!InputRegex.email.regex.test(email)) {
      dispatchPending({ type: "IS_ERROR", payload: "帳號格式錯誤" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    if (!InputRegex.password.regex.test(password)) {
      dispatchPending({ type: "IS_ERROR", payload: "密碼格式錯誤" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    if (identity === "") {
      dispatchPending({ type: "IS_ERROR", payload: "請填寫會員身分" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    if (password !== confirmPassword) {
      dispatchPending({ type: "IS_ERROR", payload: "確認密碼不相符" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    const Userdata = {
      UserAccount: email,
      UserName: userName,
      UserPassWord: password,
      ConfirmedPassword: confirmPassword,
      Identity: "customer",
    };
    const Hoteldata = {
      HotelAccount: email,
      HotelName: userName,
      HotelPassWord: password,
      ConfirmedPassword: confirmPassword,
      Identity: "hotel",
    };
    dispatchPending({ type: "IS_LOADING" });
    axios
      .post(
        `https://petcity.rocket-coding.com/${
          identity === "User" ? "user" : "Hotel"
        }/signup`,
        identity === "User" ? Userdata : Hoteldata
      )
      .then((res) => {
        dispatchPending({ type: "DONE" });
        navigate("/login");
      })
      .catch((err) => {
        dispatchPending({
          type: "IS_ERROR",
          payload: err.response.data.Message,
        });
        setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      });
  }

  const validpassword = (): boolean => {
    const { password, confirmPassword } = inputValue;
    let result;
    if (password === undefined || confirmPassword === undefined) {
      result = true;
    } else {
      result = password === confirmPassword;
    }
    return result;
  };
  const setgroup = (event: React.FormEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setIdentity(value);
  };
  return (
    <div className=" flex flex-col items-center  py-40">
      <form
        onSubmit={regist}
        action="onSubmit"
        className="flex w-1/3 max-w-md flex-col pt-4"
      >
        <h1 className="text-center  text-4xl">註冊</h1>
        <UserInput
          title="電子信箱"
          inputType="email"
          name="email"
          id="email"
          inputPlaceHolder="請輸入正確的信箱格式"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />
        <UserInput
          title="會員姓名"
          inputType="text"
          name="userName"
          id="userName"
          inputPlaceHolder="請輸入您的姓名"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />
        <UserInput
          title="密碼"
          inputType="password"
          name="password"
          id="password"
          inputPlaceHolder="請輸入 8 位以上英數字元，且包含各一個大小寫英文的密碼"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />
        <UserInput
          title="確認密碼"
          inputType="password"
          name="confirmPassword"
          id="confirmPassword"
          inputPlaceHolder="再次輸入密碼"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />
        <span className="text-red-500">
          {validpassword() ? null : "密碼不符合"}
        </span>
        <div>
          <h2 className="mb-2 mt-4">會員身份</h2>
          <span>
            <label htmlFor="petOwner">
              <input
                type="radio"
                name="identify"
                id="customer"
                value="User"
                onChange={setgroup}
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是飼主
            </label>
            <label htmlFor="Owner" className="ml-10">
              <input
                type="radio"
                name="identify"
                id="hotelier"
                value="hotel"
                onChange={setgroup}
                className="mr-2 h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
              />
              我是寵物旅館業者
            </label>
          </span>
        </div>
        <input
          type="submit"
          className="mt-8 rounded-full bg-second py-2 text-white"
          value="註冊"
        />
        <span className="mt-3 flex justify-center">
          <span>
            已有帳號？{" "}
            <Link
              to="/login"
              className="text-second underline decoration-second"
            >
              登入
            </Link>
          </span>
        </span>
        <div className=" relative text-center">
          {/* <div
            className="after:1/2 my-4 before:absolute before:top-1/2 before:left-4 
          before:h-0.5 before:w-5/12 before:bg-gray-300 before:content-[''] after:absolute after:right-4 
          after:top-1/2 after:h-0.5 after:w-5/12 after:bg-gray-300 after:content-['']"
          >
            或
          </div> */}
        </div>
      </form>
    </div>
  );
}
