import CountryList from "../containers/SearchBar/CountryList";
import getCountry from "./getCountry";

function Test(): JSX.Element {
  const countryList = getCountry();
  return (
    <>
      <h1>測試</h1>
      {countryList !== undefined && (
        <CountryList
          onClick={(e) => console.log((e.target as HTMLSelectElement).value)}
          countryList={countryList}
        />
      )}
    </>
  );
}
