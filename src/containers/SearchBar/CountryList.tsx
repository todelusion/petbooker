import useSearchBar from "../../hooks/useSearchBar";
import { CountyList } from "../../types/schema";
import type { SearchBarAction } from ".";

interface ICountryListProps {
  countryList: CountyList;
  onClick: (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
}

function CountryList({ countryList, onClick }: ICountryListProps): JSX.Element {
  const { countyItems } = countryList;
  return (
    <select
      size={5}
      onClick={(e) => {
        onClick(e);
      }}
      name="country"
      id="country_select"
      className="w-40 rounded-md border-2 border-black outline-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-xl"
    >
      {countyItems.countyItem.map((country) => (
        <option
          key={country.countyname}
          value={country.countyname}
          className="py-3.5 px-4 hover:bg-gray-300"
        >
          {country.countyname}
        </option>
      ))}
    </select>
  );
}

CountryList.defaultProps = {
  dispatchSearchBar: undefined,
};

export default CountryList;
