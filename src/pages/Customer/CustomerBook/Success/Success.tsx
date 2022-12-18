import React, { useEffect } from "react";
import orderSuccess from "../../../../img/OrderSuccess.svg";
import Divider1 from "../../../../img/Divider1.svg";
import Button from "../../../../components/Button";
import {
  List1Path,
  List2Path,
  List3Path,
  List4Path,
} from "../../../../img/OrderConfirmation";

function Success(): JSX.Element {
  return (
    <div className="flex-col-center pt-44 pb-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h2 className="mb-6 text-center text-[40px] font-bold text-primary_A11y">
          恭喜您，已成功預約！
        </h2>
        <p className=" text-md mb-12 text-center">
          系統會自動發送一封預約成功信至您的信箱中，再煩請您確認信箱。
        </p>
        <Button
          text="查看我的訂單"
          className="mb-12 py-2 px-5"
          type="Secondary"
        />
        <img src={orderSuccess} alt="Success.png" className="-ml-1 mb-12" />
        <img src={Divider1} alt="Success.png" />
        <p className="my-12 text-[40px] font-bold">預約注意事項</p>
        <ul className="grid grid-cols-2 gap-x-20 gap-y-12">
          <li>
            <img src={List1Path} alt="step1" />
          </li>
          <li>
            <img src={List2Path} alt="step2" />
          </li>
          <li>
            <img src={List3Path} alt="step3" />
          </li>
          <li>
            <img src={List4Path} alt="step4" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Success;
