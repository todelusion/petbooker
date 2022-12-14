/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import { FilterAction } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import {
  foodLists,
  petLists,
  pricesLists,
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "./data";
import FilterInput from "./FilterInput";

interface IFilterProps {
  data?: {
    PetType?: string;
    FoodTypes?: string[];
    RoomPrices?: string[];
    ServiceTypes?: string[];
  };
  className?: string;
  horizontal?: true;
  closeFood?: true;
  closeService?: true;
  closeFacility?: true;
  closeSpecial?: true;
  closeRoomPrices?: true;
  closePet?: true;
}

const useFilterDefault = (
  data: {
    PetType?: string;
    FoodTypes?: string[];
    RoomPrices?: string[];
    ServiceTypes?: string[];
  },

  filterDispatch: React.Dispatch<FilterAction>,
  setInitPetType: React.Dispatch<React.SetStateAction<string | undefined>>,
  setInitRoomPrices: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitFoodTypes: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitServices: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitFacilities: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitSpecials: React.Dispatch<React.SetStateAction<string[] | undefined>>
): void => {
  const foodInputValue = [...foodLists.contents].map((obj) => obj.value);
  const petInputValue = [...petLists.contents].map((obj) => obj.value);
  const servicesInputValue = [...serviceLists.contents].map((obj) => obj.value);
  const facilitiesInputValue = [...facilitiesLists.contents].map(
    (obj) => obj.value
  );
  const specialsInputValue = [...specialsLists.contents].map(
    (obj) => obj.value
  );

  const initFood = data?.FoodTypes?.filter((item) =>
    foodInputValue.includes(item)
  );
  const initPet = data?.PetType;
  const initServices = data?.ServiceTypes?.filter((item) =>
    servicesInputValue.includes(item)
  );

  const initFacilities = data?.ServiceTypes?.filter((item) =>
    facilitiesInputValue.includes(item)
  );

  const initSpecials = data?.ServiceTypes?.filter((item) =>
    specialsInputValue.includes(item)
  );

  useEffect(() => {
    if (initPet !== undefined) {
      filterDispatch({ type: "PICK-PetType", payload: initPet });
      setInitPetType(initPet);
    }

    if (initFood !== undefined) {
      filterDispatch({ type: "PICK-FoodTypes", payload: initFood });
      setInitFoodTypes(initFood);
    }

    if (initServices !== undefined) {
      filterDispatch({ type: "PICK-Services", payload: initServices });
      setInitServices(initServices);
    }

    if (initFacilities !== undefined) {
      filterDispatch({ type: "PICK-Facilities", payload: initFacilities });
      setInitFacilities(initFacilities);
    }

    if (initSpecials !== undefined) {
      filterDispatch({ type: "PICK-Specials", payload: initSpecials });
      setInitSpecials(initSpecials);
    }
  }, []);
};

const Filter = React.memo(
  ({
    className,
    data,
    horizontal,
    closePet,
    closeFood,
    closeService,
    closeFacility,
    closeSpecial,
    closeRoomPrices,
  }: IFilterProps): JSX.Element => {
    const {
      FoodTypes,
      PetType,
      RoomPrices,
      Services,
      Specials,
      Facilities,
      filterDispatch,
    } = useFilter();

    const [initPetType, setInitPetType] = useState<string>();
    const [initRoomPrices, setInitRoomPrices] = useState<string[]>();
    const [initFoodTypes, setInitFoodTypes] = useState<string[]>();
    const [initServices, setInitServices] = useState<string[]>();
    const [initFacilities, setInitFacilities] = useState<string[]>();
    const [initSpecials, setInitSpecials] = useState<string[]>();

    if (data !== undefined) {
      useFilterDefault(
        data,
        filterDispatch,
        setInitPetType,
        setInitRoomPrices,
        setInitFoodTypes,
        setInitServices,
        setInitFacilities,
        setInitSpecials
      );
    }

    useEffect(() => {
      setInitFoodTypes(FoodTypes);
      setInitPetType(PetType);
      setInitRoomPrices(RoomPrices);
      setInitServices(Services);
      setInitSpecials(Specials);
      setInitFacilities(Facilities);
    }, [Facilities, FoodTypes, PetType, RoomPrices, Services, Specials]);

    return (
      <>
        {!closePet && (
          <FilterInput
            required
            noContext={false}
            horizontal={horizontal}
            action="PICK-PetType"
            checked={initPetType}
            filterList={petLists}
            className={className ?? ""}
          />
        )}
        {!closeFood && (
          <FilterInput
            required
            noContext={false}
            horizontal={horizontal}
            action="PICK-FoodTypes"
            filterList={foodLists}
            checked={initFoodTypes}
            className={className ?? ""}
          />
        )}
        {!closeRoomPrices && (
          <FilterInput
            noContext={false}
            horizontal={horizontal}
            action="PICK-RoomPrices"
            filterList={pricesLists}
            checked={initRoomPrices}
            className={className ?? ""}
          />
        )}
        {!closeService && (
          <FilterInput
            noContext={false}
            horizontal={horizontal}
            action="PICK-Services"
            filterList={serviceLists}
            checked={initServices}
            className={className ?? ""}
          />
        )}
        {!closeFacility && (
          <FilterInput
            noContext={false}
            horizontal={horizontal}
            action="PICK-Facilities"
            filterList={facilitiesLists}
            checked={initFacilities}
            className={className ?? ""}
          />
        )}
        {!closeSpecial && (
          <FilterInput
            noContext={false}
            horizontal={horizontal}
            action="PICK-Specials"
            filterList={specialsLists}
            checked={initSpecials}
            className={className ?? ""}
          />
        )}
      </>
    );
  }
);

export default Filter;
