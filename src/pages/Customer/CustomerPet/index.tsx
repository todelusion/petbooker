import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Button from "../../../components/Button";
import { PlusPath } from "../../../img/icons";
import Edit from "./Edit";

interface CustomerPetProps {}

function CustomerPet(): JSX.Element {
  const [isShow, setIsShow] = useState<"POST" | "PUT">();
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
        {isShow === "POST" && (
          <Edit
            type={isShow}
            title="新增寵物名片"
            key="EDIT"
            onClick={() => setIsShow(undefined)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomerPet;
