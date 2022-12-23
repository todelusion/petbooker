import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "../../../components/Button";
import Comment from "./Comment";

import UserAuth from "../../../context/UserAuthContext";

import { useCostomerOrder } from "../../../utils/api/customerOrder";
import LoadingScreen from "../../../components/LoadingModal";

function CustomerComment(): JSX.Element {
  const { authToken } = useContext(UserAuth);

  const [completeList] = useCostomerOrder(authToken);
  const [dataStatus, setDataStatus] = useState(completeList.data);
  const [select, setSelect] = useState("未完成評價");

  useEffect(() => {
    if (completeList.data !== undefined && select === "未完成評價") {
      setDataStatus(
        completeList.data?.filter((item) => item.Status === "checkOut")
      );
    } else {
      setDataStatus(
        completeList.data?.filter((item) => item.Status === "checkOutComment")
      );
    }
  }, [select, completeList.data]);

  const handleClick = (status: string): void => {
    switch (status) {
      case "未完成評價":
        setSelect("未完成評價");
        setDataStatus(
          completeList.data?.filter((item) => item.Status === "checkOut")
        );

        break;

      case "已完成評價":
        setSelect("已完成評價");
        setDataStatus(
          completeList.data?.filter((item) => item.Status === "checkOutComment")
        );

        break;

      default:
        if (completeList.data !== undefined) {
          setDataStatus(
            completeList.data.filter((order) => order.Status === "reserved")
          );
        }

        break;
    }
  };

  return (
    <div className="px-10 ">
      {completeList.isFetching && (
        <AnimatePresence>
          <LoadingScreen />
        </AnimatePresence>
      )}
      <nav className="mb-4 flex">
        <Button
          onClick={() => handleClick("未完成評價")}
          type="Transparent"
          text="未完成評價"
          className="ml-4 py-3 px-6"
        />
        <Button
          onClick={() => handleClick("已完成評價")}
          type="Transparent"
          text="已完成評價"
          className="ml-4 py-3 px-6"
        />
      </nav>
      {dataStatus !== undefined && <Comment data={dataStatus} />}
    </div>
  );
}

export default CustomerComment;
