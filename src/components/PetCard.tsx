import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import useSearchBar from "../hooks/useComponent";
import type { SearchBarAction } from "./SearchBar";

interface IPetCardProps {
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

function PetCard({ dispatchSearchBar }: IPetCardProps): JSX.Element {
  const { pet: selectedPet, dispatch } = useSearchBar();

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
      <ul>
        {petList.map((pet) => (
          <li
            key={pet.name}
            className="relative flex items-center justify-between py-2 px-4 hover:bg-gray-300"
          >
            <button
              onClick={() => {
                dispatch({ type: "PICK_PET", payload: pet.name });
                dispatchSearchBar({ type: "TOGGLE_PETCARD", payload: false });
              }}
              type="button"
              className="flex w-full items-center"
            >
              {pet.photo !== undefined ? (
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="h-8 w-8 border-2 border-black object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-black bg-slate-500 object-cover" />
              )}
              <span className="ml-2">{pet.name}</span>
            </button>
            {pet.name === selectedPet && (
              <FontAwesomeIcon
                className="text-lg text-primary"
                icon={faCheck}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetCard;
