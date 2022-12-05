import React, { useState } from "react";
import Button from "../../../components/Button";
import Order from "../../../components/Order";
import { cmsOrder, CMSOrder } from "../../../components/Order/data";

type Status = "全部" | "待入住" | "已入住" | "完成訂單" | "取消訂單";

function CmsOrder(): JSX.Element {
  const [data, setData] = useState(cmsOrder);

  const handleClick = (status: Status): void => {
    switch (status) {
      case "全部":
        setData(cmsOrder);
        break;
      case "待入住":
        setData(cmsOrder.filter((order) => order.Status === "待入住"));
        break;
      case "已入住":
        setData(cmsOrder.filter((order) => order.Status === "已入住"));
        break;
      case "完成訂單":
        setData(cmsOrder.filter((order) => order.Status === "完成訂單"));
        break;
      case "取消訂單":
        setData(cmsOrder.filter((order) => order.Status === "取消訂單"));
        break;
      default:
        setData(cmsOrder.filter((order) => order.Status === "待入住"));
        break;
    }
  };

  return (
    <div>
      <nav className="mb-4 flex">
        <Button
          onClick={() => handleClick("全部")}
          type="Transparent"
          text="全部"
          className="py-3 px-6"
        />
        <Button
          onClick={() => handleClick("待入住")}
          type="Transparent"
          text="待入住"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("已入住")}
          type="Transparent"
          text="已入住"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("完成訂單")}
          type="Transparent"
          text="完成訂單"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("取消訂單")}
          type="Transparent"
          text="取消訂單"
          className="ml-4 py-3 px-6"
        />
      </nav>
      <Order data={data} />
    </div>
  );
}

export default CmsOrder;
