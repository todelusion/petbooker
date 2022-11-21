import { CountyList } from "../types/schema";

interface ICountryListProps {
  countryList: CountyList;
}

function CountryList({ countryList }: ICountryListProps): JSX.Element {
  const { countyItems } = countryList;
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
