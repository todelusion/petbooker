import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Order from "./order";

import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";
import useOrderList from "../../../utils/api/orderList";

type Status = "完成預約" | "取消預約" | "歷史清單";
type Props = {};

const data = {
  photo: "",
  Petname: "小王",
  RoomType: "高級",
  StartDayOnly: "123456",
  EndDayOnly: "123456",
  RoomPrice: "1200",
  PetCardId: "1",
  Status: "reverved",
};

const CustomerOrder = (props: Props) => {
  const { authToken } = useContext(UserAuth);
  // const { data } = useOrderList(authToken);
  // const [reserve, checkin, checkout, cancel] = useOrderList(authToken);

  const [dataStatus, setDataStatus] = useState([data]);
  // console.log(dataStatus);

  const handleClick = (status: Status): void => {
    switch (status) {
      case "完成預約":
        setDataStatus(reserve.data);

        break;
      case "取消預約":
        setDataStatus(checkin.data);

        break;
      case "歷史清單":
        setDataStatus(checkout.data);
        break;

      default:
        // if (reserve.data !== undefined) {
        //   setDataStatus(
        //     reserve.data.filter((order) => order.Status === "待入住")
        //   );
        // }

        break;
    }

    // if (reserve.isSuccess) return;
  };

  return (
    <div className="px-10 ">
      {/* {(reserve.isFetching ||
        checkin.isFetching ||
        checkout.isFetching ||
        cancel.isFetching) && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )} */}
      {
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
      }
    </div>
  );
};

export default CustomerOrder;
