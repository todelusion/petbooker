import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
}
function Popup({ open, onClose }: ModalProps): JSX.Element {
  console.log(open);

  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
      <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(50%-24px)] w-[90%] max-w-[90%] overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
        <div className="  h-full   w-full ">
          {open && (
            <button
              className=" absolute top-6 right-6  "
              type="button"
              onClick={onClose}
            >
              X
            </button>
            //  <p className=" mb-4 text-2xl font-bold text-gray-500">寵物名片</p>
            // <section className="mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
            //   <ul className="mr-5 basis-2/12">
            //     <li className=" mb-6 h-40">
            //       {petCard.PetPhoto === null ? (
            //         <div className="h-full w-full bg-gray-200" />
            //       ) : (
            //         <img
            //           src={petCard.PetPhoto}
            //           alt=""
            //           className="h-full w-full object-cover"
            //         />
            //       )}
            //     </li>
            //     <li className="text-xl font-bold">{petCard.PetName}</li>
            //   </ul>

            //   <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-1 border-r-2">
            //     <li className="mb-2 font-bold">寵物資訊</li>
            //     <li>
            //       <span>寵物類型：</span>
            //       <span>{PetType}</span>
            //     </li>
            //     <li>
            //       <span>年齡：</span>
            //       <span>{petCard.PetAge}</span>
            //     </li>
            //     <li>
            //       <span>性別：</span>
            //       <span>{petCard.PetSex}</span>
            //     </li>
            //     <li>
            //       <span>飲食偏好：</span>
            //       {FoodTypes.map((food, index, arr) => (
            //         <React.Fragment key={food}>
            //           <span>{food}</span>
            //           {index < arr.length - 1 && <span>、</span>}
            //         </React.Fragment>
            //       ))}
            //     </li>
            //     <li>
            //       <span>個性：</span>
            //       <span>{petCard.PetPersonality}</span>
            //     </li>
            //     <li>
            //       <span>服用藥物</span>
            //       <span>{petCard.PetMedicine}</span>
            //     </li>
            //     <li>
            //       <span>備註</span>
            //       <span>{petCard.PetNote}</span>
            //     </li>
            //   </ul>
            //   <ul className="basis-6/12">
            //     <li className="mb-1 font-bold">旅館需求</li>
            //     {Services.length < 1 &&
            //       Facilities.length < 1 &&
            //       Specials.length < 1 && <p>無</p>}
            //     {Services.length > 0 && (
            //       <li className="mb-4 ">
            //         <p className="mb-4">服務內容：</p>
            //         <p className="-ml-1">
            //           {Services.map((service) => (
            //             <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
            //               {service}
            //             </span>
            //           ))}
            //         </p>
            //       </li>
            //     )}
            //     {Facilities.length > 0 && (
            //       <li className="mb-4">
            //         <p className="mb-4">設施條件：</p>
            //         <p className="-ml-1">
            //           {Facilities.map((facility) => (
            //             <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
            //               {facility}
            //             </span>
            //           ))}
            //         </p>
            //       </li>
            //     )}
            //     {Specials.length > 0 && (
            //       <li>
            //         <p className="mb-4">特殊需求：</p>
            //         <p className="-ml-1">
            //           {Specials.map((special) => (
            //             <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
            //               {special}
            //             </span>
            //           ))}
            //         </p>
            //       </li>
            //     )}
            //   </ul>
            // </section>
          )}
        </div>
      </MotionPopup>
    </MotionFade>
  );
}

export default Popup;