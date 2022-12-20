import { title } from "process";
import React, { useContext, useEffect, useRef, useState } from "react";
import { number } from "zod";

import { QueryCache, QueryClient, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../../components/Button";
import Filter from "../../../containers/Filter";
import { commentRadio } from "../../../containers/Filter/data";
import FilterInput from "../../../containers/Filter/FilterInput";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom } from "../../../img/icons";
import { useComment } from "../../../utils/api/comment";
import Header from "../../../utils/api/Header";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  id?: number;
  Status?: string;
}

function CommentPopup({ open, onClose, id, Status }: ModalProps): JSX.Element {
  console.log(Status, id);
  const { authToken } = useContext(UserAuth);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const header = new Header(authToken);
  const { data, isFetching, isSuccess } = useComment(id, authToken, Status);
  const [comment, setComment] = useState<string>();
  const [check, setCheck] = useState<number>();
  const queryClient = useQueryClient();
  const handelCheckout = async (): Promise<void> => {
    try {
      const res = await axios.put(
        `https://petcity.rocket-coding.com/user/comment?orderId=${id}`,
        {
          Score: check,
          Comment: textareaRef.current?.value,
          Status: "checkOutComment",
        },
        header
      );
      console.log(res);

      if (res.data.message === "送出評價成功") {
        onClose?.();
      }
      await queryClient.invalidateQueries(["completeList"]);
      queryClient.removeQueries(["completeList"]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    if (Status === "checkOutComment") {
      setComment(data?.Comment);
      setCheck(data?.Score);
    }
  }, [Status, data?.Comment, data?.Score, setCheck]);

  return (
    <>
      {isFetching && (
        <LoadingCustom className="absolute left-1/2" color="bg-second" />
      )}
      <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
        <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(60%-24px)] w-[90%] max-w-[90%] overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
          <div className="  h-full   w-full ">
            {open && (isSuccess || Status === "checkOut") && (
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
                <div className="w-[90%]">
                  <FilterInput
                    checked={String(check)}
                    horizontal
                    filterList={commentRadio}
                    className="my-5 flex w-full justify-between"
                    onChange={(event) => {
                      const element = event.target as HTMLInputElement;
                      const { value } = element;
                      setCheck(Number(value));
                    }}
                    noContext
                    classNames={{ commentRadio: "font-normal text-sm" }}
                  />
                  <span className="flex w-full justify-between">
                    <label className="font-bold " htmlFor="comment">
                      評論內容
                    </label>
                    <textarea
                      placeholder="請填寫您的對於旅館的安心度評價"
                      className=" border-black/500 w-[90%] border-2 border-solid"
                      name="comment"
                      id="comments"
                      cols={30}
                      rows={10}
                      ref={textareaRef}
                      defaultValue={data?.Comment !== undefined ? comment : ""}
                    />
                  </span>

                  <Button
                    text={Status === "checkOut" ? "儲存" : "關閉"}
                    type="Secondary"
                    className=" mt-12 w-full  "
                    onClick={Status === "checkOut" ? handelCheckout : onClose}
                  />
                </div>
              </div>
            )}
          </div>
        </MotionPopup>
      </MotionFade>
    </>
  );
}

export default CommentPopup;
