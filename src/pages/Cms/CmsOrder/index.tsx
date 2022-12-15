import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Order from "../../../components/Order";

import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";
import useOrderList from "../../../utils/api/orderList";

type Status = "待入住" | "已入住" | "完成訂單" | "取消訂單";

function CmsOrder(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  // const { data } = useOrderList(authToken);
  const [reserve, checkin, checkout, cancel] = useOrderList(authToken);

  const [dataStatus, setDataStatus] = useState(reserve.data);
  console.log(dataStatus);

  useEffect(() => {
    if (reserve.data !== undefined) {
      setDataStatus(reserve.data);
    }
  }, [reserve.data]);
  const handleClick = (status: Status): void => {
    switch (status) {
      case "待入住":
        setDataStatus(reserve.data);

        break;
      case "已入住":
        setDataStatus(checkin.data);

        break;
      case "完成訂單":
        setDataStatus(checkout.data);

        break;
      case "取消訂單":
        setDataStatus(cancel.data);

        break;
      default:
        if (reserve.data !== undefined) {
          setDataStatus(
            reserve.data.filter((order) => order.Status === "待入住")
          );
        }

        break;
    }

    if (reserve.isSuccess) return;
  };

  return (
    <div>
      {(reserve.isFetching ||
        checkin.isFetching ||
        checkout.isFetching ||
        cancel.isFetching) && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )}
      {reserve.data != null && (
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
          {dataStatus != null && <Order data={dataStatus} />}
        </>
      )}
    </div>
  );
}

export default CmsOrder;
