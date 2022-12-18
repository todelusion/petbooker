import useSearchBar from "../../hooks/useSearchBar";
import { CountyList } from "../../types/schema";
import type { SearchBarAction } from ".";

interface ICountryListProps {
  countryList: CountyList;
  onClick: (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
}

function CountryList({ countryList, onClick }: ICountryListProps): JSX.Element {
  return (
    <select
      size={5}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      name="country"
      id="country_select"
      className="w-40 rounded-md border-2 border-black outline-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-xl"
    >
      <option value="0" className="py-3.5 px-4 hover:bg-gray-300">
        請選擇縣市
      </option>
      {countryList.map((country) => (
        <option
          key={country.Id}
          value={country.Id}
          className="py-3.5 px-4 hover:bg-gray-300"
        >
          {country.Areas}
        </option>
      ))}
    </select>
  );
}

export default CountryList;
