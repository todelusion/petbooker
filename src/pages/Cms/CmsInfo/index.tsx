import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import CountryList from "../../../containers/SearchBar/CountryList";
import { countySchema } from "../../../types/schema";
import { xml2json, parseXml } from "../../../utils/xml2json";
import Filter from "./Filter";

function CmsInfo(): JSX.Element {
  const { data: countryData } = useQuery(["country"], async () =>
    axios
      .get("https://api.nlsc.gov.tw/other/ListCounty")
      .then((res) => xml2json(parseXml(res.data), " "))
      .catch((err) => err)
  );
  let countryList;
  if (countryData !== undefined) {
    countryList = countySchema.parse(JSON.parse(countryData));
  }

  console.log(countryList);

  return (
    <div className="w-full max-w-3xl">
      <Filter />
    </div>
  );
}

export default CmsInfo;
