import React from "react";
import { translatePet } from "../../../containers/Filter/data";
import { EditPath } from "../../../img/icons";
import { Pet, PetList } from "../../../types/schema";
import { sortedServiceTypes } from "../../../utils/servicesTranslator";
import PetInfo from "../CustomerBook/PetInfo";

interface IPetListProps {
  data: PetList;
  setPet: React.Dispatch<React.SetStateAction<PetList[0] | undefined>>;
  setIsShow: React.Dispatch<React.SetStateAction<"POST" | "PUT" | undefined>>;
}

const renderServiceTypes = (ServiceTypes: string[]): JSX.Element => {
  if (ServiceTypes[0] === "") return <p>無</p>;

  return (
    <>
      <li className="mb-4 ">
        <p className="mb-4">服務內容：</p>
        <p className="-ml-1">
          {sortedServiceTypes(ServiceTypes, "Services").map((service) => (
            <span
              key={service}
              className="mr-2 rounded-full border-2 border-black px-4 py-2"
            >
              {service}
            </span>
          ))}
        </p>
      </li>
      <li className="mb-4">
        <p className="mb-4">設施條件：</p>
        <p className="-ml-1">
          {sortedServiceTypes(ServiceTypes, "Facilities").map((facility) => (
            <span
              key={facility}
              className="mr-2 rounded-full border-2 border-black px-4 py-2"
            >
              {facility}
            </span>
          ))}
        </p>
      </li>
      <li>
        <p className="mb-4">特殊需求：</p>
        <p className="-ml-1">
          {sortedServiceTypes(ServiceTypes, "Specials").map((special) => (
            <span
              key={special}
              className="mr-2 rounded-full border-2 border-black px-4 py-2"
            >
              {special}
            </span>
          ))}
        </p>
      </li>
    </>
  );
};

function PetCard({ data, setPet, setIsShow }: IPetListProps): JSX.Element {
  return (
    <>
      {data.map((pet) => (
        <section
          key={pet.PetCardId}
          className="relative mb-12 flex h-80 w-full rounded-sm border-2 border-gray-300 p-6"
        >
          <button
            onClick={() => {
              setIsShow("PUT");
              setPet(pet);
            }}
            type="button"
            className="absolute right-2 top-2 outline-none duration-75 hover:scale-110"
          >
            <img src={EditPath} alt="" />
          </button>
          <ul className="mr-7 basis-2/12">
            <li className=" mb-6 h-40">
              {pet.PetPhoto === null || pet.PetPhoto === "" ? (
                <div className="h-full w-full bg-gray-200" />
              ) : (
                <img
                  src={pet.PetPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </li>
            <li className="text-xl font-bold">{pet.PetName}</li>
          </ul>

          <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-2 border-r-2">
            <li className="mb-2 font-bold">寵物資訊</li>
            <PetInfo label="寵物類型" content={translatePet[pet.PetType]} />
            <PetInfo label="年齡" content={pet.PetAge} />
            <PetInfo label="性別" content={pet.PetSex} />
            <PetInfo label="飲食偏好" content={pet.FoodTypes} />
            <PetInfo label="個性" content={pet.PetPersonality ?? ""} />
            <PetInfo label="備用藥物" content={pet.PetMedicine ?? ""} />
            <PetInfo label="備註" content={pet.PetNote ?? ""} />
          </ul>
          <ul className="basis-6/12">
            <li className="mb-1 font-bold">旅館需求</li>
            {renderServiceTypes(pet.ServiceTypes)}
          </ul>
        </section>
      ))}
    </>
  );
}

export default PetCard;
