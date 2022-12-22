import React, { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import useModal from "../../../hooks/useModal";
import { PetCard, PetList } from "../../../types/schema";
import { postPetPhoto, putPet } from "../../../utils/api/petCard";

interface AskedModalProps {
  pet: PetCard;
  petList: PetList | undefined;
  token: string;
  formdata: FormData | undefined;
  navigate: NavigateFunction;
  handlePetCardRequest: () => Promise<number | undefined>;
  handleBookingRequest: (petid: number) => Promise<boolean>;
  setasked: React.Dispatch<React.SetStateAction<boolean>>;
}

const findExistedPet = (
  pet: PetCard,
  petList: PetList | undefined
): number | undefined => {
  if (petList === undefined) return undefined;
  const ownPet = petList.filter((item) => item.IsOrders === "沒訂單");
  const existedPet = ownPet.find((item) => item.PetName === pet.PetName);
  if (existedPet === undefined) return undefined;
  return existedPet.PetCardId;
};

function AskedModal({
  pet,
  petList,
  token,
  formdata,
  navigate,
  handleBookingRequest,
  handlePetCardRequest,
  setasked,
}: AskedModalProps): JSX.Element {
  const existedPetId = findExistedPet(pet, petList);
  const { dispatchPending, closeModal } = useModal();

  useEffect(() => clearInterval(closeModal(1000)));

  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
      <MotionPopup className="scrollbar-thumb-h-1/2 relative w-full max-w-xl overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
        <>
          <h3 className=" mb-10 text-center text-4xl font-bold">
            是否要儲存本次的寵物資訊卡
          </h3>
          <div className=" flex-center">
            <Button
              type="Primary"
              text="是"
              className="px-5 py-3 duration-100 hover:border-black hover:bg-primary"
              textSize="text-xl font-bold"
              onClick={async () => {
                setasked(false);
                dispatchPending({ type: "IS_LOADING" });
                await putPet(existedPetId as number, pet, token);
                if (formdata !== undefined) {
                  const photoResult = await postPetPhoto(
                    existedPetId as number,
                    formdata,
                    token
                  );
                  if (photoResult === undefined)
                    dispatchPending({
                      type: "IS_ERROR",
                      payload:
                        "上傳寵物照片錯誤，請至「我的寵物名片」補上寵物照片",
                    });
                  closeModal(1000);
                }

                const petid = await handlePetCardRequest();

                if (petid === undefined) {
                  dispatchPending({
                    type: "IS_ERROR",
                    payload: "系統錯誤，請稍後再試",
                  });
                  return;
                }

                if (await handleBookingRequest(petid)) {
                  navigate("/hotel/book/success");
                } else {
                  navigate("/hotel/book/fail");
                }
              }}
            />
            <Button
              type="Transparent"
              text="否"
              className="ml-10 px-5 py-3"
              textSize="text-xl font-bold"
              onClick={async () => {
                setasked(false);
                const petid = await handlePetCardRequest();

                if (petid === undefined) {
                  dispatchPending({
                    type: "IS_ERROR",
                    payload: "系統錯誤，請稍後再試",
                  });
                  return;
                }

                if (await handleBookingRequest(petid)) {
                  navigate("/hotel/book/success");
                } else {
                  navigate("/hotel/book/fail");
                }
              }}
            />
          </div>
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default AskedModal;
