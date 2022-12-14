import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { countySchema, CountyList } from "../types/schema";
import { xml2json, parseXml } from "./xml2json";

// GET countryData
const getCountry = (): CountyList | undefined => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery(["country"], async () =>
    axios
      .get("https://petcity.rocket-coding.com/area")
      .then((res) => res.data)
      .catch((err) => err)
  );

  if (data !== undefined) {
    const countryList = countySchema.parse(data);
    return countryList;
  }
  return undefined;
};

export default getCountry;
