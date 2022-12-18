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

function CustomerPet(): JSX.Element {
  const [isShow, setIsShow] = useState<"POST" | "PUT">();
  const { authToken } = useContext(UserAuth);
  const { data } = usePetList(authToken);
  const [pet, setPet] = useState<PetList[0]>();
  console.log(pet);

  useDisableScroll(isShow);

  return (
    <div className="flex w-full max-w-5xl flex-col items-end">
      <Button
        icon={PlusPath}
        type="Secondary"
        text="新增寵物名片"
        className="mb-4 w-max px-4 py-2"
        onClick={() => {
          setIsShow("POST");
        }}
      />

      <AnimatePresence>
        {data === undefined ? (
          <div key="Loading" className="relative w-full">
            <LoadingCustom className="absolute left-1/2" color="bg-second" />
          </div>
        ) : (
          <PetCard data={data} setIsShow={setIsShow} setPet={setPet} />
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
