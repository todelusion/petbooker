import React from "react";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import { PetCard, PetList } from "../../../types/schema";
import { putPet } from "../../../utils/api/petCard";

interface AskedModalProps {
  pet: PetCard;
  petList: PetList | undefined;
  token: string;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  setasked: React.Dispatch<React.SetStateAction<boolean>>;
}

const findOwnPet = (
  pet: PetCard,
  petList: PetList | undefined
): number | undefined => {
  if (petList === undefined) return;
  const ownPet = petList.filter((item) => item.IsOrders === "沒訂單");
  const samePet = ownPet.filter((item) => item.PetName === pet.PetName);
  console.log(samePet);
};

function AskedModal({
  pet,
  petList,
  token,
  setasked,
  setIsConfirmed,
}: AskedModalProps): JSX.Element {
  findOwnPet(pet, petList);

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
                // await putPet();
                setIsConfirmed(true);
                setasked(false);
              }}
            />
            <Button
              type="Transparent"
              text="否"
              className="ml-10 px-5 py-3"
              textSize="text-xl font-bold"
              onClick={() => {
                setIsConfirmed(false);
                setasked(false);
              }}
            />
          </div>
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default AskedModal;
