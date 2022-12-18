import { title } from "process";
import React from "react";

import Button from "../../../components/Button";
import Filter from "../../../containers/Filter";
import { commentRadio } from "../../../containers/Filter/data";
import FilterInput from "../../../containers/Filter/FilterInput";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import { LoadingCustom } from "../../../img/icons";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  id?: number;
  Status?: string;
}

function CommentPopup({ open, onClose, id, Status }: ModalProps): JSX.Element {
  console.log(Status, id);

  return (
    <>
      {/* {isFetching && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )} */}
      {
        <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
          <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(80%-24px)] w-[90%] max-w-[90%] overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
            <div className="  h-full   w-full ">
              {open && (
                <div className="flex flex-col items-center">
                  <button
                    className=" absolute top-6 right-6  "
                    type="button"
                    onClick={onClose}
                  >
                    X
                  </button>
                  <h1 className=" text-[40px] ">
                    {Status === "checkOut" ? "撰寫安心評價" : "查看安心評價"}
                  </h1>
                  <FilterInput
                    horizontal={true}
                    filterList={commentRadio}
                    className={"my-4"}
                    onChange={(event) => {
                      const element = event.target as HTMLInputElement;
                      const { value } = element;
                      console.log(value);
                    }}
                    noContext={true}
                  />
                  <Button
                    text={Status === "checkOut" ? "儲存" : "關閉"}
                    type="Secondary"
                    className=" w-full  "
                  />
                </div>
              )}
            </div>
          </MotionPopup>
        </MotionFade>
      }
    </>
  );
}

export default CommentPopup;
