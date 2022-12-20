import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Order from "./order";

import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";

import { useCostomerOrder } from "../../../utils/api/customerOrder";

function CustomerOrder(): JSX.Element {
  const { authToken } = useContext(UserAuth);

  const [completeList, cancelList, reservedList] = useCostomerOrder(authToken);
  const [dataStatus, setDataStatus] = useState(reservedList.data);
  const [select, setSelect] = useState("完成預約");

  useEffect(() => {
    if (select !== "完成預約") return;
    if (reservedList.data !== undefined) {
      setDataStatus(reservedList.data);
    }
  }, [reservedList.data, select]);

  useEffect(() => {
    if (select !== "歷史預約") return;
    if (completeList.data !== undefined) {
      setDataStatus(completeList.data);
    }
  }, [completeList.data, select]);

  useEffect(() => {
    console.log(dataStatus);

    setDataStatus(dataStatus);
  }, []);

  const handleClick = (status: string): void => {
    switch (status) {
      case "完成預約":
        setSelect("完成預約");
        setDataStatus(reservedList.data);

        break;

      case "取消預約":
        console.log(dataStatus);

        setSelect("取消預約");
        setDataStatus(cancelList.data);

        break;
      case "歷史預約":
        setSelect("歷史預約");
        setDataStatus(completeList.data);
        break;

      default:
        if (reservedList.data !== undefined) {
          setDataStatus(
            reservedList.data.filter((order) => order.Status === "reserved")
          );
        }

        break;
    }
  };

  return (
    <div className="px-10 ">
      {(reservedList.isFetching ||
        completeList.isFetching ||
        cancelList.isFetching) && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )}
      <nav className="mb-4 flex">
        <Button
          onClick={() => handleClick("完成預約")}
          type="Transparent"
          text="完成預約"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("取消預約")}
          type="Transparent"
          text="取消預約"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("歷史預約")}
          type="Transparent"
          text="歷史預約"
          className="ml-4 py-3 px-6"
        />
      </nav>
      {dataStatus !== undefined && <Order data={dataStatus} />}
    </div>
  );
}

export default CustomerOrder;
