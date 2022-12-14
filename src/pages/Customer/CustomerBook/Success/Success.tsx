import React from "react";
import orderSuccess from "../../../../img/OrderSuccess.svg";
// import Divider1 from "../img/Divider1.svg";

function Success(): JSX.Element {
  return (
    <div className="flex flex-col items-center   ">
      <div className=" max-w-[1216px]   ">
        <div>
          <h2 className=" text-[40px] ">恭喜您，已成功預約！</h2>
          <p className=" text-sm ">
            系統會自動發送一封預約成功信至您的信箱中，再煩請您確認信箱。
          </p>
          <button
            className="border-2 border-second bg-second text-white"
            type="button"
          >
            查看我的訂單
          </button>
          <img src={orderSuccess} alt="Success.png" />
          <img src={Divider1} alt="Success.png" className="mt-8 " />
        </div>
      </div>
    </div>
  );
}

export default Success;
