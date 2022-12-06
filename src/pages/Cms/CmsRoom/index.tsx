import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import useModal from "../../../hooks/useModal";
import { PlusPath } from "../../../img/icons";
import Edit from "./Edit";

const useDisableScroll = (isEdit: boolean): void => {
  const body = document.querySelector("body");
  useEffect(() => {
    if (body === null) return;

    if (isEdit) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [body, isEdit]);
};

function CmsRoom(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  useDisableScroll(isEdit);

  return (
    <div>
      <Button
        icon={PlusPath}
        type="Secondary"
        text="新增寵物房型"
        className="px-4 py-2"
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      />
      <AnimatePresence>
        {isEdit && <Edit onClick={() => setIsEdit(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default CmsRoom;
