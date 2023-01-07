import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useSearchBar from "../../hooks/useSearchBar";
import type { SearchBarAction } from ".";
import { usePetList } from "../../utils/api/petCard";
import UserAuth from "../../context/UserAuthContext";
import { PetList } from "../../types/schema";
import useFilter from "../../hooks/useFilter";
import { FilterAction } from "../../context/FilterContext";
import { getCategory } from "../../utils/servicesTranslator";
import LoadingScreen from "../../components/LoadingModal";

interface IPetCardProps {
  dispatchSearchBar: React.Dispatch<SearchBarAction>;
}

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

const dataController = (data: PetList): PetList =>
  data.filter((pet) => pet.IsOrders === "沒訂單");

function PetCardSmall({ dispatchSearchBar }: IPetCardProps): JSX.Element {
  const { pet: selectedPet, dispatch } = useSearchBar();
  const { filterDispatch } = useFilter();
  const { authToken } = useContext(UserAuth);

  let petList;
  if (authToken !== "") {
    const { data } = usePetList(authToken);
    petList = data;
  }

  const queryClient = useQueryClient();

  if (authToken === "")
    return (
      <div className="w-60 rounded-md border-2 border-black bg-white py-7 text-center">
        請先登入會員
      </div>
    );

  return (
    <div className="w-60 rounded-md border-2 border-black bg-white">
      <button
        type="button"
        className="flex w-full justify-start border-b-2 py-3.5 px-4"
      >
        <Link to="/customer/pet" className="ml-2">
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-3 font-bold">新增寵物名片</span>
        </Link>
      </button>
      {petList === undefined ? (
        <AnimatePresence>
          <LoadingScreen />
        </AnimatePresence>
      ) : (
        <ul>
          <li className="relative flex items-center justify-between py-2 px-4 hover:bg-gray-300">
            <button
              type="button"
              className="flex h-full w-full items-center text-left"
              onClick={() => {
                dispatch({ type: "PICK_PET", payload: { id: 0, name: "" } });
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
          {dataController(petList).map((pet) => (
            <li
              key={pet.PetName}
              className="relative flex items-center justify-between py-2 px-4 hover:bg-gray-300"
            >
              <button
                onClick={async () => {
                  dispatch({
                    type: "PICK_PET",
                    payload: { id: pet.PetCardId, name: pet.PetName },
                  });
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
                {pet.PetPhoto !== "" ? (
                  <img
                    src={pet.PetPhoto}
                    alt={pet.PetName}
                    className="h-8 w-8 rounded-full border-2 border-black object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-black bg-slate-500 object-cover" />
                )}
                <span className="ml-2">{pet.PetName}</span>
              </button>
              {pet.PetName === selectedPet.name && (
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
