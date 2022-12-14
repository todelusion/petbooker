import React, { useContext, useState } from "react";
import Button from "../../../components/Button";
import Order from "../../../components/Order";
import { cmsOrder, CMSOrder } from "../../../components/Order/data";
import UserAuth from "../../../context/UserAuthContext";
import { useOrderList } from "../../../utils/api/orderList";

type Status = "待入住" | "已入住" | "完成訂單" | "取消訂單";

function CmsOrder(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const { data } = useOrderList(authToken);

  const [dataStatus, setDataStatus] = useState(data);

  const handleClick = (status: Status): void => {
    switch (status) {
      case "待入住":
        setDataStatus(data.filter((order) => order.Status === "待入住"));
        break;
      case "已入住":
        setDataStatus(data.filter((order) => order.Status === "已入住"));
        break;
      case "完成訂單":
        setDataStatus(data.filter((order) => order.Status === "完成訂單"));
        break;
      case "取消訂單":
        setDataStatus(data.filter((order) => order.Status === "取消訂單"));
        break;
      default:
        setDataStatus(data.filter((order) => order.Status === "待入住"));
        break;
    }
  };

  return (
    <div>
      {data && (
        <>
          <nav className="mb-4 flex">
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
        </>
      )}
    </div>
  );
}

export default CmsOrder;
