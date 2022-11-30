import React, { useContext, useState } from "react";
// import { string } from "zod"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserAuth, { UserAuthContetxt } from "../../context/UserAuthContext";
import UserInput from "../../components/Input";
import InputRegex from "../../components/Input/data";

interface value {
  [key: string]: any;
}

export default function UserLogin(): JSX.Element {
  const { authToken, setAuthToken } = useContext(UserAuth);
  const [inputValue, setInputValue] = useState<value>({});
  const [identity, setIdentity] = useState<string>("");
  const navigate = useNavigate();
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;

    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
  };
  const Login = (): void => {
    if (Object.keys(inputValue).length < 2) {
      alert("請填寫帳號密碼");
      return;
    }
    const { email, password } = inputValue;
    if (email === "" || password === "") {
      alert("帳號密碼不能為空");
      return;
    }
    if (!InputRegex.email.regex.test(email)) {
      alert("帳號格式錯誤");
      return;
    }
    if (!InputRegex.password.regex.test(password)) {
      alert("密碼格式錯誤");
      return;
    }
    if (identity === "") {
      alert("請填寫會員身分");
      return;
    }
    console.log("showmodal");
    axios
      .post(
        `https://petcity.rocket-coding.com/${
          identity === "customer" ? "user" : "hotel"
        }/login`,
        {
          UserAccount: "qqq123@gmail.com",
          UserPassWord: "Wang1234",
          Identity: "customer",
        }
      )
      .then((res) => {
        console.log(res);
        setAuthToken(res.data.JwtToken);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  const setidentity = (event: React.FormEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setIdentity(value);
  };
  return (
    <div className=" flex flex-col items-center  py-60">
      <form action="#" className="flex w-1/3 max-w-md flex-col pt-4">
        <h1 className="text-center  text-4xl">登入</h1>
        <UserInput
          title="帳號"
          inputType="email"
          name="email"
          id="email"
          inputPlaceHolder="請輸入正確的信箱格式"
          inputValueHandler={inputValueHandler}
          inputValue={inputValue}
        />
        <UserInput
          title="密碼"
          inputType="password"
          name="password"
          id="password"
          inputPlaceHolder="請輸入密碼"
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
          onClick={Login}
        >
          登入
        </button>
        <span className="mt-3 flex justify-between">
          <span>
            還沒有帳號？{" "}
            <Link to="/regist" className="underline">
              註冊
            </Link>
          </span>
          <span>
            <Link to="/forgetPassword" className="underline">
              忘記密碼/修改密碼
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
