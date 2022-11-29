import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { countySchema, CountyList } from "../types/schema";
import { xml2json, parseXml } from "./xml2json";

// GET countryData
const getCountry = (): CountyList | undefined => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery(["country"], async () =>
    axios
      .get("https://api.nlsc.gov.tw/other/ListCounty")
      .then((res) => xml2json(parseXml(res.data), " "))
      .catch((err) => err)
  );

  if (data !== undefined) {
    const countryList = countySchema.parse(JSON.parse(data));
    return countryList;
  }
  return undefined;
};

export default getCountry;
