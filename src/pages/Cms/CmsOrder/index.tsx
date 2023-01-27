import { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import LoadingScreen from "../../../components/LoadingModal";
import Order from "../../../components/Order";

import UserAuth from "../../../context/UserAuthContext";

import useOrderList from "../../../utils/api/orderList";

function CmsOrder(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const [reserve, checkin, checkout, cancel] = useOrderList(authToken);

  const [dataStatus, setDataStatus] = useState(reserve.data);
  const [select, setSelect] = useState("待入住");

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-shadow
  const setApiData = (select: string): void => {
    switch (select) {
      case "已入住":
        if (checkin.data !== undefined) {
          setDataStatus(checkin.data);
        }
        break;
      case "待入住":
        if (reserve.data !== undefined) {
          setDataStatus(reserve.data);
        }
        break;
      case "完成訂單":
        if (checkout.data !== undefined) {
          setDataStatus(checkout.data);
        }
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (select !== "已入住") return;
  //   if (checkin.data !== undefined) {
  //     setDataStatus(checkin.data);
  //   }
  // }, [checkin.data, select]);

  // useEffect(() => {
  //   if (select !== "待入住") return;
  //   if (reserve.data !== undefined) {
  //     setDataStatus(reserve.data);
  //   }
  // }, [reserve.data, select]);

  // useEffect(() => {
  //   if (select !== "完成訂單") return;
  //   if (checkout.data !== undefined) {
  //     setDataStatus(checkout.data);
  //   }
  // }, [checkout.data, select]);

  useEffect(() => {
    setApiData(select);
  }, [checkin.data, reserve.data, checkout.data, select, setApiData]);

  const handleClick = (status: string): void => {
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
