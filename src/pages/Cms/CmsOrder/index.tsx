import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { LoadingScreen } from "../../../components/LoadingModal";
import Order from "../../../components/Order";

import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";
import useOrderList from "../../../utils/api/orderList";

function CmsOrder(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const [reserve, checkin, checkout, cancel] = useOrderList(authToken);

  const [dataStatus, setDataStatus] = useState(reserve.data);
  const [select, setSelect] = useState("待入住");

  console.log(dataStatus);

  useEffect(() => {
    if (select !== "已入住") return;
    if (checkin.data !== undefined) {
      setDataStatus(checkin.data);
    }
  }, [checkin.data, select]);

  useEffect(() => {
    if (select !== "待入住") return;
    if (reserve.data !== undefined) {
      setDataStatus(reserve.data);
    }
  }, [reserve.data, select]);
  // useEffect(() => {
  //   if (checkin.data !== undefined) {
  //     setDataStatus(checkin.data);
  //   }
  // }, [checkin.data]);

  const handleClick = (status: string): void => {
    console.log(status);

    switch (status) {
      case "待入住":
        setSelect("待入住");
        setDataStatus(reserve.data);

        break;
      case "已入住":
        setSelect("已入住");
        setDataStatus(checkin.data);

        break;
      case "完成訂單":
        setSelect("完成訂單");
        setDataStatus(checkout.data);

        break;
      case "取消訂單":
        setSelect("取消訂單");
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
  };

  return (
    <div>
      {reserve.isFetching ||
      checkin.isFetching ||
      checkout.isFetching ||
      cancel.isFetching ? (
        <LoadingScreen />
      ) : (
        (reserve.isSuccess ||
          checkin.isSuccess ||
          checkout.isSuccess ||
          cancel.isSuccess) && (
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
        )
      )}
    </div>
  );
}

export default CmsOrder;
