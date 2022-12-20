import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import useSearchBar from "../../hooks/useSearchBar";
import type { SearchBarAction } from ".";
import { usePetCardList } from "../../utils/api/petCard";
import UserAuth from "../../context/UserAuthContext";
import { Pet, PetList } from "../../types/schema";
import useFilter from "../../hooks/useFilter";
import { FilterAction } from "../../context/FilterContext";
import {
  getCategory,
  sortedServiceTypes,
} from "../../utils/servicesTranslator";
import { sortService } from "../Filter/data";

interface IPetCardProps {
  data: PetList | undefined;
  dispatchSearchBar: React.Dispatch<SearchBarAction>;
}

const petList = [
  {
    name: "阿比",
    photo: undefined,
  },
  {
    name: "小麻糬",
    photo: undefined,
  },
  {
    name: "Ruby",
    photo: undefined,
  },
];

const handleDispatchFilter = (
  pet: PetList[0],
  filterDispatch: React.Dispatch<FilterAction>
): void => {
  filterDispatch({ type: "PICK-PetType", payload: pet.PetType });
  filterDispatch({ type: "PICK-FoodTypes", payload: pet.FoodTypes });

  filterDispatch({
    type: "PICK-Services",
    payload: getCategory(pet.ServiceTypes ?? [""], "Services"),
  });
  filterDispatch({
    type: "PICK-Facilities",
    payload: getCategory(pet.ServiceTypes ?? [""], "Facilities"),
  });
  filterDispatch({
    type: "PICK-Specials",
    payload: getCategory(pet.ServiceTypes ?? [""], "Specials"),
  });
};

function PetCardSmall({ dispatchSearchBar, data }: IPetCardProps): JSX.Element {
  const { pet: selectedPet, dispatch } = useSearchBar();
  const { filterDispatch } = useFilter();
  const queryClient = useQueryClient();

  return (
    <div className="w-60 rounded-md border-2 border-black bg-white">
      <button
        type="button"
        className="flex w-full justify-start border-b-2 py-3.5 px-4"
      >
        <div className="ml-2">
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-3 font-bold">新增寵物名片</span>
        </div>
      </button>
      {data === undefined ? (
        <p>系統錯誤，請稍後再試</p>
      ) : (
        <ul>
          <li className="relative flex items-center justify-between py-2 px-4 hover:bg-gray-300">
            <button
              type="button"
              className="flex h-full w-full items-center text-left"
              onClick={() => {
                dispatch({ type: "PICK_PET", payload: "" });
                filterDispatch({ type: "CLEAR" });
                dispatchSearchBar({
                  type: "TOGGLE_PETCARD-SMALL",
                  payload: false,
                });
                queryClient.removeQueries(["HotelList"]);
              }}
            >
              <div className="h-8 w-8 rounded-full border-2 object-cover" />
              <span className=" ml-2">什麼都不選</span>
            </button>
          </li>
          {data.map((pet) => (
            <li
              key={pet.PetName}
              className="relative flex items-center justify-between py-2 px-4 hover:bg-gray-300"
            >
              <button
                onClick={async () => {
                  dispatch({ type: "PICK_PET", payload: pet.PetName });
                  handleDispatchFilter(pet, filterDispatch);
                  dispatchSearchBar({
                    type: "TOGGLE_PETCARD-SMALL",
                    payload: false,
                  });
                  queryClient.removeQueries(["HotelList"]);
                }}
                type="button"
                className="flex w-full items-center"
              >
                {pet.PetPhoto !== null &&
                pet.PetPhoto !== undefined &&
                pet.PetPhoto !== "" ? (
                  <img
                    src={pet.PetPhoto}
                    alt={pet.PetName}
                    className="h-8 w-8 border-2 border-black object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-black bg-slate-500 object-cover" />
                )}
                <span className="ml-2">{pet.PetName}</span>
              </button>
              {pet.PetName === selectedPet && (
                <FontAwesomeIcon
                  className="text-lg text-primary"
                  icon={faCheck}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PetCardSmall;
