import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterInput from "../containers/Filter/FilterInput";
import SearchBar from "../containers/SearchBar";
import useFilter from "../hooks/useFilter";
import { foodLists, petLists, serviceLists } from "../containers/Filter/data";
import CountryList from "../containers/SearchBar/CountryList";
import getCountry from "../utils/getCountry";
import Button from "../components/Button";
import StatusModal from "../Layout/StatusModal";
import useModal from "../hooks/useModal";
import Filter from "../containers/Filter";

const dataTest = {
  FoodTypes: ["wetFood", "freshFood"],
  ServiceTypes: [
    "contract",
    "shower",
    "24hrMonitor",
    "24hrClerk",
    "independentZone",
    "lifeRecord",
    "wetFood",
    "freshFood",
  ],
};

function ContextTest(): JSX.Element {
  const { PetType, FoodTypes, ServiceTypes } = useFilter();
  const { pending, dispatchPending } = useModal();
  const countryList = getCountry();

  return (
    <div className="flex-col-center min-h-screen pt-40">
      {/* <Link to="/home">點此返回home頁</Link> */}
      {countryList !== undefined && (
        <CountryList
          onClick={(e) => console.log((e.target as HTMLSelectElement).value)}
          countryList={countryList}
        />
      )}
      <Filter
        data={{
          FoodTypes: dataTest.FoodTypes,
          ServiceTypes: dataTest.ServiceTypes,
        }}
      />
      <SearchBar className="mb-16" />

      <Button
        text="登入測試"
        className="mb-5 p-5"
        type="Primary"
        onClick={() => {
          console.log("test");
          axios
            .post("https://petcity.rocket-coding.com/user/login", {
              UserAccount: "qqq123gmail.com",
              UserPassWord: "Wang1234",
              Identity: "customer",
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      />

      <Button
        text="註冊測試"
        className="p-5"
        type="Secondary"
        onClick={() => {
          axios
            .post("https://petcity.rocket-coding.com/user/signup", {
              UserAccount: "fasFSDF31WE7fwer@gmail.com",
              UserName: "fasFSDF31WE7fwer",
              UserPassWord: "fasFSDF31WE7fwer",
              ConfirmedPassword: "fasFSDF31WE7fwer",
              Identity: "customer",
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      />

      {/* <FilterInput
        action="PICK-PetType"
        filterList={petLists}
        checked={PetType}
      />
      <FilterInput
        action="PICK-FoodTypes"
        filterList={foodLists}
        checked={FoodTypes}
      />
      {serviceLists.map((list) => {
        let checkArray = [""];
        switch (list.keyname) {
          case "services":
            checkArray = ServiceTypes.services;
            break;
          case "facilities":
            checkArray = ServiceTypes.facilities;
            break;
          case "specials":
            checkArray = ServiceTypes.specials;
            break;
          default:
            break;
        }
        return (
          <FilterInput
            action="PICK-ServiceTypes"
            filterList={list}
            checked={checkArray}
            key={list.keyname}
          />
        );
      })} */}
    </div>
  );
}

export default ContextTest;
