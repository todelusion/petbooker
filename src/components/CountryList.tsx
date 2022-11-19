import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { xml2json, parseXml } from "../utils/xml2json";
import { countySchema } from "../types/schema";

function CountryList(): JSX.Element {
  const { data: countryData } = useQuery(["country"], async () =>
    axios
      .get("https://api.nlsc.gov.tw/other/ListCounty")
      .then((res) => xml2json(parseXml(res.data), " "))
      .catch((err) => err)
  );

  if (countryData === undefined) return <h1>loading</h1>;

  const { countyItems } = countySchema.parse(JSON.parse(countryData));
  console.log(countyItems);

  return (
    <select
      size={5}
      name="country"
      id="country_select"
      className="w-40 rounded-md border-2 border-black outline-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-xl"
    >
      {countyItems.countyItem.map((country) => (
        <option
          key={country.countyname}
          value={country.countycode}
          className="py-3.5 px-4 focus:bg-accent"
        >
          {country.countyname}
        </option>
      ))}
    </select>
  );
}

export default CountryList;
