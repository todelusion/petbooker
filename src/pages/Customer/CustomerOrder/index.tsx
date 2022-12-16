import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Order from "./order";

import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";

import { useCostomerOrder } from "../../../utils/api/customerOrder";

const CustomerOrder = () => {
  const { authToken } = useContext(UserAuth);

  const [completeList, reserved, cancel] = useCostomerOrder(authToken);
  const [dataStatus, setDataStatus] = useState(completeList.data);
  const [select, setSelect] = useState("待入住");

  useEffect(() => {
    if (select !== "完成預約") return;
    if (reserved.data !== undefined) {
      setDataStatus(reserved.data);
    }
  }, [reserved.data, select]);

  useEffect(() => {
    if (select !== "歷史預約") return;
    if (completeList.data !== undefined) {
      setDataStatus(completeList.data);
    }
  }, [completeList.data, select]);

  const handleClick = (status: string): void => {
    switch (status) {
      case "完成預約":
        setSelect("完成預約");
        setDataStatus(reserved.data);

        break;

      case "取消預約":
        setSelect("取消預約");
        setDataStatus(cancel.data);

        break;
      case "歷史預約":
        setSelect("歷史預約");
        setDataStatus(completeList.data);
        break;

      default:
        if (reserved.data !== undefined) {
          setDataStatus(
            reserved.data.filter((order) => order.Status === "待入住")
          );
        }

        break;
    }
  };

  return (
    <div className="px-10 ">
      {(reserved.isFetching ||
        completeList.isFetching ||
        cancel.isFetching) && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )}
      {
        <>
          <nav className="mb-4 flex">
            <Button
              onClick={() => handleClick("完成預約")}
              type="Transparent"
              text="待入住"
              className="ml-4 py-3 px-6"
            />
            <Button
              onClick={() => handleClick("取消預約")}
              type="Transparent"
              text="已入住"
              className="ml-4 py-3 px-6"
            />
            <Button
              onClick={() => handleClick("歷史預約")}
              type="Transparent"
              text="完成訂單"
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
