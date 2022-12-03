import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Button from "../../../components/Button";
import UploadImage from "../../../components/UploadImage";
import CountryList from "../../../containers/SearchBar/CountryList";
import { countySchema } from "../../../types/schema";
import { xml2json, parseXml } from "../../../utils/xml2json";
import Filter from "../../../containers/Filter";

function CmsInfo(): JSX.Element {
  // const { data: countryData } = useQuery(["country"], async () =>
  //   axios
  //     .get("https://api.nlsc.gov.tw/other/ListCounty")
  //     .then((res) => xml2json(parseXml(res.data), " "))
  //     .catch((err) => err)
  // );
  // let countryList;
  // if (countryData !== undefined) {
  //   countryList = countySchema.parse(JSON.parse(countryData));
  // }

  // console.log(countryList);
  function postImageFile() {
    console.log("post!");
  }

  return (
    <div className="w-full">
      <Filter
        horizontal
        closePet
        closeRoomPrices
        className="my-5"
        onChange={(filter) => console.log(filter)}
      />
      <div className="flex ">
        <UploadImage />
      </div>
      <Button
        className="mt-8"
        text="送出"
        type="Secondary"
        onClick={() => {
          postImageFile();
        }}
      />
    </div>
  );
}

export default CmsInfo;
