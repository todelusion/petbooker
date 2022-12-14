import React, { useContext, useLayoutEffect, useState } from "react";
// import { string } from "zod"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserAuth from "../../context/UserAuthContext";
import UserInput from "../../components/Input";
import InputRegex from "../../components/Input/data";
import useModal from "../../hooks/useModal";

interface ITyppingValue {
  [key: string]: any;
}

export default function UserLogin(): JSX.Element {
  const { dispatchPending } = useModal();
  const {
    authToken,
    setAuthToken,
    setIdentity: setIdentityContext,
  } = useContext(UserAuth);
  const [inputValue, setInputValue] = useState<ITyppingValue>({});
  const [identity, setIdentity] = useState<string>("");

  const navigate = useNavigate();
  const inputValueHandler = (event: React.FormEvent): void => {
    const { name, value } = event.target as HTMLInputElement;

    setInputValue((prventValue) => ({ ...prventValue, [name]: value }));
  };
  useLayoutEffect(() => {
    if (authToken !== "") {
      navigate("/home");
    }
  });
  const Login = (): void => {
    if (Object.keys(inputValue).length < 2) {
      dispatchPending({ type: "IS_ERROR", payload: "請填寫帳號密碼" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    const { email, password } = inputValue;
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
      dispatchPending({ type: "IS_ERROR", payload: "請填寫會員身份" });
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      return;
    }
    dispatchPending({ type: "IS_LOADING" });
    axios
      .post(
        `https://petcity.rocket-coding.com/${
          identity === "customer" ? "user" : "hotel"
        }/login`,
        identity === "customer"
          ? {
              UserAccount: email,
              UserPassWord: password,
              Identity: identity,
            }
          : {
              HotelAccount: email,
              HotelPassWord: password,
              Identity: identity,
            }
      )
      .then((res) => {
        setAuthToken(res.data.JwtToken);
        setIdentityContext(identity);

        dispatchPending({ type: "DONE" });
        navigate("/home");
      })
      .catch((err) => {
        dispatchPending({
          type: "IS_ERROR",
          payload: err.response.data.Message,
        });
        setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
      });
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
        <span className="mt-5 flex flex-col items-center">
          <span>
            還沒有帳號？{" "}
            <Link
              to="/regist"
              className="mr-2 text-second underline decoration-second"
            >
              註冊
            </Link>
            <span className="text-second">/</span>
            <Link
              to="/forgetPassword"
              className=" ml-2 text-second underline decoration-second"
            >
              忘記密碼
            </Link>
          </span>
          <span className="mt-3 " />
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
