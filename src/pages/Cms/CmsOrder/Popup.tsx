import { AnimatePresence } from "framer-motion";
import React from "react";
import LoadingScreen from "../../../components/LoadingModal";
import {
  translateFood,
  translatePetCard,
} from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import { usePetCardNotToken } from "../../../utils/api/petCard";
import { sortedServiceTypes } from "../../../utils/servicesTranslator";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  id: number;
}

function Popup({ open, onClose, id }: ModalProps): JSX.Element {
  const { data, isSuccess, isFetching } = usePetCardNotToken(id);

  if (data === undefined)
    return <AnimatePresence>{isFetching && <LoadingScreen />}</AnimatePresence>;
  if (data.ServiceTypes === null)
    return <AnimatePresence>{isFetching && <LoadingScreen />}</AnimatePresence>;
  return (
    <>
      {isFetching && (
        <AnimatePresence>
          <LoadingScreen />
        </AnimatePresence>
      )}
      {isSuccess && (
        <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
          <MotionPopup className="scrollbar-thumb-h-1/2 relative h-max w-[90%] max-w-[90%] overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
            <div className="  h-full   w-full ">
              {open && data !== undefined && (
                <>
                  <button
                    className=" absolute top-6 right-6  "
                    type="button"
                    onClick={onClose}
                  >
                    X
                  </button>
                  <p className=" mb-4 text-2xl font-bold text-gray-500">
                    寵物名片
                  </p>
                  <section className="mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
                    <ul className="mr-5 basis-2/12">
                      <li className=" mb-6 h-40">
                        {data.PetPhoto === null ? (
                          <div className="h-full w-full bg-gray-200" />
                        ) : (
                          <img
                            src={data.PetPhoto}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </li>
                      <li className="text-xl font-bold">{data.PetName}</li>
                    </ul>

                    <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-1 border-r-2">
                      <li className="mb-2 font-bold">寵物資訊</li>
                      <li>
                        <span>寵物類型：</span>
                        <span>{translatePetCard[data.PetType as string]}</span>
                      </li>
                      <li>
                        <span>年齡：</span>
                        <span>{data.PetAge}</span>
                      </li>
                      <li>
                        <span>性別：</span>
                        <span>{data.PetSex}</span>
                      </li>
                      <li>
                        <span>飲食偏好：</span>
                        {data.FoodTypes.map((food, index, arr) => (
                          <React.Fragment key={food}>
                            <span>{translateFood[food as string]}</span>
                            {index < arr.length - 1 && <span>、</span>}
                          </React.Fragment>
                        ))}
                      </li>
                      <li>
                        <span>個性：</span>
                        <span>{data.PetPersonality}</span>
                      </li>
                      <li>
                        <span>服用藥物</span>
                        <span>{data.PetMedicine}</span>
                      </li>
                      <li>
                        <span>備註</span>
                        <span>{data.PetNote}</span>
                      </li>
                    </ul>
                    <ul className="basis-6/12">
                      <li className="mb-1 font-bold">旅館需求</li>
                      {sortedServiceTypes(data.ServiceTypes, "Services")
                        .length < 1 &&
                        sortedServiceTypes(data.ServiceTypes, "Facilities")
                          .length < 1 &&
                        sortedServiceTypes(data.ServiceTypes, "Specials")
                          .length < 1 && <p>無</p>}
                      {data.ServiceTypes.length > 0 && (
                        <li className="mb-4 ">
                          <p className="mb-4">服務內容：</p>
                          <p className="-ml-1">
                            {sortedServiceTypes(
                              data.ServiceTypes,
                              "Services"
                            ).map((service) => (
                              <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                                {service}
                              </span>
                            ))}
                          </p>
                        </li>
                      )}
                      {sortedServiceTypes(data.ServiceTypes, "Facilities")
                        .length > 0 && (
                        <li className="mb-4">
                          <p className="mb-4">設施條件：</p>
                          <p className="-ml-1">
                            {sortedServiceTypes(
                              data.ServiceTypes,
                              "Facilities"
                            ).map((facility) => (
                              <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                                {facility}
                              </span>
                            ))}
                          </p>
                        </li>
                      )}
                      {sortedServiceTypes(data.ServiceTypes, "Specials")
                        .length > 0 && (
                        <li>
                          <p className="mb-4">特殊需求：</p>
                          <p className="-ml-1">
                            {sortedServiceTypes(
                              data.ServiceTypes,
                              "Specials"
                            ).map((special) => (
                              <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                                {special}
                              </span>
                            ))}
                          </p>
                        </li>
                      )}
                    </ul>
                  </section>
                </>
              )}
            </div>
          </MotionPopup>
        </MotionFade>
      )}
    </>
  );
}

export default Popup;
