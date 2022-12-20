import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Button from "../../../components/Button";
import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom, PlusPath } from "../../../img/icons";
import { Pet, PetList } from "../../../types/schema";
import { usePetList } from "../../../utils/api/petCard";
import Edit from "./Edit";
import PetCard from "./PetCard";
import { initPet, petReducer } from "./petReducer";

export interface IShow {
  type: "POST" | "PUT";
  petid?: number;
}

const useDisableScroll = (isShow: string | undefined): void => {
  const body = document.querySelector("body");
  useEffect(() => {
    if (body === null) return;

    if (isShow !== undefined) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [body, isShow]);
};

const dataController = (
  selected: PetList[0]["IsOrders"] | undefined,
  data: PetList
): PetList => {
  switch (selected) {
    case "沒訂單":
      return data.filter((pet) => pet.IsOrders === "沒訂單");
    case "有訂單":
      return data.filter((pet) => pet.IsOrders === "有訂單");
    default:
      return data.filter((pet) => pet.IsOrders === "沒訂單");
  }
};

function CustomerPet(): JSX.Element {
  const [isShow, setIsShow] = useState<"POST" | "PUT">();
  const [selected, setSelected] = useState<PetList[0]["IsOrders"]>("沒訂單");
  const { authToken } = useContext(UserAuth);
  const { data } = usePetList(authToken);
  const [pet, setPet] = useState<PetList[0]>();

  console.log(data);

  useDisableScroll(isShow);

  return (
    <div className="flex w-full max-w-5xl flex-col items-end">
      <div className="mb-10 flex w-full items-center justify-between">
        <div className=" flex">
          <Button
            type="Transparent"
            text="你的寵物名片"
            className={`py-3 px-6 ${
              selected === "沒訂單" ? "border-black bg-stone-200" : ""
            }`}
            onClick={() => setSelected("沒訂單")}
          />
          <Button
            type="Transparent"
            text="已在旅館"
            className={`ml-4 py-3 px-6 ${
              selected === "有訂單" ? "border-black bg-stone-200" : ""
            }`}
            onClick={() => setSelected("有訂單")}
          />
        </div>

        <Button
          icon={PlusPath}
          type="Secondary"
          text="新增寵物名片"
          className="mb-4 w-max px-4 py-2"
          onClick={() => {
            setIsShow("POST");
          }}
        />
      </div>

      <AnimatePresence>
        {data === undefined ? (
          <div key="Loading" className="relative w-full">
            <LoadingCustom className="absolute left-1/2" color="bg-second" />
          </div>
        ) : (
          <PetCard
            data={dataController(selected, data)}
            setIsShow={setIsShow}
            setPet={setPet}
          />
        )}

        {isShow === "POST" && (
          <Edit
            onClick={() => setIsShow(undefined)}
            type={isShow}
            title="新增寵物名片"
            key="EDIT"
          />
        )}
        {isShow === "PUT" && (
          <Edit
            onClick={() => setIsShow(undefined)}
            type={isShow}
            data={pet}
            title="編輯寵物名片"
            key="EDIT"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomerPet;
