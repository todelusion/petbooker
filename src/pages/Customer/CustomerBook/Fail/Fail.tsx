import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import failbook from "../../../../img/failbook.svg";
// import Divider1 from "../img/Divider1.svg";

function Fail(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className=" mt-[240px] flex flex-col items-center   ">
      <div className=" flex max-w-[1216px] justify-center  ">
        <div className=" flex flex-col items-center justify-center ">
          <h2 className=" text-[40px] font-bold   ">抱歉，您預約失敗!</h2>
          <p className=" mt-6 text-sm ">該房型已被預約，再煩請您重新預約。</p>
          <Button
            onClick={() => {
              navigate("/home");
            }}
            type="Secondary"
            text="返回至首頁"
            className="my-12 py-3 px-6 "
          />

          <img src={failbook} alt="Success.png" />
          {/* <img src={Divider1} alt="Success.png" className="mt-8 " /> */}
        </div>
      </div>
    </div>
  );
}

export default Fail;
